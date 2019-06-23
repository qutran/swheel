<script>
  import { MemoryRouter, Route, Fallback } from '../../src/Router';
  import Example from '../components/Example';
  import Home from './mock/Home';

  async function simulatedUnexistedComponent(ms) {
    throw new Error();
  }

  const Page1 = () => import('./mock/Page1');
  const Page2 = () => import('./mock/Page2');
  const NotFound = () => import('./mock/NotFound');
  const UnexistedComponent = () => simulatedUnexistedComponent(500);
</script>

<MemoryRouter>
  <Example>
    <div slot="navigation">
      <a href="/">to home</a>
      <a href="/page1">to page 1 (without throttling)</a>
      <a href="/page2">to page 2</a>
      <a href="/unexisted">to page with unexisted component</a>
      <a href="/page3">to unexisted page</a>
    </div>

    <div slot="content">
      <Route path="/" exact>
        <Home />
      </Route>

      <Route path="/page1" lazy={Page1}>
        <div slot="pending">loading...</div>
        <div slot="catch">something wrong :(</div>
      </Route>

      <Route path="/page2" lazy={Page2} throttle={600}>
        <div slot="pending">loading...</div>
        <div slot="catch">something wrong :(</div>
      </Route>

      <Route path="/unexisted" lazy={UnexistedComponent} throttle={600}>
        <div slot="pending">loading...</div>
        <div slot="catch">something wrong :(</div>
      </Route>

      <Fallback lazy={NotFound} />
    </div>
  </Example>
</MemoryRouter>
