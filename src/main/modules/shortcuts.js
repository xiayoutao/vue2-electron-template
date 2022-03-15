import {
  openDevTools,
} from './utils';

// 快捷键
export default {
  // 打开控制台
  'CommandOrControl+F12': (mainWindow) => {
    openDevTools(mainWindow, 0);
  },
}