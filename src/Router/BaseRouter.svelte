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

<object aria-label="links" use:links={{ history }}>
  <slot />
</object>
