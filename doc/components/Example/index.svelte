<script>
  import AddressBar from './AddressBar';
</script>

<style>
  .example {
    font-size: 18px;
    display: flex;
    justify-content: center;
  }

  .exampleContainer {
    box-shadow: var(--depth1);
    margin: var(--gap);
    padding: 8px 8px;
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

<div class="exampleContainer">
  <AddressBar />
  <div class="example">
    <div class="navigation">
      <slot name="navigation" />
    </div>
    <div class="content">
      <slot name="content" />
    </div>
  </div>
</div>
