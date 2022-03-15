<template>
<div class="frame-layout" :style="getSkinBg(skinInfo)">
  <div class="frame-header">
    <frame-header :height="`${winOpts.headerHeight}px`">
      <template #title>
        <frame-title :title="winOpts.title" :color="skinInfo.headerLabelColor"></frame-title>
      </template>
      <template #actions>
        <frame-actions window-name="mainWindow" :actions="winOpts.actions" :exclude="winOpts.exclude"></frame-actions>
      </template>
      <template #main-menu>
        <main-menu
          v-for="(item, index) in menuList"
          :key="index"
          :icon="item.icon"
          :label="item.label"
          :active="currentMenu === item.name"
          @click.native="handleClickMenu(item)"
        >
        </main-menu>
      </template>
    </frame-header>
  </div>
  <div class="wrapper" :style="{background: skinInfo.mainBg}">
    <router-view></router-view>
  </div>
</div>
</template>

<script>
import { mapGetters } from 'vuex';
import FrameHeader from './frame-header';
import FrameActions from './frame-actions';
import FrameTitle from './frame-title';
import MainMenu from './main-menu';
import { getSkinBg } from '@/common/tools';

export default {
  components: {
    FrameHeader,
    FrameActions,
    FrameTitle,
    MainMenu,
  },
  data () {
    return {
      getSkinBg,
      menuList: [
        { name: 'home', label: '首页', icon: 'pc' },
        { name: 'demo', label: '示例', icon: 'chat' },
      ],
      currentMenu: 'home',
    }
  },
  computed: {
    ...mapGetters(['getWinOpts', 'skinInfo']),
    winOpts () {
      return this.getWinOpts('mainWindow');
    }
  },
  methods: {
    handleClickMenu (data) {
      if (this.$route.name === data.name) return;
      this.currentMenu = data.name;
      this.$router.push({
        name: data.name,
      });
    }
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  height: 100%;
  background-color: rgba(255, 255, 255, .8);
  overflow-x: hidden;
  overflow-y: auto;
}
</style>

