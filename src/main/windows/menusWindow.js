import { LOAD_URL, PORT, previewIcon } from '../config';

const winURL = process.env.NODE_ENV === 'development' ? `http://localhost:${PORT}/#menus` : `${LOAD_URL}#menus`;
let menusWindow;

/**
 * 菜单窗口
 * @param {*} BrowserWindow 
 */
export default function createMenusWindow (BrowserWindow) {
  if (menusWindow) return;

  const width = 120 + 20;
  const height = 160 + 20;

  menusWindow = new BrowserWindow({
    width,
    height,
    minWidth: width,
    minHeight: height,
    show: false,
    frame: false,
    fullscreenable: false,
    movable: false,
    minimizable: false,
    maximizable: false,
    resizable: false,
    icon: previewIcon,
    parent: global.mainWindow,
    transparent: process.platform !== 'linux',
    webPreferences: {
      nodeIntegration: true,
      nodeIntegrationInWorker: true,
      backgroundThrottling: false,
      enableRemoteModule: true,
      contextIsolation: false,
    }
  });

  menusWindow.loadURL(winURL);

  menusWindow.center();

  menusWindow.on('blur', () => {
    menusWindow.hide();
  });

  return menusWindow;
}
