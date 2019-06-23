import { writable } from 'svelte/store';

export function createBaseHistory(initialPath) {
  let _isBlocked = false;
  let _isLeaving = false;
  let _leaveListeners = [];
  let currentPath = writable(initialPath);

  function setPath(path) {
    currentPath.set(path);
  }

  function block() {
    _isBlocked = true;
  }

  function unblock() {
    _isBlocked = false;
  }

  function isBlocked() {
    return _isBlocked;
  }

  function wasTriedToLeave() {
    if (!_isLeaving) {
      _isLeaving = true;
      _leaveListeners.forEach(listener => listener(_isLeaving));
    }
  }

  function acceptLeave() {
    unblock();
    _isLeaving = false;
  }

  function cancelLeave() {
    _isLeaving = false;
    _leaveListeners.forEach(listener => listener(_isLeaving));
  }

  function onLeave(callback) {
    _leaveListeners.push(callback);
  }

  function offLeave(callback) {
    _leaveListeners = _leaveListeners.filter(listener => listener !== callback);
  }

  return {
    setPath,
    block,
    unblock,
    isBlocked,
    acceptLeave,
    cancelLeave,
    onLeave,
    offLeave,
    wasTriedToLeave,
    currentPath: { subscribe: currentPath.subscribe },
  };
}
