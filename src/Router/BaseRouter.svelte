<script>
  import { links } from './links';
  import { createProtection } from './utils/protection';
  import { createRouter } from './utils/register';
  import { fragment } from './utils/fragment';
  import { createBrowserHistory } from './utils/history';

  export let history;

  createRouter();
  createProtection();
</script>

<div use:links={{ history }}>
  <slot />
</div>
