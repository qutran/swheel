<script>
  import { MemoryRouter, Route } from '../../src/Router';
  import AddressBar from '../components/AddressBar';
  import Example from '../components/Example';
  import Home from './mock/Home';
  import Page1 from './mock/Page1';
  import Page2 from './mock/Page2';
</script>

<MemoryRouter>
  <AddressBar />
  <Example>
    <div slot="navigation">
      <a href="/">to home</a>
      <a href="/page1">to page 1</a>
      <a href="/page2">to page 2</a>
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
    </div>

  </Example>
</MemoryRouter>
