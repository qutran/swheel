<style>
  .menu {
    overflow: auto;
    min-width: 0;
    transition: min-width 150ms;
    will-change: min-width;
  }

  :global(.isMenuOpen) .menu {
    min-width: 300px;
  }

  @media screen and (max-width: 768px) {
    :global(.isMenuOpen) .menu {
      min-width: 100%;
    }
  }
</style>

<div class="menu" />
