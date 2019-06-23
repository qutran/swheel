<script>
  import MenuButton from '../MenuButton';
  import ThemeSwitcher from '../../theme/Switcher';
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();

  export let isFixed;

  let element;
</script>

<style>
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    padding: var(--gap);
    background: var(--secondary-color);
    position: -webkit-sticky;
    position: sticky;
    top: 0;
    z-index: 10;
    pointer-events: none;
  }

  .header > :global(*) {
    pointer-events: all;
  }

  .header:after {
    position: absolute;
    box-shadow: var(--depth2);
    opacity: 0;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    content: '';
    transition: opacity 150ms;
  }

  .header.isFixed:after {
    opacity: 1;
  }

  .left {
    display: flex;
    align-items: center;
  }

  .left > :global(:nth-child(1)) {
    margin-right: 12px;
  }
</style>

<div class="header" class:isFixed bind:this={element}>
  <div class="left">
    <MenuButton on:click={() => dispatch('toggleMenu')} />
    <ThemeSwitcher />
  </div>
</div>
