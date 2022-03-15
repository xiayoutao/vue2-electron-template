<template>
<div class="main-menu" :class="active ? 'active' : ''">
  <span class="icon" :class="icon"></span>
  <span class="label" :style="{color: skinInfo.headerLabelColor}">{{ label }}</span>
</div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  props: {
    icon: String,
    label: String,
    active: Boolean,
  },
  computed: {
    ...mapGetters(['skinInfo']),
  },
}
</script>

<style lang="scss" scoped>
.main-menu {
  width: 96px;
  height: 80px;
  margin-right: 1px;
  padding: 5px 0 0;
  cursor: default;

  &.active,
  &:hover {
    background-image: linear-gradient(-180deg,rgba(0,0,0,0) 0%,rgba(0,0,0,.2) 100%);
  }

  .icon {
    display: block;
    height: 45px;
    background-position: center;
    background-repeat: no-repeat;
    background-size: 36px;

    &.chat {
      background-image: url('/img/icon-chat.png');
    }
    &.pc {
      background-image: url('/img/icon-pc.png');
    }
  }

  .label {
    display: block;
    text-align: center;
    font-size: 14px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>