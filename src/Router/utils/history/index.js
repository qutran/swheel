import { setContext, getContext } from 'svelte';
import { createMemoryHistory as createBaseMemoryHistory } from './memoryHistory';
import { createBrowserHistory as createBaseBrowserHistory } from './browserHistory';

export const HISTORY_KEY = '__history';

function createHistory(baseHistory) {
  setContext(HISTORY_KEY, baseHistory);
  return baseHistory;
}

export function getHistory() {
  return getContext(HISTORY_KEY);
}

export function createBrowserHistory() {
  return createHistory(createBaseBrowserHistory());
}

export function createMemoryHistory() {
  return createHistory(createBaseMemoryHistory());
}
