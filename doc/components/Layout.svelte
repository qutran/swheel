<script>
  import Menu from './Menu';
  import Header from './Header';
  import { onMount, setContext } from 'svelte';
  import { tweened } from 'svelte/motion';

  let page;
  let isMenuOpen = true;
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
    box-shadow: var(--depth5);
    background: var(--secondary-color);
    width: 100%;
  }

  .contentContainer {
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

  :global(button) {
    cursor: pointer;
    border: none;
    border-radius: 4px;
    background: var(--link-color);
    color: var(--primary-color);
    outline: 0;
    opacity: 1;
    transition: opacity 100ms;
    font-size: 16px;
  }
</style>

<div class="layout" class:isMenuOpen>
  <Menu />

  <div class="page" on:scroll={onScroll} bind:this={page}>
    <Header on:toggleMenu={toggle} isFixed={isFixedHeader} {isMenuOpen} />
    <div class="contentContainer">
      <slot />
    </div>
  </div>
</div>
