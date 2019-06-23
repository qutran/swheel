<script>
  import BaseRouter from './BaseRouter';
  import { createMemoryHistory } from './utils/history';
  const history = createMemoryHistory();
</script>

<BaseRouter {history}>
  <slot />
</BaseRouter>
