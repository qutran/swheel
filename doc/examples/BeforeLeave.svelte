<script>
  import { MemoryRouter, Route, BeforeLeave } from '../../src/Router';
  import Example from '../components/Example';
  import Home from './mock/Home';
  import Page1 from './mock/Page1';
  import Page2 from './mock/Page2';

  let value = '';
</script>

<MemoryRouter>
  <Example>
    <div slot="navigation">
      <a href="/">to home</a>
      <a href="/page1">to page 1</a>
      <a href="/page2">to page 2</a>
    </div>

    <div slot="content">
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
        <div>Leave detection will trigger if input's value not empty</div>
        <input bind:value />
        <BeforeLeave
          shouldDetectLeave={!!value.length}
          let:isLeaving
          let:cancelLeave
          let:acceptLeave>
          {#if isLeaving}
            <div>Are you sure that you want to leave this page?</div>
            <button on:click={acceptLeave}>yes</button>
            <button on:click={cancelLeave}>no</button>
          {/if}
        </BeforeLeave>
      </Route>
    </div>
  </Example>
</MemoryRouter>
