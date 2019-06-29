import pathToRegexp from 'path-to-regexp';

const patternCache = {};
const cacheLimit = 10000;
let cacheCount = 0;

function compilePath(pattern, options) {
  const cacheKey = `${options.end}${options.strict}${options.sensitive}`;
  const cache = patternCache[cacheKey] || (patternCache[cacheKey] = {});

  if (cache[pattern]) {
    return cache[pattern];
  }

  const keys = [];
  const re = pathToRegexp(pattern, keys, options);
  const compiledPattern = { re, keys };

  if (cacheCount < cacheLimit) {
    cache[pattern] = compiledPattern;
    cacheCount++;
  }

  return compiledPattern;
}

export function matchPath(pathname, options = {}) {
  if (typeof options === 'string') {
    options = { path: options };
  }

  if (options.path === '*') {
    return true;
  }

  pathname = pathname.split('#')[0];

  const {
    path = '/',
    exact = false,
    strict = false,
    sensitive = false,
  } = options;
  const { re, keys } = compilePath(path, { end: exact, strict, sensitive });
  const match = re.exec(pathname);

  if (!match) {
    return null;
  }

  const [url, ...values] = match;
  const isExact = pathname === url;

  if (exact && !isExact) {
    return null;
  }

  return {
    path,
    url: path === '/' && url === '' ? '/' : url,
    isExact,
    params: keys.reduce((memo, key, index) => {
      memo[key.name] = values[index];
      return memo;
    }, {}),
  };
}
