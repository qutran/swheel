<script>
  import { Router, Route, HashRoute } from '../Router';
  import Home from './components/Home';
  import Page1 from './components/Page1';
  import Page2 from './components/Page2';
</script>

<Router>
  <a href="/">to home</a>
  <a href="/page1">to page 1</a>
  <a href="/page2">to page 2</a>
  <a href="/page2#hash">to page 2 with hash</a>

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
</Router>
