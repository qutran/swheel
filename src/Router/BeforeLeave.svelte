<script>
  import { onMount, onDestroy } from 'svelte';
  import { getHistory } from './utils/history';

  export let shouldDetectLeave = true;

  const history = getHistory();
  const { acceptLeave, cancelLeave } = history;

  let isLeaving = false;

  function onLeave(_isLeaving) {
    isLeaving = _isLeaving;
  }

  $: shouldDetectLeave ? history.block() : history.unblock();

  history.onLeave(onLeave);

  onDestroy(() => {
    history.offLeave(onLeave);
  });
</script>

<slot {isLeaving} {cancelLeave} {acceptLeave} />
