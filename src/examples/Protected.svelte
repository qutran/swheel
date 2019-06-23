<script>
  import { Router, Route, Redirect, Protected } from '../Router';
  import Home from './components/Home';
  import Page1 from './components/Page1';
  import Page2 from './components/Page2';

  let isAuthorized = false;
</script>

<Router>
  <a href="/">to home</a>
  <a href="/page1">to page 1</a>
  <a href="/page2">to page 2 (for unauthorized only)</a>
  <button on:click={() => (isAuthorized = !isAuthorized)}>
     {isAuthorized ? 'logout' : 'login'}
  </button>

  <Protected when={isAuthorized}>
    <Route path="/" exact>
      <Home />
    </Route>

    <Route path="/page1">
      <Page1 />
    </Route>

    <Redirect to="/" />
  </Protected>

  <Protected when={!isAuthorized}>
    <Route path="/page2">
      <Page2 />
    </Route>

    <Redirect to="/page2" />
  </Protected>
</Router>
