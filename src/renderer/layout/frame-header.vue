<template>
<div class="header" :style="{height: height}">
  <div class="header-drag">
    <slot name="title"></slot>
    <slot name="actions"></slot>
  </div>
  <div class="main-menu-wrap">
    <slot name="main-menu"></slot>
  </div>
</div>
</template>

<script>
export default {
  props: {
    height: String,
  }
}
</script>

<style lang="scss" scoped>
.header {
  position: relative;
  height: 100%;

  .header-drag {
    @include flex-row(center, space-between);
    height: 30px;
    -webkit-app-region: drag;
  }

  .main-menu-wrap {
    @include flex-row(center);
    padding: 0 0 0 10px;
  }
}
</style>