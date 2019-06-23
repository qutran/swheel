<script>
  import { MemoryRouter, Route, Redirect, Protected } from '../../src/Router';
  import Example from '../components/Example';
  import Home from './mock/Home';
  import Page1 from './mock/Page1';
  import Page2 from './mock/Page2';

  let isAuthorized = false;
</script>

<MemoryRouter>
  <Example>
    <div slot="navigation">
      <a href="/">to home</a>
      <a href="/page1">to page 1</a>
      <a href="/page2">to page 2 (for authorized only)</a>
      <button on:click={() => (isAuthorized = !isAuthorized)}>
         {isAuthorized ? 'logout' : 'login'}
      </button>
    </div>

    <div slot="content">
      <Protected when={!isAuthorized}>
        <Route path="/" exact>
          <Home />
        </Route>

        <Route path="/page1">
          <Page1 />
        </Route>

        <Redirect to="/" />
      </Protected>

      <Protected when={isAuthorized}>
        <Route path="/page2">
          <Page2 />
        </Route>

        <Redirect to="/page2" />
      </Protected>
    </div>
  </Example>
</MemoryRouter>
