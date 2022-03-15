<template>
<div class="frame-title">
  <span class="icon" v-if="icon"></span>
  <span class="label" :style="{ color: skinInfo.headerLabelColor }">{{ title }}</span>
</div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  props: {
    icon: String,
    title: String,
  },
  computed: {
    ...mapGetters(['skinInfo']),
  },
}
</script>

<style lang="scss" scoped>
.frame-title {
  @include flex-row(center);
  position: absolute;
  top: 0;
  left: 0;
  height: 30px;
  padding: 0 10px;

  .icon {
    width: 20px;
    height: 20px;
    margin-right: 5px;
    background: url('/img/logo.png') no-repeat center;
    background-size: 16px;
  }

  .label {
    font-size: 12px;
    color: #eee;
  }
}
</style>