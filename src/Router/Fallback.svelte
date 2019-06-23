<script>
  import Route from './Route';
  import Lazy from './Lazy';
  import { createFallback } from './utils/register';
  import { fragment } from './utils/fragment';

  export let lazy = null;
  export let throttle = 0;

  const isFallback = createFallback();
</script>

{#if $isFallback}
  {#if lazy}
    <Lazy component={lazy} {throttle}>
      <template use:fragment slot="pending">
        <slot name="pending" />
      </template>
      <template use:fragment slot="catch">
        <slot name="catch" />
      </template>
    </Lazy>
  {:else}
    <slot />
  {/if}
{/if}
