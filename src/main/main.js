import { app, protocol, BrowserWindow, Tray, session, globalShortcut } from 'electron';
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib';
import path from 'path';
import initIpcEvent from './modules/ipcEvent';
import createMainWindow from './windows/mainWindow';
import createTrayWindow from './windows/trayWindow';
import createMenusWindow from './windows/menusWindow';
import createSettingWindow from './windows/settingWindow';
import {
  createTray,
} from './modules/utils';
import SHORTCUTs from './modules/shortcuts';
import { ACHEME, LOAD_URL } from './config';
import pkg from '../../package.json';

const resolve = dir => path.join(__dirname, dir);
const isDevelopment = process.env.NODE_ENV !== 'production';
const isWin32 = process.platform === 'win32';

let mainWindow;

protocol.registerSchemesAsPrivileged([
  { scheme: ACHEME, privileges: { secure: true, standard: true } }
]);

async function createWindow() {
  mainWindow = createMainWindow(BrowserWindow);

  if (isWin32) {
    app.setAppUserModelId(pkg.productName); // 设置appId才能使用Notification
  }

  mainWindow.setMenu(null); // 去除原生顶部菜单栏

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    await mainWindow.loadURL(process.env.WEBPACK_DEV_SERVER_URL);
  } else {
    createProtocol(ACHEME);
    mainWindow.loadURL(LOAD_URL);
  }

  mainWindow.on('close', event => {
    event.preventDefault();
    mainWindow = null;
    app.exit();
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
    // 设置任务栏操作和缩略图
    if (isWin32) {
      const { width, height } = mainWindow.getContentBounds(); // 获取当前应用宽高
      mainWindow.setThumbnailClip({ x: 0, y: 0, width, height }); // 设置预览图
      global.mainWindow = mainWindow;
    }
    global.settingWindow = createSettingWindow(BrowserWindow);
    global.menusWindow = createMenusWindow(BrowserWindow);
  });
  
  // 如果是windows系统模拟托盘菜单
  if (isWin32) {
    global.tray = createTray(Tray);
    let trayBounds = global.tray.getBounds();
    global.trayWindow = createTrayWindow(BrowserWindow, trayBounds);
  }

  initIpcEvent(); // 初始化进程之间事件监听
}

const getTheLock = app.requestSingleInstanceLock();

if (!getTheLock) {
  app.quit();
} else {
  app.on('second-instance', (event, commandLine, workingDirectory) => {
    console.log(event, commandLine, workingDirectory);
    // 当运行第二个实例时,将会聚焦到mainWindow这个窗口
    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore();
      mainWindow.focus();
      mainWindow.show();
    }
  });

  // 当应用程序完成基础的启动的时候被触发
  // 在 Windows 和 Linux 中, will-finish-launching 事件与 ready 事件是相同的
  // 在 macOS 中，这个事件相当于 NSApplication 中的 applicationWillFinishLaunching 提示
  // 通常会在这里为 open-file 和 open-url 设置监听器，并启动崩溃报告和自动更新。
  // 绝大部分情况下，你必须在ready事件句柄中处理所有事务。
  app.on('will-finish-launching', () => {
    console.log('will-finish-launching');
  });
  
  app.on('ready', async () => {
    if (isDevelopment && !process.env.IS_TEST) {
      try {
        // Install Vue Devtools
        // await installExtension(VUEJS_DEVTOOLS);
        await session.defaultSession.loadExtension(resolve('./../src/main/vue-devtools'));
      } catch (e) {
        console.error('Vue Devtools failed to install:', e.toString());
      }
    }
    createWindow();
  });
}

app.whenReady().then(() => {
  Object.keys(SHORTCUTs).forEach(item => {
    globalShortcut.register(item, () => {
      SHORTCUTs[item] && SHORTCUTs[item](mainWindow, 0);
    });
  });
});

// 当应用被激活时发出 macOS
app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

// 当所有的窗口都被关闭时触发。
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// 在程序关闭窗口前发信号。
app.on('before-quit', () => {
  
});

app.on('will-quit', () => {
  globalShortcut.unregisterAll(); // 注销所有快捷键
});

if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', (data) => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}