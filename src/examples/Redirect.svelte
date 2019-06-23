<script>
  import { Router, Route, Redirect } from '../Router';
  import Home from './components/Home';
  import Page1 from './components/Page1';
  import Page2 from './components/Page2';
</script>

<Router>
  <a href="/">to home</a>
  <a href="/page1">to page 1</a>
  <a href="/page2">to page 2</a>
  <a href="/page3">this redirects to home</a>
  <a href="/page4">this too</a>

  <Route path="/" exact>
    <Home />
  </Route>

  <Route path="/page1">
    <Page1 />
  </Route>

  <Route path="/page2">
    <Page2 />
  </Route>

  <Redirect to="/" />
</Router>
