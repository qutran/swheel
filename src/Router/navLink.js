import { matchPath } from './utils/matchPath.js';
import { getHistoryById } from './BaseRouter.svelte';

export function navLink(node, { activeClass = 'active', exact = false } = {}) {
  function getLinksView() {
    let current = node;

    while (
      current &&
      (current.tagName !== 'OBJECT' ||
        !current.hasAttribute('aria-label') ||
        !current.getAttribute('aria-label').startsWith('__links'))
    ) {
      current = current.parentElement;
    }

    return current;
  }

  const [_, historyId] = getLinksView()
    .getAttribute('aria-label')
    .split('__links_')
    .map(Number);

  const unsubscribe = getHistoryById(historyId).currentPath.subscribe(
    $currentPath => {
      const href = node.getAttribute('href');
      const isMatch = !!matchPath($currentPath, { path: href, exact });
      node.classList[isMatch ? 'add' : 'remove'](activeClass);
    },
  );

  return {
    destroy() {
      unsubscribe();
    },
  };
}
