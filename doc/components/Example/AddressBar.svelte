<script>
  import { derived } from 'svelte/store';
  import { getHistory } from '../../../src/Router';
  import LazySvg from '../LazySvg';
  import ArrowLeft from '../../icons/arrowLeft.svg';

  const { stack, currentPath, back, forward, push } = getHistory();
  const hasPrev = derived(stack, $stack => $stack.hasPrev);
  const hasNext = derived(stack, $stack => $stack.hasNext);

  let value = '';

  $: value = $currentPath;
  $: value = value.length ? value : '/';

  function go() {
    push(value);
  }
</script>

<style>
  .addressBar {
    width: 100%;
    height: 36px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: var(--text-color);
    padding: 0 8px;
    margin-bottom: 16px;
    box-sizing: border-box;
  }

  input {
    width: 100%;
    height: 100%;
    background: var(--primary-color);
    color: var(--text-color);
    border-radius: 20px;
    border: 0;
    outline: 0;
    padding: 0 20px;
    margin: 0 8px;
    box-shadow: var(--depth1);
  }

  button,
  .navButton {
    cursor: pointer;
  }

  .navButton {
    opacity: 0.5;
    pointer-events: none;
    margin: 0 8px;
    user-select: none;
    -webkit-user-select: none;
  }

  .navButton.active {
    opacity: 1;
    pointer-events: all;
  }

  .navButton.next {
    transform: rotate(180deg);
  }

  button[type='submit'] {
    background: var(--primary-color);
    color: var(--text-color);
    border: none;
    border-radius: 50%;
    height: 36px;
    width: 36px;
    min-width: 36px;
    margin: 0 8px;
    box-shadow: var(--depth1);
  }
</style>

<form class="addressBar" on:submit|preventDefault={go}>
  <span on:click={back} class="navButton" class:active={$hasPrev}>
    <LazySvg src={ArrowLeft} />
  </span>
  <span on:click={forward} class="navButton next" class:active={$hasNext}>
    <LazySvg src={ArrowLeft} />
  </span>
  <input type="text" bind:value />
  <button type="submit">go</button>
</form>
