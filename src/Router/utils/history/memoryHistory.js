import { onDestroy } from 'svelte';
import { createBaseHistory } from './baseHistory';

export function createMemoryHistory() {
  const startPath = '/';
  const {
    currentPath,
    setPath,
    block,
    unblock,
    isBlocked,
    acceptLeave,
    cancelLeave,
    onLeave,
    offLeave,
    wasTriedToLeave,
  } = createBaseHistory(startPath);

  let currentState = 0;
  let stack = [startPath];
  let pendingAction = null;
  let stackListeners = [];

  function push(to) {
    if (isBlocked()) return [push, [to]];
    if (stack[currentState] === to) return;
    currentState++;
    stack = stack.slice(0, currentState).concat(to);
    setPath(to);
    onStackUpdate();
  }

  function back() {
    if (!isHasPrevious()) return;
    if (isBlocked()) return [back, []];
    currentState--;
    setPath(stack[currentState]);
    onStackUpdate();
  }

  function forward() {
    if (!isHasNext()) return;
    if (isBlocked()) return [forward, []];
    currentState++;
    setPath(stack[currentState]);
    onStackUpdate();
  }

  function replace(to) {
    if (isBlocked()) return [replace, []];
    stack[currentState] = to;
    setPath(to);
    onStackUpdate();
  }

  function isHasNext() {
    return currentState < stack.length - 1;
  }

  function isHasPrevious() {
    return !!currentState;
  }

  function wrapAfterAction(action) {
    return (...args) => {
      const presentedPendingAction = action(...args);
      if (presentedPendingAction) {
        pendingAction = presentedPendingAction;
        wasTriedToLeave();
      }
    };
  }

  function onAcceptLeave() {
    acceptLeave();
    const [fn, args] = pendingAction;
    fn(...args);
  }

  function stackSubscribe(listener) {
    const hasNext = isHasNext();
    const hasPrev = isHasPrevious();
    listener({ stack, state: currentState, hasNext, hasPrev });
    stackListeners.push(listener);

    return function stackUnsubscribe() {
      stackListeners = stackListeners.filter(
        _listener => _listener !== listener,
      );
    };
  }

  function onStackUpdate() {
    const hasNext = isHasNext();
    const hasPrev = isHasPrevious();
    stackListeners.forEach(listener =>
      listener({ stack, state: currentState, hasNext, hasPrev }),
    );
  }

  onDestroy(() => {
    currentState = 0;
    stack = null;
    pendingAction = null;
    stackListeners = null;
  });

  return {
    currentPath,
    push: wrapAfterAction(push),
    back: wrapAfterAction(back),
    forward: wrapAfterAction(forward),
    replace: wrapAfterAction(replace),
    block,
    unblock,
    acceptLeave: onAcceptLeave,
    cancelLeave,
    onLeave,
    offLeave,

    // Memory history specific field
    stack: { subscribe: stackSubscribe },
  };
}
