/* eslint-disable no-undef */
export const isProd = process.env.NODE_ENV === 'development';
export const ACHEME = 'app';
export const LOAD_URL = `${ACHEME}://./index.html`;
export const PORT = 5000;
export const defaultDownloadFolder = 'C:\\VueDemoDownload'; // 默认下载目录
export const previewIcon = isProd ? 'public/img/tray.ico' : `${__static}/img/tray.ico`;
export const updateServer = isProd ? 'https://' : 'http://127.0.0.1'; // 更新服务地址

// 事件名称
export const PAGE_EVENTS = {
  log: 'log',
  getConfig: 'get-config',
  notify: 'notify', // 通知
  openDevTools: 'open-devtools', // 打开开发者工具
  openSetting: 'open-setting', // 打开设置
  windowMin: 'window-min', // 最小窗口
  windowMax: 'window-max', // 最大窗口
  windowClose: 'window-close', // 关闭窗口
  appExit: 'app-exit', // 关闭所有窗口
  openDirDialog: 'open-directory-dialog', // 打开目录对话框
  setTrayTitle: 'set-tray-title', // 设置托盘图标名称
  hideTray: 'hide-tray', // 隐藏托盘图标
  showSkins: 'show-skins', // 皮肤中心
  showMenu: 'show-menu', // 菜单列表
  hideMenu: 'hide-menu', // 菜单列表
  download: 'download', // 下载文件
};