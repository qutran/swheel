<script>
  import BaseRouter from './BaseRouter.svelte';
  import { createMemoryHistory } from './utils/history/index.js';
  const history = createMemoryHistory();
</script>

<BaseRouter {history}>
  <slot />
</BaseRouter>
