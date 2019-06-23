<script>
  import BaseRouter from './BaseRouter';
  import { createBrowserHistory } from './utils/history';
  const history = createBrowserHistory();
</script>

<BaseRouter {history}>
  <slot />
</BaseRouter>
