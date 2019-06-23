<script>

</script>

<style>
  .example {
    font-size: 18px;
    display: flex;
    justify-content: center;
  }

  .navigation {
    padding: 8px;
    border-radius: 8px;
  }

  .example :global(a) {
    display: block;
    margin-bottom: 8px;
    color: var(--link-color);
  }

  .content {
    flex: 1;
    padding: 8px;
    text-align: center;
  }
</style>

<div class="example">
  <div class="navigation">
    <slot name="navigation" />
  </div>
  <div class="content">
    <slot name="content" />
  </div>
</div>
