<script>
  import { afterUpdate } from 'svelte';
  import { createLocalProtection } from './utils/protection.js';
  export let when;

  const isProtected = createLocalProtection(when);

  afterUpdate(() => {
    $isProtected = when;
  });
</script>

<slot />
