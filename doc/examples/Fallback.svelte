<script>
  import { MemoryRouter, Route, Fallback } from '../../src/Router';
  import Example from '../components/Example';
  import Home from './mock/Home';
  import Page1 from './mock/Page1';
  import Page2 from './mock/Page2';
  import NotFound from './mock/NotFound';
</script>

<MemoryRouter>
  <Example>
    <div slot="navigation">
      <a href="/">to home</a>
      <a href="/page1">to page 1</a>
      <a href="/page2">to page 2</a>
      <a href="/page3">this page doesn't exists</a>
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

      <Fallback>
        <NotFound />
      </Fallback>
    </div>
  </Example>
</MemoryRouter>
