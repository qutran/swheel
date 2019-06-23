<script>
  import { Router, Route } from '../Router';
  import Home from './components/Home';

  async function simulatedUnexistedPage(ms) {
    throw new Error();
  }

  const Page1 = () => import('./components/Page1');
  const Page2 = () => import('./components/Page2');
  const UnexistedPage = () => simulatedUnexistedPage(500);
</script>

<Router>
  <a href="/">to home</a>
  <a href="/page1">to page 1</a>
  <a href="/page2">to page 2</a>
  <a href="/unexisted">to unexisted page</a>

  <Route path="/" exact>
    <Home />
  </Route>

  <Route path="/page1" lazy={Page1}>
    <div slot="pending">loading...</div>
    <div slot="catch">something wrong :(</div>
  </Route>

  <Route path="/page2" lazy={Page2} throttle={1000}>
    <div slot="pending">loading...</div>
    <div slot="catch">something wrong :(</div>
  </Route>

  <Route path="/unexisted" lazy={UnexistedPage} throttle={1000}>
    <div slot="pending">loading...</div>
    <div slot="catch">something wrong :(</div>
  </Route>
</Router>
