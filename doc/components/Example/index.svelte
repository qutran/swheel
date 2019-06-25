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
    width: 50%;
    max-width: 50%;
    padding: 8px;
    border-right: 1px solid var(--text-color);
  }

  .example :global(a) {
    display: block;
    margin-bottom: 8px;
    color: var(--link-color);
    font-size: 16px;
  }

  .content {
    width: 50%;
    max-width: 50%;
    flex: 1;
    padding: 8px;
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
