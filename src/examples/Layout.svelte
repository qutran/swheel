<script>
  import { Router, Route, Layout } from '../Router';
  import Home from './components/Home';
  import Page1 from './components/Page1';
  import Page2 from './components/Page2';
  import MainLayout from './components/MainLayout';

  let c = 0;
  setInterval(() => {
    c++;
  }, 1000);
</script>

<Router>
  <a href="/">to home</a>
  <a href="/page1">to page 1</a>
  <a href="/page2">to page 2</a>

  <Route path="/" exact>
    <Home />
  </Route>

  <Layout component={MainLayout}>
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
