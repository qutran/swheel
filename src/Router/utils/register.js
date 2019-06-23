import { tick, setContext, getContext, onDestroy } from 'svelte';
import { get, derived, writable } from 'svelte/store';
import { getProtected } from './protection';
import { getHistory } from './history';
import { matchPath } from './matchPath';

const identity = _ => _;

const CONTEXT_ROUTER_KEY = '__router';
const CONTEXT_DEPTH_KEY = '__router_depth';

export function createRouter() {
  let routes = [];

  setContext(CONTEXT_DEPTH_KEY, 0);
  setContext(CONTEXT_ROUTER_KEY, {
    getRoutes: () => routes,
    add(route) {
      routes = [...routes, route];
    },
    remove(route) {
      routes = routes.filter(({ path }) => path !== route.path);
    },
  });
}

export function getDepth() {
  const currentDepth = getContext(CONTEXT_DEPTH_KEY) + 1;
  setContext(CONTEXT_DEPTH_KEY, currentDepth);
  return currentDepth;
}

export function createRoute({ path, exact, depth }) {
  const isProtected = getProtected();
  const routeData = { path, exact, isProtected, depth };
  const context = getContext(CONTEXT_ROUTER_KEY);
  const { currentPath } = getHistory();

  context.add(routeData);

  const subject = derived(
    [isProtected, currentPath],
    ([$isProtected, $currentPath]) =>
      $isProtected && matchPath($currentPath, { path, exact }),
  );

  onDestroy(() => context.remove(routeData));

  return subject;
}

export function createRedirect({ from, to, exact, depth }) {
  const isProtected = getProtected();
  const context = getContext(CONTEXT_ROUTER_KEY);
  const { push, replace, currentPath } = getHistory();

  const unsubscribe = derived([isProtected, currentPath], identity).subscribe(
    async ([$isProtected, $currentPath]) => {
      await tick();
      const routes = context.getRoutes();
      const isFromMatch = matchPath($currentPath, { path: from, exact });
      const isSomeMatch = routes.some(route => {
        return (
          get(route.isProtected) &&
          matchPath($currentPath, route) &&
          route.depth === depth
        );
      });

      if ($isProtected && !isSomeMatch && isFromMatch) {
        (from !== '*' ? replace : push)(to);
      }
    },
  );

  onDestroy(unsubscribe);
}

export function createFallback() {
  const context = getContext(CONTEXT_ROUTER_KEY);
  const isFallback = writable(false);
  const { currentPath } = getHistory();

  const unsubscribe = currentPath.subscribe(async $history => {
    await tick();
    const routes = context.getRoutes();
    const nextFallback = !routes.some(
      route => get(route.isProtected) && matchPath($history, route),
    );
    isFallback.set(nextFallback);
  });

  onDestroy(unsubscribe);
  return isFallback;
}
