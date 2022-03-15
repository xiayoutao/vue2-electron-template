<template>
<frame-window window-name="skinsWindow">
  <div class="skins-wrap">
    <div class="skins-item"
      v-for="(item, index) in settings.skins"
      :key="index"
      :class="{ active: item.name === settings.useSkin }"
      :style="`background-${item.type}: ${item.bg}`"
      @click="updateSkin(item.name)"
    >
      <span class="skins-bg"></span>
    </div>
  </div>
</frame-window>
</template>

<script>
import { mapMutations, mapState } from 'vuex';
import FrameWindow from '@/layout/frame-window';

export default {
  components: {
    FrameWindow,
  },
  computed: {
    ...mapState(['settings'])
  },
  methods: {
    ...mapMutations(['setSkin']),
    updateSkin (skin) {
      this.setSkin(skin);
    }
  }
}
</script>

<style lang="scss" scoped>
.skins-wrap {
  @include flex-wrap();
  padding: 10px 5px;

  .skins-item {
    position: relative;
    width: 146px;
    height: 90px;
    margin: 0 5px 15px;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;

    &:before,
    &:after {
      content: none;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
    }

    &:before {
      border: 4px solid #fff;
    }

    &:after {
      border: 2px solid $color;
    }

    &.active,
    &:hover {
      &:before,
      &:after {
        content: '';
      }
    }

    .skins-bg {
      display: block;
    }
  }
}
</style>