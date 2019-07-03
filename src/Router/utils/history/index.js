import { setContext, getContext } from 'svelte';
import { createMemoryHistory as createBaseMemoryHistory } from './memoryHistory';
import { createBrowserHistory as createBaseBrowserHistory } from './browserHistory';

export const HISTORY_KEY = '__history';

function createHistory(baseHistory) {
  console.log('createHistory1');
  setContext(HISTORY_KEY, baseHistory);
  console.log('createHistory2');
  return baseHistory;
}

export function getHistory() {
  return getContext(HISTORY_KEY);
}

export function createBrowserHistory() {
  console.log('createBrowserHistory1');
  return createHistory(createBaseBrowserHistory());
}

export function createMemoryHistory() {
  return createHistory(createBaseMemoryHistory());
}
