<template>
<div class="tray-wrap win-shadow">
  <div class="menu-item" v-for="(item, index) in menuList" :key="index" :class="item.type" @click="item.onClick">
    <span class="menu-label">{{ item.label }}</span>
  </div>
</div>
</template>

<script>
import { ipcRenderer, remote, shell } from 'electron';

export default {
  data () {
    return {
      menuList: [
        {
          label: '设置',
          onClick: () => {
            ipcRenderer.send('open-setting');
          }
        },
        {
          label: '意见反馈',
          onClick: () => {
            remote.dialog.showMessageBox({
              type: 'none',
              title: '温馨提示',
              message: 'hello',
              buttons: ['ok', 'cancel']
            }, (index) => {
              console.log(index);
            });
          }
        },
        {
          label: '帮助',
          onClick: () => {
            const path = remote.app.getAppPath();
            shell.openPath(path);
          }
        },
        {
          label: '关于',
          onClick: () => {
            shell.openExternal('https://www.baidu.com');
          }
        },
        {
          label: '退出',
          type: 'border',
          onClick: () => {
            ipcRenderer.send('window-close');
          }
        },
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.tray-wrap {
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
    &.border {
      border-top: 1px solid #ddd;
    }
  }
}
</style>