<script context="module">
  let id = 0;
  const cachedHistory = new Map();

  export function getHistoryById(historyId) {
    return cachedHistory.get(historyId);
  }
</script>

<script>
  import { onDestroy } from 'svelte';
  import { links } from './links';
  import { createProtection } from './utils/protection';
  import { createRouter } from './utils/register';
  import { fragment } from './utils/fragment';

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
