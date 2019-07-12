import { tick, setContext, getContext, onDestroy } from 'svelte';
import { get, derived, writable, readable } from 'svelte/store';
import { getProtected } from './protection';
import { getHistory } from './history';
import { matchPath } from './matchPath';
import { createBasePath } from './basePath';
import { dynamicDerived } from './dynamicDerived';

const identity = _ => _;

const CONTEXT_ROUTER_KEY = '__router';
const CONTEXT_DEPTH_KEY = '__router_depth';
const CONTEXT_RENDER_UNLOCKED = '__render_unlocked';

export function createRouter(basePath = '/') {
  let routes = [];

  createBasePath(basePath);
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
  setContext(CONTEXT_RENDER_UNLOCKED, readable(true));
}

export function createLayout() {
  const parentContext = getContext(CONTEXT_ROUTER_KEY);
  let isAnyMatch = writable(false);
  const dynamicSubjects = dynamicDerived($subjects =>
    $subjects.reduce((acc, next) => acc || !!next, false),
  );

  const unsubscribe = dynamicSubjects.subscribe(_isAnyMatch => {
    isAnyMatch.set(_isAnyMatch);
  });

  setContext(CONTEXT_ROUTER_KEY, {
    getRoutes: parentContext.getRoutes,
    add(route) {
      parentContext.add(route);
      dynamicSubjects.push(route.subject);
    },
    remove(route) {
      parentContext.remove(route);
      dynamicSubjects.remove(route.subject);
    },
  });

  setContext(CONTEXT_RENDER_UNLOCKED, isAnyMatch);

  onDestroy(() => unsubscribe());

  return isAnyMatch;
}

export function getDepth() {
  const currentDepth = getContext(CONTEXT_DEPTH_KEY) + 1;
  setContext(CONTEXT_DEPTH_KEY, currentDepth);
  return currentDepth;
}

export function createRoute({ path, exact, depth }) {
  const isProtected = getProtected();
  const isRenderUnlocked = getContext(CONTEXT_RENDER_UNLOCKED);
  const context = getContext(CONTEXT_ROUTER_KEY);
  const { currentPath } = getHistory();

  const subject = derived(
    [isProtected, currentPath],
    ([$isProtected, $currentPath]) =>
      $isProtected && matchPath($currentPath, { path, exact }),
  );

  const routeData = { path, exact, isProtected, depth, subject };

  context.add(routeData);
  onDestroy(() => context.remove(routeData));

  return [subject, isRenderUnlocked];
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
