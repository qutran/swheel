<script>
  import { getPromiseFromCache } from './utils/lazyCache';

  export let component;
  export let throttle;
  export let data = {};

  $: promise = getPromiseFromCache(component, throttle);
</script>

{#await promise}
  <slot name="pending" />
{:then loadedComponent}
  <svelte:component this={loadedComponent.default} {...data} />
{:catch}
  <slot name="catch" />
{/await}
