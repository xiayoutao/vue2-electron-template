/* eslint-disable no-undef */
import { screen } from 'electron';
import { updateServer } from '../config';

// 是否主窗口
export function isMainWin (data) {
  return !data || data === 'mainWindow';
}

// 打开开发者工具
export function openDevTools (win, delay = 3000) {
  if (!process.env.IS_TEST) {
    setTimeout(() => {
      win.webContents.openDevTools();
    }, delay);
  }
}

export function createTray (Tray) {
  const trayIconPath = __static + '/favicon.ico';
  const appTray = new Tray(trayIconPath);
  appTray.setToolTip('DEMO');
  let { width: screenWidth } = screen.getPrimaryDisplay().size;

  appTray.on('right-click', () => {
    const [trayMenuWidth, trayMenuHeight] = global.trayWindow.getSize();
    let { x, y } = screen.getCursorScreenPoint();
    if (x + trayMenuWidth > screenWidth) {
      global.trayWindow.setPosition(x - trayMenuWidth, y - trayMenuHeight);
    } else {
      global.trayWindow.setPosition(x, y - trayMenuHeight);
    }
    global.trayWindow.show();
  });
  
  return appTray;
}

// 显示程序下拉菜单
export function showAppMenu () {
  const { x, y, width } = global.mainWindow.getBounds();
  let { width: screenWidth } = screen.getPrimaryDisplay().size;
  const [ menuWidth ] = global.menusWindow.getSize();
  const menuBtnX = x + width - 3 * 32;
  const shadowSize = 10; // 阴影大小
  if (menuBtnX + menuWidth > screenWidth) {
    global.menusWindow.setPosition(menuBtnX + 32 - menuWidth + shadowSize, y + 32 - shadowSize);
  } else {
    global.menusWindow.setPosition(menuBtnX - shadowSize, y + 32 - shadowSize);
  }
  if (!global.menusWindow.isVisible()) {
    global.menusWindow.show();
  } else {
    global.menusWindow.hide();
  }
}

export function showSkinsWin (skinsWindow, mainWindow) {
  let { width: screenWidth, height: screenHeight } = screen.getPrimaryDisplay().size;
  const { x, y, width, height } = mainWindow.getBounds();
  const [ skinsWidth, skinsHeight ] = skinsWindow.getSize();
  const skinsX = x + (width - skinsWidth) / 2;
  const skinsY = y + (height - skinsHeight) / 2;
  if (
    skinsX < 0 || 
    skinsX + skinsWidth > screenWidth ||
    skinsY < 0 ||
    skinsY + skinsHeight > screenHeight
  ) {
    skinsWindow.center();
  } else {
    skinsWindow.setPosition(parseInt(skinsX), parseInt(skinsY)); // 皮肤窗口至于主窗口中心位置
  }
  skinsWindow.show();
}

// 获取更新服务地址
export function getUpdateServer (app) {
  return `${updateServer}/api/update/${process.platform}/${app.getVersion()}`;
}