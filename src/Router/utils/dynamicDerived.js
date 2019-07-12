import { tick } from 'svelte';
import { get } from 'svelte/store';

export function dynamicDerived(callback) {
  let subjects = new Map();
  let listeners = [];

  function subscribe(listener) {
    listeners.push(listener);
    listener(getDerivedValue());
    return () => {
      listeners = listeners.filter(_listener => _listener !== listener);
    };
  }

  function getDerivedValue() {
    let values = [];
    for (const [_, { value }] of subjects) {
      values.push(value);
    }
    return callback(values);
  }

  async function notify() {
    await tick();
    const value = getDerivedValue();
    for (const listener of listeners) {
      listener(value);
    }
  }

  function push(subject) {
    const value = get(subject);
    const sub = subject.subscribe(nextValue => {
      if (subjects.has(subject)) {
        subjects.get(subject).value = nextValue;
        notify();
      }
    });
    subjects.set(subject, { sub, value });
    notify();
  }

  function remove(subject) {
    subjects.get(subject).sub();
    subjects.delete(subject);
    notify();
  }

  return { subscribe, push, remove };
}
