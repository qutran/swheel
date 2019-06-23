<script>
  import { MemoryRouter, Route, HashRoute } from '../../src/Router';
  import Example from '../components/Example';
  import Home from './mock/Home';
  import Page1 from './mock/Page1';
  import Page2 from './mock/Page2';
</script>

<MemoryRouter>
  <Example>
    <div slot="navigation">
      <a href="/">to home</a>
      <a href="/page1">to page 1</a>
      <a href="/page2">to page 2</a>
      <a href="/page2#hash">to page 2 with hash</a>
    </div>

    <div slot="content">
      <Route path="/" exact>
        <Home />
      </Route>

      <Route path="/page1">
        <Page1 />
      </Route>

      <Route path="/page2" exact>
        <Page2 />
        <HashRoute hash="#hash" let:removeHash>
          <div>Hash Item</div>
          <button on:click={removeHash}>Remove hash</button>
        </HashRoute>
      </Route>
    </div>
  </Example>
</MemoryRouter>
