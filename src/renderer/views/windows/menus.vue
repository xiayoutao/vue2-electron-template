<template>
<div class="setting-wrap win-shadow">
  <div class="menu-item" v-for="(item, index) in menuList" :key="index" :class="item.type" @click="handleClickMenu(item.action)">
    <span class="menu-label">{{ item.label }}</span>
  </div>
</div>
</template>

<script>
import { ipcRenderer } from 'electron';

export default {
  data () {
    return {
      menuList: [
        {
          label: '设置',
          action: () => {
            ipcRenderer.send('open-setting');
          }
        },
        {
          label: '调试',
          action: () => {
            ipcRenderer.send('open-devtools');
          }
        },
      ]
    }
  },
  methods: {
    handleClickMenu (action) {
      if (typeof action === 'function') {
        action();
      }
      ipcRenderer.send('hide-menu');
    }
  }
}
</script>

<style lang="scss" scoped>
.setting-wrap {
  z-index: 9999999;
  border: 1px solid rgba(0, 0, 0, 0.1);

  .menu-item {
    display: flex;
    align-items: center;
    height: 32px;
    padding: 0 15px;
    cursor: pointer;

    .menu-icon {
      margin-right: 15px;
    }

    .menu-label {
      font-size: 12px;
      color: #000;
    }

    &.disabled {
      color: #999;
    }
    &:hover {
      background: #f3f5f9;
    }
  }
}
</style>