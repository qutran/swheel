<script>
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();
  export let isOpen;

  function onClick() {
    isOpen = !isOpen;
    dispatch('click');
  }
</script>

<style>
  .open {
    position: relative;
    width: 24px;
    height: 40px;
    display: block;
    cursor: pointer;
  }

  .open:before,
  .open:after {
    background: var(--text-color);
    content: '';
    height: 2px;
    display: block;
    position: absolute;
    border-radius: 2px;
  }

  .open:before {
    width: 100%;
    top: 15px;
    left: 0;
  }

  .open:after {
    width: 100%;
    bottom: 15px;
    right: 0;
  }

  .close:before,
  .close:after {
    background: var(--text-color);
  }

  .close:before {
    width: 100%;
    top: 14px;
    right: 0;
    transform: rotate(-45deg) translate(-5px, 5px);
  }

  .close:after {
    width: 100%;
    bottom: 10px;
    right: 0;
    transform: rotate(45deg) translate(-5px, -5px);
  }
</style>

<div class="open" class:close={isOpen} on:click={onClick} />
