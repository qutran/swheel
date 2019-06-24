<script>
  import Menu from './Menu';
  import Header from './Header';
  import { onMount, setContext } from 'svelte';
  import { tweened } from 'svelte/motion';

  let page;
  let isMenuOpen = false;
  let isFixedHeader = false;

  function onScroll() {
    isFixedHeader = !!page.scrollTop;
  }

  function toggle() {
    isMenuOpen = !isMenuOpen;
  }
</script>

<style>
  .layout {
    display: flex;
    height: 100%;
  }

  .page {
    overflow: auto;
    height: 100%;
    box-shadow: var(--depth5);
    background: var(--secondary-color);
    width: 100%;
    transition: width 150ms;
    will-change: width;
  }

  .contentContainer {
    overflow: auto;
    height: 100%;
  }

  @media screen and (max-width: 768px) {
    .page :global(.header) {
      position: fixed;
      left: 0;
      top: 0;
      width: 100%;
      box-shadow: var(--depth1);
    }

    .page {
      margin-top: calc(2 * var(--gap) + 40px);
    }

    .contentContainer {
      height: calc(100% - (2 * var(--gap) + 40px));
    }
  }
</style>

<div class="layout" class:isMenuOpen>
  <Menu />

  <div class="page" on:scroll={onScroll} bind:this={page}>
    <Header on:toggleMenu={toggle} isFixed={isFixedHeader} />
    <div class="contentContainer">
      <slot />
    </div>
  </div>
</div>
