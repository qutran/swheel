<script>
  import LazySvg from '../components/LazySvg';
  import DayIcon from '../icons/day.svg';
  import NightIcon from '../icons/night.svg';
  import { theme, toggleTheme } from './themeStore';
</script>

<style>
  .themeSwitcher {
    position: relative;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 32px;
    width: 64px;
    box-sizing: border-box;
    background: var(--text-color);
    color: var(--primary-color);
    box-shadow: var(--depth1);
    padding: 8px;
    border-radius: 16px;
  }

  .themeSwitcher :nth-child(2),
  .themeSwitcher :nth-child(3) {
    position: relative;
  }

  .themeSwitcher:not(.dark) > :nth-child(2),
  .themeSwitcher.dark > :nth-child(3) {
    color: var(--text-color);
    position: relative;
    z-index: 1;
  }

  .trigger {
    z-index: 0;
    position: absolute;
    width: 28px;
    height: 28px;
    border-radius: 14px;
    background: var(--primary-color);
    left: 2px;
    transform: translate(0);
    transition: transform 150ms;
    will-change: transform;
  }

  .themeSwitcher.dark .trigger {
    transform: translate(calc(100% + 4px));
  }

  .iconPlaceholder {
    width: 16px;
    height: 16px;
  }
</style>

<div
  class="themeSwitcher"
  class:dark={$theme === 'dark'}
  on:click={toggleTheme}>
  <div class="trigger" />
  <LazySvg src={DayIcon}>
    <div slot="pending" class="iconPlaceholder" />
  </LazySvg>
  <LazySvg src={NightIcon}>
    <div slot="pending" class="iconPlaceholder" />
  </LazySvg>
</div>
