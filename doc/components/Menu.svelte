<style>
  .menu {
    overflow: auto;
    min-width: 0;
    max-width: 0;
    height: 100%;
    will-change: width;
    background: var(--secondary-color);
  }

  :global(.isMenuOpen) .menu {
    min-width: 250px;
    max-width: 250px;
  }

  @media screen and (max-width: 768px) {
    :global(.isMenuOpen) .menu {
      position: absolute;
      min-width: 100%;
      max-width: 100%;
      z-index: 2;
    }
  }
</style>

<div class="menu" />
