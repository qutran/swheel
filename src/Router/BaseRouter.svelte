<script context="module">
  let id = 0;
  const cachedHistory = new Map();

  export function getHistoryById(historyId) {
    return cachedHistory.get(historyId);
  }
</script>

<script>
  import { onDestroy } from 'svelte';
  import { links } from './links.js';
  import { createProtection } from './utils/protection.js';
  import { createRouter } from './utils/register.js';
  import { fragment } from './utils/fragment.js';

  export let history;

  createRouter();
  createProtection();

  const mId = id++;
  cachedHistory.set(mId, history);

  onDestroy(() => {
    cachedHistory.delete(mId);
  });
</script>

<object aria-label="__links_{mId}" use:links={{ history }}>
  <slot />
</object>
