<template>
<div class="bar-menu">
  <div class="actions-btn btn-skins" :style="{ color: skinInfo.actionColor }" title="换皮肤" @click="handleSetFrame('skins')" v-if="checkVisible('skins')">
    <span class="iconfont icon-skins"></span>
  </div>
  <div class="actions-btn btn-menu" :style="{ color: skinInfo.actionColor }" title="设置" @click="handleSetFrame('menu')" v-if="checkVisible('menu')">
    <span class="iconfont icon-menu"></span>
  </div>
  <div class="actions-btn btn-min" :style="{ color: skinInfo.actionColor }" title="最小化" @click="handleSetFrame('min')" v-if="checkVisible('min')">
    <span class="iconfont icon-min"></span>
  </div>
  <div class="actions-btn btn-size" :style="{ color: skinInfo.actionColor }" :title="`${isMax ? '还原' : '最大化'}`" @click="handleSetFrame('max')" v-if="checkVisible('max')">
    <span class="iconfont" :class="isMax ? 'icon-recovery' : 'icon-max'"></span>
  </div>
  <div class="actions-btn btn-close" :style="{ color: skinInfo.actionColor }" title="关闭" @click="handleSetFrame('close')" v-if="checkVisible('close')">
    <span class="iconfont icon-close"></span>
  </div>
</div>
</template>

<script>
import { mapGetters } from 'vuex';
import { ipcRenderer, remote } from 'electron';
const currentWindow = remote.getCurrentWindow();

export default {
  props: {
    windowName: String,
    actions: [String, Array],
    exclude: [String, Array],
  },
  data () {
    return {
      isMax: currentWindow.isMaximized(),
    }
  },
  computed: {
    ...mapGetters(['skinInfo']),
  },
  methods: {
    handleSetFrame (action) {
      switch (action) {
        case 'skins':
          ipcRenderer.send('show-skins', this.windowName);
          break;
        case 'menu':
          ipcRenderer.send('show-menu', this.windowName);
          break;
        case 'min':
          ipcRenderer.send('window-min', this.windowName);
          break;
        case 'max':
          ipcRenderer.send('window-max', this.windowName);
          break;
        case 'close':
          ipcRenderer.send('window-close', this.windowName);
          break;
      }
    },
    checkVisible (data) {
      if (this.exclude === '*' || this.exclude.indexOf(data) >= 0) return false;
      if (this.actions === '*' || this.actions.indexOf(data) >= 0) return true;
    }
  }
}
</script>

<style lang="scss" scoped>
.bar-menu {
  @include flex-row();
  position: absolute;
  top: 0;
  right: 0;
  -webkit-app-region: no-drag;

  .actions-btn {
    @include flex-row(center, center);
    width: 32px;
    height: 30px;
    cursor: pointer;

    .iconfont {
      font-size: 16px;
    }

    &:hover {
      background-color: rgba(0, 0, 0, .1);
    }

    &.btn-close {
      &:hover {
        background-color: $danger;

        .iconfont {
          color: #fff;
        }
      }
    }
  }
}
</style>