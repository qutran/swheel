<script>
  import { fade } from 'svelte/transition';
  import { loadSvg } from './cache';

  export let src = null;
  export let style = '';

  $: promise = loadSvg(src);
</script>

<style>
  div {
    display: flex;
  }
</style>

{#await promise}
  <slot name="pending" />
{:then text}
  <div {style} in:fade={{ duration: 600 }}>
    {@html text}
  </div>
{:catch}
  <slot name="error" />
{/await}
