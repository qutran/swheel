export function links(node, { history }) {
  function onClick(e) {
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
      e.preventDefault();
      const action = current.getAttribute('replace') ? 'replace' : 'push';
      history[action](current.getAttribute('href'));
    }
  }

  node.addEventListener('click', onClick);

  return {
    destroy() {
      node.removeEventListener('click', onClick);
    },
  };
}
