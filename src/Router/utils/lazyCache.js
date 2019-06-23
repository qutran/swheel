const cache = new Map();

function createThrottling(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export async function getPromiseFromCache(component, throttle) {
  if (!cache.has(component)) {
    const promise = Promise.all([component(), createThrottling(throttle)]).then(
      ([loadedComponent]) => loadedComponent,
    );

    cache.set(component, promise);
  }

  return cache.get(component);
}
