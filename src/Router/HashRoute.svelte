<script>
  import { get, derived } from 'svelte/store';
  import { getHistory } from './utils/history/index.js';
  import { fragment } from './utils/fragment.js';
  import Lazy from './Lazy.svelte';

  export let lazy = null;
  export let component = null;
  export let throttle = 0;
  export let hash;
  export let when = true;

  const { push, currentPath } = getHistory();

  export function removeHash() {
    const withoutHash = get(currentPath).split('#')[0];
    push(withoutHash);
  }

  const match = derived(currentPath, $currentPath => {
    return hash === `#${$currentPath.split('#')[1]}`;
  });
</script>

{#if $match && when}
  {#if lazy}
    <Lazy component={lazy} {throttle} {removeHash} data={$match.params}>
      <template use:fragment slot="pending">
        <slot name="pending" />
      </template>
      <template use:fragment slot="catch">
        <slot name="catch" />
      </template>
    </Lazy>
  {:else if !!component}
    <svelte:component this={component} {removeHash} {...$match.params} />
  {:else}
    <slot {removeHash} />
  {/if}
{/if}
