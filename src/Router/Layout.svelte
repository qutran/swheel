<script>
  import { onMount, tick } from 'svelte';
  import { createLayout } from './utils/register';
  import { fragment } from './utils/fragment';
  import Protected from './Protected';

  export let component;
  export let when = true;

  const isAnyMatch = createLayout();
</script>

<Protected {when}>
  {#if $isAnyMatch}
    <svelte:component this={component}>
      <slot />
    </svelte:component>
  {:else}
    <slot />
  {/if}
</Protected>
