<script>
  import { getProtected } from './utils/protection.js';
  import { createRoute, getDepth } from './utils/register.js';
  import { createBasePath, getBasePath } from './utils/basePath.js';
  import { fragment } from './utils/fragment.js';
  import Lazy from './Lazy.svelte';

  export let path;
  export let lazy = null;
  export let component = null;
  export let throttle = 0;
  export let exact = false;
  export let when = true;

  const depth = getDepth();
  const routePath = getBasePath() + path;

  createBasePath(routePath);

  const [match, isRenderUnlocked] = createRoute({
    path: routePath,
    exact,
    depth,
  });
</script>

{#if $match && when && $isRenderUnlocked}
  {#if typeof lazy === 'function'}
    <Lazy component={lazy} {throttle} data={$match.params}>
      <template use:fragment slot="pending">
        <slot name="pending" />
      </template>
      <template use:fragment slot="catch">
        <slot name="catch" />
      </template>
    </Lazy>
  {:else if !!component}
    <svelte:component this={component} {...$match.params} />
  {:else}
    <slot params={$match.params} />
  {/if}
{/if}
