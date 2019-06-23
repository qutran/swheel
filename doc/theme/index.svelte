<script>
  import { theme } from './themeStore';

  $: {
    const toRemove = $theme === 'dark' ? 'light' : 'dark';
    document.body.classList.remove(toRemove);
    document.body.classList.add($theme);
  }
</script>

<style>
  :global(:root) {
    --link-color: #03a9f4;
    --gap: 24px;
    --depth1: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
    --depth2: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
    --depth3: 0 10px 20px rgba(51, 48, 48, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
    --depth4: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
    --depth5: 0 19px 38px rgba(0, 0, 0, 0.3), 0 15px 12px rgba(0, 0, 0, 0.22);
  }

  @media (max-width: 480px) {
    :global(:root) {
      --gap: 12px;
    }
  }

  :global(body.light) {
    --text-color: #333;
    --primary-color: #fff;
    --secondary-color: #fff;
    --editor-primary-color: #e0e0e0;
    --editor-secondary-color: #bdbdbd;
    --editor-line-numbers-color: #fff;
  }

  :global(body.dark) {
    --text-color: #fff;
    --primary-color: #333333;
    --secondary-color: #1d1d1d;
    --editor-primary-color: #263238;
    --editor-secondary-color: #222b2f;
    --editor-line-numbers-color: #537f7e;
  }

  :global(.code, code) {
    font-family: 'Fira Code', monospace;
    font-variant-ligatures: contextual;
  }
</style>

<slot />
