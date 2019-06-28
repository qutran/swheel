export function links(node, { history }) {
  function onClick(e) {
    e.stopPropagation();
    let current = e.target;

    while (current && current.tagName !== 'A') {
      current = current.parentElement;
    }

    if (
      current &&
      !['_self', '_blank', '_top', '_parent'].includes(
        current.getAttribute('target'),
      )
    ) {
      const action = current.getAttribute('replace') ? 'replace' : 'push';
      const href = current.getAttribute('href');
      if (!['//', 'http'].find(rule => href.startsWith(rule))) {
        e.preventDefault();
        history[action]();
      }
    }
  }

  node.addEventListener('click', onClick);

  return {
    destroy() {
      node.removeEventListener('click', onClick);
    },
  };
}
