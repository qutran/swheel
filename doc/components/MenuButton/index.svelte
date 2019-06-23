<script>
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();
  let isOpen = true;

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
    animation: hide-show 0.5s ease;
  }

  @keyframes hide-show {
    0%,
    99% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  .open:before,
  .open:after {
    background: var(--text-color);
    content: '';
    height: 2px;
    display: block;
    position: absolute;
    border-radius: 2px;
    transition: all 0.5s ease;
  }

  .open:before {
    animation: open-before 0.5s ease both;
  }

  @keyframes open-before {
    0% {
      width: 100%;
      top: 15px;
      left: 0;
      transform: rotate(45deg) translate(2px, 2px);
    }
    25% {
      width: 0;
      top: 0;
      left: 0;
      transform: rotate(45deg) translate(0, 0);
    }
    50% {
      width: 0;
      top: 0;
      left: 0;
      transform: rotate(0deg) translate(0, 0);
    }
    90% {
      width: 100%;
      top: 0;
      left: 0;
    }
    100% {
      width: 100%;
      top: 15px;
      left: 0;
    }
  }

  .open:after {
    animation: open-after 0.5s ease both;
  }

  @keyframes open-after {
    0% {
      width: 100%;
      bottom: 15px;
      left: 0;
      transform: rotate(-45deg) translate(-5px, -5px);
    }
    25% {
      width: 0;
      bottom: 0;
      left: 0;
      transform: rotate(-45deg) translate(0, 0);
    }
    50% {
      width: 0;
      bottom: 0;
      right: 0;
      transform: rotate(0deg) translate(0, 0);
    }
    90% {
      width: 100%;
      bottom: 0;
      right: 0;
    }
    100% {
      width: 100%;
      bottom: 15px;
      right: 0;
    }
  }

  .close:before,
  .close:after {
    background: var(--text-color);
  }

  .close:before {
    animation: close-before 0.5s ease both;
  }

  @keyframes close-before {
    0% {
      width: 100%;
      top: 15px;
      right: 0;
    }
    25% {
      width: 100%;
      top: 0;
      right: 0;
    }
    50% {
      width: 0;
      top: 0;
      right: 0;
      transform: rotate(0deg) translate(0, 0);
    }
    90% {
      width: 0;
      bottom: 0;
      right: 0;
      transform: rotate(-45deg) translate(0, 0);
    }
    100% {
      width: 100%;
      top: 14px;
      right: 0;
      transform: rotate(-45deg) translate(-5px, 5px);
    }
  }

  .close:after {
    animation: close-after 0.5s ease both;
  }

  @keyframes close-after {
    0% {
      width: 100%;
      bottom: 15px;
      left: 0;
    }
    25% {
      width: 100%;
      bottom: 0;
      left: 0;
    }
    50% {
      width: 0;
      bottom: 0;
      right: 0;
      transform: rotate(0deg) translate(0, 0);
    }
    90% {
      width: 0;
      bottom: 0;
      right: 0;
      transform: rotate(45deg) translate(0, 0);
    }
    100% {
      width: 100%;
      bottom: 10px;
      right: 0;
      transform: rotate(45deg) translate(-5px, -5px);
    }
  }
</style>

<div class="open" class:close={!isOpen} on:click={onClick} />
