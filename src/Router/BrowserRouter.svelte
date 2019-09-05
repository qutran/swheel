<script>
  import BaseRouter from './BaseRouter.svelte';
  import { createBrowserHistory } from './utils/history/index.js';
  const history = createBrowserHistory();
</script>

<BaseRouter {history}>
  <slot />
</BaseRouter>
