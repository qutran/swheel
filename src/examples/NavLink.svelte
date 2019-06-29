<script>
  import { Router, Route, navLink } from '../Router';
  import Home from './components/Home';
  import Page1 from './components/Page1';
  import Page2 from './components/Page2';
</script>

<style>
  .active {
    background: pink;
    border-radius: 2px;
  }
</style>

<Router>
  <a use:navLink={{ exact: true }} class="active" href="/">to home</a>
  <a use:navLink class="active" href="/page1">to page 1</a>
  <a use:navLink class="active" href="/page2">to page 2</a>

  <Route path="/" exact>
    <Home />
  </Route>

  <Route path="/page1">
    <Page1 />
  </Route>

  <Route path="/page2">
    <Page2 />
  </Route>
</Router>
