<script>
  import { Router, Route, Layout } from '../Router';
  import Home from './components/Home';
  import Page1 from './components/Page1';
  import Page2 from './components/Page2';
</script>

<Router>
  <a href="/">to home</a>
  <a href="/page1">to page 1</a>
  <a href="/page2">to page 2</a>

  <Route path="/" exact>
    <Home />
  </Route>

  <Layout>
    <div slot="pending">
      <div>loading...</div>
    </div>

    <Route path="/page1">
      <Page1 />
    </Route>

    <Route path="/page2">
      <Page2 />
    </Route>
  </Layout>
</Router>
