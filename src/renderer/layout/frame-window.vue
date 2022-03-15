<template>
<div class="frame-window win-shadow" :style="getSkinBg(skinInfo)">
  <frame-header :height="`${winOpts.headerHeight}px`">
    <template #title>
      <frame-title :title="winOpts.title" :color="skinInfo.headerLabelColor"></frame-title>
    </template>
    <template #actions>
      <frame-actions :window-name="windowName" :actions="winOpts.actions" :exclude="winOpts.exclude"></frame-actions>
    </template>
  </frame-header>
  <div
    class="window-wrapper"
    :style="{ height: `${winOpts.height - winOpts.headerHeight}px`, background: skinInfo.mainBg || winOpts.background }"
  >
    <slot></slot>
  </div>
</div>
</template>

<script>
import { mapGetters } from 'vuex';
import { getSkinBg } from '@/common/tools';
import FrameHeader from './frame-header';
import FrameActions from './frame-actions';
import FrameTitle from './frame-title';

export default {
  props: {
    windowName: String,
  },
  components: {
    FrameHeader,
    FrameActions,
    FrameTitle,
  },
  data () {
    return {
      getSkinBg,
    }
  },
  computed: {
    ...mapGetters(['getWinOpts', 'skinInfo']),
    winOpts () {
      return this.getWinOpts(this.windowName);
    }
  }
}
</script>

<style lang="scss" scoped>
.window-wrapper {
  height: 100%;
  background-color: rgba(255, 255, 255, .8);
  overflow-x: hidden;
  overflow-y: auto;
}
</style>