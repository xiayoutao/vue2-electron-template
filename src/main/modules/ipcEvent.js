import { app, BrowserWindow, ipcMain, dialog } from 'electron';
import { download } from 'electron-dl';
import createSkinsWindow from '../windows/skinsWindow';
import { PAGE_EVENTS, defaultDownloadFolder } from '../config';
import {
  isMainWin,
  openDevTools,
  showAppMenu,
  showSkinsWin,
} from './utils';
import {
  showNotify,
} from './tools';
import { isObject } from 'lodash';

let skinsWindow;

// 监听渲染进程的事件
export default function () {
  // 打印日志。渲染进程有些页面不方便查看日志，所以通过这种方法把需要打印的日志显示在编辑器的控制台上
  ipcMain.on(PAGE_EVENTS.log, (event, data) => {
    console.log(data);
  });

  // 通知（应该用不到）
  ipcMain.on(PAGE_EVENTS.notify, (event, data) => {
    showNotify(data);
  });

  ipcMain.on(PAGE_EVENTS.appExit, () => {
    // 所有窗口都将立即被关闭，而不询问用户，而且 before-quit 和 will-quit 事件也不会被触发。
    app.exit();
  });

  ipcMain.on(PAGE_EVENTS.openDevTools, (event, data) => {
    openDevTools(data ? global[data] : global.mainWindow, 0);
  });

  ipcMain.on(PAGE_EVENTS.windowMin, (event, data) => {
    if (isMainWin(data)) {
      global.mainWindow.minimize();
    } else {
      global[data].hide(); // 关闭指定的窗口
    }
  });

  ipcMain.on(PAGE_EVENTS.windowMax, () => {
    if (global.mainWindow.isMaximized()) {
      global.mainWindow.restore();
    } else {
      global.mainWindow.maximize();
    }
  });

  ipcMain.on(PAGE_EVENTS.windowClose, (event, data) => {
    if (isMainWin(data)) {
      let wins = BrowserWindow.getAllWindows();
      for (let i = 0; i < wins.length; i++) {
        wins[i].close();
      }
    } else {
      global[data].hide(); // 关闭指定的窗口
    }
  });

  ipcMain.on(PAGE_EVENTS.setTrayTitle, (event, data) => {
    if (global.tray) {
      global.tray.setToolTip(data);
    }
  });

  ipcMain.once(PAGE_EVENTS.hideTray, () => {
    global.trayWindow.hide();
  });

  ipcMain.on(PAGE_EVENTS.showMenu, () => {
    showAppMenu();
  });

  ipcMain.on(PAGE_EVENTS.hideMenu, () => {
    if (global.menusWindow) {
      global.menusWindow.hide();
    }
  });

  ipcMain.on(PAGE_EVENTS.openSetting, () => {
    if (global.settingWindow) {
      global.settingWindow.center();
      global.settingWindow.show();
    }
  });

  ipcMain.handle(PAGE_EVENTS.openDirDialog, async (event, data) => {
    let _data = {};
    if (typeof data === 'string') {
      _data.defaultPath = data;
    } else if (isObject(data)) {
      _data = data;
    }
    const options = Object.assign({
      defaultPath: defaultDownloadFolder,
      properties: ['openDirectory'], // openDirectory、multiSelection
    }, _data);
    const result = await dialog.showOpenDialog(options);
    return result;
  });

  ipcMain.on(PAGE_EVENTS.showSkins, () => {
    if (!skinsWindow) {
      skinsWindow = createSkinsWindow(BrowserWindow);
    }
    showSkinsWin(skinsWindow, global.mainWindow);
    global.skinsWindow = skinsWindow;
  });

  ipcMain.on(PAGE_EVENTS.download, async (event, data) => {
    let _data = {};
    if (typeof data === 'string') {
      _data.defaultPath = data;
    } else if (isObject(data)) {
      _data = data;
    }
    if (!_data.url) {
      event.sender.send('download-fail', '请设置下载文件地址');
      return;
    }
    try {
      event.sender.send('download-success', data.url);
      await download(global.mainWindow, data.url, {
        directory: data.downloadFolder || defaultDownloadFolder,
        openFolderWhenDone: true, // 下载完成自动打开文件夹
        onProgress: progress => {
          event.sender.send('download-progress', progress);
        },
        onStarted: () => {
          event.sender.send('download-started');
        },
        onCancel: () => {
          event.sender.send('download-cancel');
        }
      });
    } catch (error) {
      event.sender.send('download-fail', error);
    }
  });
}
