import { writable } from 'svelte/store';

const browserHistory = window.history;

export const history = writable(
  location.pathname + location.search + location.hash,
);

let headId = browserHistory.state || 0;
let pendingLeaveState = null;
let shouldDetectLeave = false;
let onLeaving = () => {};

export async function push(to) {
  try {
    checkBeforeLeave();
    browserHistory.pushState(++headId, null, to);
    history.set(location.pathname + location.search + location.hash);
    pendingLeaveState = null;
  } catch (path) {
    pendingLeaveState = { action: 'push', to };
    console.warn('navigation cancelled', { from: path, to });
  }
}

export function replace(to) {
  browserHistory.replaceState(headId, null, to);
  history.set(location.pathname + location.search + location.hash);
}

export function setShouldDetectLeave(_shouldDetectLeave) {
  shouldDetectLeave = _shouldDetectLeave;
  console.log({ shouldDetectLeave });
}

export function setOnLeaving(_onLeaving) {
  onLeaving = _onLeaving;
}

export function continueLeave() {
  if (pendingLeaveState) {
    pendingLeaveState.isConfirmed = true;
    ({ back, forward, push }[pendingLeaveState.action](pendingLeaveState.to));
  }
}

export function back() {
  browserHistory.back();
}

export function forward() {
  browserHistory.forward();
  history.set(location.pathname + location.search + location.hash);
}

window.addEventListener('popstate', e => {
  try {
    checkBeforeLeave();
    headId = e.state;
    history.set(location.pathname + location.search + location.hash);
    pendingLeaveState = null;
  } catch (path) {
    if (headId !== e.state) {
      const action = headId - e.state < 0 ? 'back' : 'forward';
      browserHistory[action]();
      pendingLeaveState = { action: action === 'back' ? 'forward' : 'back' };
      console.warn('navigation cancelled', pendingLeaveState.action);
    }
  }
});

function checkBeforeLeave() {
  const isPendingLeaveConfirmed =
    pendingLeaveState && pendingLeaveState.isConfirmed;

  if (isPendingLeaveConfirmed) {
    return;
  }

  if (shouldDetectLeave) {
    onLeaving();
    throw location.pathname;
  }
}
