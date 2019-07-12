# Swheel

Declarative component-based [**svelte 3**](https://github.com/sveltejs/svelte) router.

## Install

`npm i --save swheel`

<!-- ## Usage

See [examples page](http://test.com/exampels 'examples page') -->

## API

### &lt;Router&gt;

<p>Should be placed on the top of your application. Applies special listener for every <code>&lt;a&gt;</code> element and initializes routing state for application's tree.</p>
<p>Uses browser history API.</p>

### &lt;MemoryRouter&gt;

<p>The same as <code>&lt;Router&gt;</code> but uses in-memory history API.</p>

### getHistory: <code>Function</code>

<p>
  Function that returns object of helper functions to work with history.
</p>

<p>This function should be called in the component's initialization step bacause <code>Router</code> and <code>MemoryRouter</code> uses svelte's context API as a core approach</p>

#### Methods:

<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Arguments</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>push</code></td>
      <td><code>path: String</code></td>
      <td>Push path to the history</td>
    </tr>
    <tr>
      <td><code>replace</code></td>
      <td><code>path: String</code></td>
      <td>Replace path in the current state of the history</td>
    </tr>
    <tr>
      <td><code>back</code></td>
      <td>-</td>
      <td>Move back in the history</td>
    </tr>
    <tr>
      <td><code>forward</code></td>
      <td>-</td>
      <td>Move forward in the history</td>
    </tr>
  </tbody>
</table>

#### Stores:

<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Subject</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>currentPath</code></td>
      <td><code>currentPath: String</code></td>
      <td>Current path in history</td>
    </tr>
    <tr>
      <td><code>stack</code><br />(<code>&lt;MemoryRouter&gt;</code> only)</td>
      <td><code>{ stack, hasNext, hasPrev }</code></td>
      <td>Set of fields with memory histories' metadata</td>
    </tr>
  </tbody>
</table>

### navLink: <code>Function</code>

<p>
  Svelte action. Allows to control <code>active</code> class (show/hide it) in case of matching <code>hred</code> attribute with current path of history. Active class name should be defined explicitly to be compiled with svelte.
</p>

<p>
  Ex. <code>&lt;a use:navLink={{ exact: true, activeClass: 'active' }} class="active" href="/path" /&gt;</code>
</p>

#### Parameters:

<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Default / required</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>exact</td>
      <td><code>Boolean</code></td>
      <td><code>false</code></td>
      <td>If pathes should have exactly matches</td>
    </td>
    <tr>
      <td>activeClass</td>
      <td><code>String</code></td>
      <td><code>'active'</code></td>
      <td>Class name that will be assigned in case of pathes matches</td>
    </td>
  </tbody>
</table>

### &lt;Route&gt;

<p>
  Specifies your route configuration.
</p>

<p>
  It is possible to define nested to routes.<br/>
  In this case all pathes will calculate relatively the parent path.<br />
  Ex. If parent route defined as <code>&lt;Route path="/parent" /&gt;</code> and child as <code>&lt;Route path="/child" /&gt;</code> - in this case nested route will be resolved by path <code>/parent/child</code>.
</p>

<table>
  <thead>
    <tr>
      <th>Prop</th>
      <th>Type</th>
      <th>Default / required</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td align="center">
        <code>path</code>
      </td>
      <td align="center"><code>String</code></td>
      <td align="center">required</td>
      <td>
        <p>Path to access the route.</p>
        <p>Could be defined as template with required and optional parameters (ex. <code>/pokemon/:id</code>).</p>
        <p>
          If <code>path</code> matched than parameters passing inside components from <code>lazy</code> or <code>component</code> as property (ex. <code>export let id</code>) or could be accessed from <code>let:params</code> and passed to the slot.
        </p>
      </td>
    </tr>
    <tr>
      <td align="center">
        <code>let:params</code>
      </td>
      <td align="center"><code>Object</code></td>
      <td align="center"><code>null</code></td>
      <td><p>Parameters resolved from <code>path</code></p></td>
    </tr>
    <tr>
      <td align="center"><code>exact</code></td>
      <td align="center"><code>Boolean</code></td>
      <td align="center"><code>false</code></td>
      <td>
        <p>Detects if path should have exactly matches</p>
      </td>
    </tr>
    <tr>
      <td align="center"><code>when</code></td>
      <td align="center"><code>Boolean</code></td>
      <td align="center"><code>true</code></td>
      <td>
        <p>Detects if route is using in current flow</p>
      </td>
    </tr>
    <tr>
      <td align="center"><code>component</code></td>
      <td align="center"><code>SvelteComponent</code></td>
      <td align="center"><code>null</code></td>
      <td>
        <p>Renders in case if <code>path</code> matched</p>
      </td>
    </tr>
    <tr>
      <td align="center"><code>lazy</code></td>
      <td align="center"><code>() => Promise&lt;SvelteComponent&gt;</code></td>
      <td align="center"><code>null</code></td>
      <td>
        <p>Function that returns promise that resolving the Svelte component</p>
        <p>Loading starts only on the first route matching and after that component will cache</p>
      </td>
    </tr>
    <tr>
      <td align="center"><code>throttle</code></td>
      <td align="center"><code>Number</code></td>
      <td align="center"><code>0</code></td>
      <td>
        <p>Uses in a couple with <code>lazy</code>.<p>
        <p>Determines minimal time (in ms) which component will not be displayed.</p>
        <p>Necessary for preventing flash effect when switching pending state to component.</p>
      </td>
    </tr>
    <tr>
      <td align="center"><code>&lt;slot /&gt;</code></td>
      <td align="center"><code>SvelteSlot</code></td>
      <td align="center"><code>-</code></td>
      <td>
        <p>Renders in the case if <code>lazy</code> or <code>component</code> props was't defined</p>
      </td>
    </tr>
    <tr>
      <td align="center"><code>&lt;slot name="pending" /&gt;</code></td>
      <td align="center"><code>SvelteSlot</code></td>
      <td align="center"><code>-</code></td>
      <td>
        <p>Renders when component from <code>lazy</code> field is loading</p>
      </td>
    </tr>
    <tr>
      <td align="center"><code>&lt;slot name="catch" /&gt;</code></td>
      <td align="center"><code>SvelteSlot</code></td>
      <td align="center"><code>-</code></td>
      <td>
        <p>Renders when component from <code>lazy</code> field is failed to load</p>
      </td>
    </tr>
  </tbody>
</table>

### &lt;Layout&gt;

<p>
  Provides the possibility to declaratively define layouts around the group of routes and will be rendered only in the case if any path of these routes matches.
</p>

<table>
  <thead>
    <tr>
      <th>Prop</th>
      <th>Type</th>
      <th>Default / required</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td align="center"><code>component</code></td>
      <td align="center"><code>SvelteComponent</code></td>
      <td align="center">required</td>
      <td>
        Layout component that wraps the group of routes. <code>&lt;slot/&gt;</code> content of <code>lt;Layout&gt;</code> will be passed to it.
        Renders only in case if any path of inner routes matches.
      </td>
    </tr>
    <tr>
      <td align="center"><code>&lt;slot /&gt;</code></td>
      <td align="center"><code>SvelteSlot</code></td>
      <td align="center"><code>-</code></td>
      <td>
        <p>Will be passed to the <code>component</code>.</p>
      </td>
    </tr>
  </tbody>
</table>

### &lt;HashRoute&gt;

<p>
  Extends <code>&lt;Route&gt;</code> without <code>path</code> property and expands with own ones.
</p>
<p>
  Route that displays content, when history hash (#) matches.
</p>

<table>
  <thead>
    <tr>
      <th>Prop</th>
      <th>Type</th>
      <th>Default / required</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>hash</code></td>
      <td><code>String</code></td>
      <td>required</td>
      <td>Should start with <code>#</code></td>
    </tr>
    <tr>
      <td><code>let:removeHash</code></td>
      <td><code>Function</code></td>
      <td>-</td>
      <td>
        Passes to <code>component</code> or <code>lazy</code> as property.<br/>
        Function that allows to remove hash from history.<br/>
        Usefull in a couple with modals etc.
      </td>
    </tr>
  </tbody>
</table>

### &lt;Fallback&gt;

<p>
  Extends <code>&lt;Route&gt;</code> without <code>path</code> property.
</p>
<p>
  Renders component from <code>lazy</code>, <code>component</code> or <code>&lt;slot /&gt;</code> if any defined route wasn't rendered.<br/>
  Usefull for <code>404 (NotFound)</code> pages.
</p>

### &lt;Redirect&gt;

<p>
  Determines overriding of current location. <br />
  Nested redirect will define <code>from</code> path relatively to the parent route's <code>path</code>.
</p>

<table>
  <thead>
    <tr>
      <th>Prop</th>
      <th>Type</th>
      <th>Default / required</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>to</code></td>
      <td><code>String</code></td>
      <td>required</td>
      <td>
        Defines path to which redirect in case of <code>from</code> matched
      </td>
    </tr>
    <tr>
      <td><code>from</code></td>
      <td><code>String</code></td>
      <td><code>'*'</code></td>
      <td>
        Determines the path that should be overrided.<br/>
        If <code>*</code> specified than redirect will be triggered from path that doesn't matched for any route.
      </td>
    </tr>
    <tr>
      <td><code>exact</code></td>
      <td><code>Boolean</code></td>
      <td><code>false</code></td>
      <td>
        Detects if path of <code>from</code> property should have exactly matches
      </td>
    </tr>
  </tbody>
</table>

### &lt;BeforeLeave&gt;

<p>
  Provides possibility to prevent leaving from the page.
</p>
<p>
  Usefull if there is a form on the page and in the case of it's filled to prevent leaving.
</p>

<table>
  <thead>
    <tr>
      <th>Prop</th>
      <th>Type</th>
      <th>Default / required</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>shouldDetectLeave</code></td>
      <td><code>Boolean</code></td>
      <td><code>true</code></td>
      <td>Detects if leaving should be detected</td>
    </tr>
    <tr>
      <td><code>let:isLeaving</code></td>
      <td><code>Boolean</code></td>
      <td><code>true</code></td>
      <td>Detects if user trying to leave the page</td>
    </tr>
    <tr>
      <td><code>let:cancelLeave</code></td>
      <td><code>Function</code></td>
      <td>-</td>
      <td>Cancel transition from the page</td>
    </tr>
    <tr>
      <td><code>let:acceptLeave</code></td>
      <td><code>Function</code></td>
      <td>-</td>
      <td>Accept transition from the page. User will be moved to the page where he tried to go before.</td>
    </tr>
    <tr>
      <td><code>&lt;slot /&gt;</code></td>
      <td><code>SvelteSlot</code></td>
      <td>-</td>
      <td>Child content of the component</td>
    </tr>
  </tbody>
</table>

### &lt;Protected&gt;

<p>
  Protects displaying of nested routes. If routes was wrapped with some content before - it (content) will be displayed in any case. 
</p>

<table>
  <thead>
    <tr>
      <th>Prop</th>
      <th>Type</th>
      <th>Default / required</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>when</code></td>
      <td><code>Boolean</code></td>
      <td><code>true</code></td>
      <td>Detects if routes should be displayed in the subtree</td>
    </td>
  </tbody>
</table>

# TODO

1. SSR
2. Examples
