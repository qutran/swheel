<script>
  import { onMount, tick } from 'svelte';
  import { createLayout } from './utils/register';
  import { fragment } from './utils/fragment';

  export let component;

  const isAnyMatch = createLayout();
</script>

{#if $isAnyMatch}
  <svelte:component this={component}>
    <slot />
  </svelte:component>
{:else}
  <slot />
{/if}
