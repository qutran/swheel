import { writable } from 'svelte/store';

const STORAGE_KEY = 'theme';

let initialValue = localStorage.getItem(STORAGE_KEY);
if (!initialValue) {
  initialValue = 'light';
  localStorage.setItem(STORAGE_KEY, initialValue);
}

window.addEventListener('storage', ({ key, newValue }) => {
  if (key === STORAGE_KEY) {
    theme.set(newValue);
  }
});

export const theme = writable(initialValue);
export function toggleTheme() {
  theme.update(prevTheme => {
    const nextTheme = prevTheme === 'dark' ? 'light' : 'dark';
    localStorage.setItem(STORAGE_KEY, nextTheme);
    return nextTheme;
  });
}
