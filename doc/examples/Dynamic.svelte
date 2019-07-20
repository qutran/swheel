<script>
  import { MemoryRouter, Route } from '../../src/Router';
  import Example from '../components/Example';
  import Home from './mock/Home';
  import Dynamic from './mock/DynamicPage';
</script>

<MemoryRouter>
  <Example title="Basic">
    <div slot="navigation">
      <a href="/">to home</a>
      <a href="/3">to dynamic page passing 3 as parameter</a>
    </div>

    <div slot="content">
      <Route path="/" exact>
        <Home />
      </Route>

      <Route path="/page/:id" let:params={params}>
        <Dynamic {params} />
      </Route>

    </div>
  </Example>
</MemoryRouter>