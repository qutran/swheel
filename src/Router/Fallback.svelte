<script>
  import Route from './Route.svelte';
  import Lazy from './Lazy.svelte';
  import { createFallback } from './utils/register.js';
  import { fragment } from './utils/fragment.js';

  export let lazy = null;
  export let component = null;
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
  {:else if !!component}
    <svelte:component this={component} />
  {:else}
    <slot />
  {/if}
{/if}
