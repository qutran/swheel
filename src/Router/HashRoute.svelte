<script>
  import { getHistory } from './utils/history';
  import { get, derived } from 'svelte/store';
  import { fragment } from './utils/fragment';
  import Lazy from './Lazy';

  export let lazy = null;
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
    <Lazy component={lazy} {throttle} data={$match.params}>
      <template use:fragment slot="pending">
        <slot name="pending" />
      </template>
      <template use:fragment slot="catch">
        <slot name="catch" />
      </template>
    </Lazy>
  {:else}
    <slot {removeHash} />
  {/if}
{/if}
