<script>
  import { Router, Route, Redirect, Fallback } from '../Router';
  import Home from './components/Home';
  import Page1 from './components/Page1';
  import Page2 from './components/Page2';
  import NotFound from './components/NotFound';
</script>

<Router>
  <a href="/">to home</a>
  <a href="/page1">to page 1</a>
  <a href="/page2">to page 2</a>
  <a href="/page3">this redirects to page1</a>
  <a href="/page4">this redirects to page2</a>
  <a href="/page4/sub">this will not redirect to page2</a>
  <a href="/page5">this redirects to home</a>

  <Route path="/" exact>
    <Home />
  </Route>

  <Route path="/page1">
    <Page1 />
  </Route>

  <Route path="/page2">
    <Page2 />
  </Route>

  <Redirect from="/page3" to="/page1" />
  <Redirect from="/page4" to="/page2" exact />
  <!-- TODO should be fallback -->
  <Redirect from="/page5" to="/" />

  <Fallback>NotFound</Fallback>
</Router>
