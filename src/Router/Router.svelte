<script>
  import { links } from './links';
  import { createProtection } from './utils/protection';
  import { createRouter } from './utils/register';
  import { createBrowserHistory } from './utils/history';
  import { fragment } from './utils/fragment';

  const history = createBrowserHistory();
  createRouter();
  createProtection();
</script>

<div use:links={{ history }}>
  <slot />
</div>
