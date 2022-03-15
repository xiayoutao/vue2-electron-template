<template>
<frame-window window-name="settingWindow">
  开机自启动：
</frame-window>
</template>

<script>
import { ipcRenderer, remote } from 'electron';
import FrameWindow from '@/layout/frame-window';

export default {
  components: {
    FrameWindow,
  },
  data () {
    return {
      autoRun: false,
    }
  },
  computed: {
    appName () {
      return remote.app.getName();
    },
    appPath () {
      return remote.app.getPath('exe');
    },
  },
  methods: {},
}
</script>

<style>
</style>