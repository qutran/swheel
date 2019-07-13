<script>
  import { Router, Route, Redirect, Layout } from '../Router';
  import Home from './components/Home';
  import Page1 from './components/Page1';
  import Page2 from './components/Page2';
  import MainLayout from './components/MainLayout';

  let isAuth = true;
</script>

<Router>
  <a href="/">to home</a>
  <a href="/page1">to page 1</a>
  <a href="/page2">to page 2</a>
  <a href="/page4">to page 4</a>
  <a href="/page5">to page 5</a>

  <Route path="/" exact>
    <Home />
  </Route>

  <Layout component={MainLayout} when={isAuth}>
    <Route path="/page1">
      <Page1 />
    </Route>

    <Route path="/page2">
      <Page2 />
    </Route>

    <Redirect from="/page4" to="/page1" />
    <Redirect from="/page5" to="/page2" />
  </Layout>
</Router>
