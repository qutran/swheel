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

  function scrollToTop() {
    const scrollToView = tweened(page.scrollTop, { duration: 150 });

    scrollToView.subscribe(top => {
      page.scrollTo({ top });
    });

    scrollToView.set(0);
  }

  function toggle() {
    isMenuOpen = !isMenuOpen;
  }

  setContext('scrollToTop', scrollToTop);

  onMount(() => {
    onScroll();
  });
</script>

<style>
  .page {
    overflow: auto;
    background: #fff;
    height: 100%;
    box-shadow: var(--depth5);
    background: var(--secondary-color);
    transform: scale3d(1, 1, 1) translate3d(0, 0, 0);
    transition: transform 200ms;
    will-change: transform;
  }

  .page.isMenuOpen {
    transform: scale3d(0.8, 0.8, 0.8) translate3d(50%, 0, 0);
  }

  .contentContainer {
    overflow: auto;
  }
</style>

<Menu />

<div class="page" on:scroll={onScroll} class:isMenuOpen bind:this={page}>
  <Header on:toggleMenu={toggle} isFixed={isFixedHeader} />
  <div class="contentContainer">
    <slot />
  </div>
</div>
