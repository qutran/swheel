<script>
  import { fly } from 'svelte/transition';
</script>

<style>
  div {
    position: absolute;
  }
</style>

<div in:fly={{ x: -200, duration: 200 }}>SubRoute1</div>
