import { setContext, getContext } from 'svelte';
import { derived, writable } from 'svelte/store';

const CONTEXT_KEY = '_protection';

export function createProtection() {
  setContext(CONTEXT_KEY, []);
}

export function createLocalProtection(initial) {
  const localProtection = writable(initial);
  setContext(CONTEXT_KEY, [...getContext(CONTEXT_KEY), localProtection]);
  return localProtection;
}

export function getProtected() {
  return derived(getContext(CONTEXT_KEY), protections =>
    protections.reduce((acc, next) => acc && next, true),
  );
}
