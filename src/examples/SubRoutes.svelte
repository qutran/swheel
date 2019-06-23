<script>
  import { Router, Route, Redirect } from '../Router';
  import Home from './components/Home';
  import Page1 from './components/Page1';
  import Page2 from './components/Page2';
  import SubRoutes from './components/SubRoutes';
</script>

<Router>
  <a href="/">to home</a>
  <a href="/page1">to page 1</a>
  <a href="/page2">to page 2</a>

  <Route path="/" exact>
    <div>Go to page 2 to see subroutes</div>
    <Home />
  </Route>

  <Route path="/page1">
    <div>Go to page 2 to see subroutes</div>
    <Page1 />
  </Route>

  <Route path="/page2">
    <Page2 />
    <a href="/page2/sub1">to sub route 1</a>
    <a href="/page2/sub2">to sub route 2</a>
    <SubRoutes />
  </Route>

  <Redirect to="/page2" />
</Router>
