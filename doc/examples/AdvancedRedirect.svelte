<script>
  import { MemoryRouter, Route, Redirect } from '../../src/Router';
  import Example from '../components/Example';
  import Home from './mock/Home';
  import Page1 from './mock/Page1';
  import Page2 from './mock/Page2';
  import NotFound from './mock/NotFound';
</script>

<MemoryRouter>
  <Example title="AdvancedRedirect">
    <div slot="navigation">
      <a href="/">to home</a>
      <a href="/page1">to page 1</a>
      <a href="/page2">to page 2</a>
      <a href="/page3">this redirects to page1</a>
      <a href="/page4">this redirects to page2</a>
      <a href="/page4/sub">this will not redirect to page2</a>
      <a href="/page5">this redirects to home</a>
    </div>

    <div slot="content">
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
    </div>
  </Example>
</MemoryRouter>
