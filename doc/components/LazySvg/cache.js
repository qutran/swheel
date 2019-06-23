const cache = {};

export function loadSvg(src) {
  cache[src] = cache[src] || fetch(src).then(payload => payload.text());
  return cache[src];
}
