import { getContext, setContext } from 'svelte';

const CONTEXT_KEY = '_base_path';

export function createBasePath(basePath) {
  setContext(CONTEXT_KEY, basePath);
}

export function getBasePath() {
  return getContext(CONTEXT_KEY) || '';
}
