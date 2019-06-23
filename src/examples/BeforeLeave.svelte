<script>
  import { Router, Route, BeforeLeave } from '../Router';
  import Home from './components/Home';
  import Page1 from './components/Page1';
  import Page2 from './components/Page2';
</script>

<Router>
  <a href="/">to home</a>
  <a href="/page1">to page 1</a>
  <a href="/page2">to page 2</a>

  <Route path="/" exact>
    <div>Go to page 2 and try to leave it</div>
    <Home />
  </Route>

  <Route path="/page1">
    <div>Go to page 2 and try to leave it</div>
    <Page1 />
  </Route>

  <Route path="/page2">
    <Page2 />
    <BeforeLeave let:isLeaving let:cancelLeave let:acceptLeave>
      {#if isLeaving}
        <div>Are you sure that you want to leave this page?</div>
        <button on:click={acceptLeave}>yes</button>
        <button on:click={cancelLeave}>no</button>
      {/if}
    </BeforeLeave>
  </Route>
</Router>
