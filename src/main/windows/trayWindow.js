import { LOAD_URL, PORT } from './../config';

const trayWinURL = process.env.NODE_ENV === 'development' ? `http://localhost:${PORT}/#/tray` : `${LOAD_URL}#/tray`;
let trayWindow = null;

/**
 * 托盘菜单窗口
 * @param {*} BrowserWindow 
 * @param {*} bounds 
 */
export default function createTrayWindow (BrowserWindow, bounds) {
  if (trayWindow) return;

  trayWindow = new BrowserWindow({
    width: 120,
    height: 180,
    x: bounds.x,
    y: bounds.y,
    show: false,
    frame: false,
    fullscreenable: false,
    minimizable: false,
    maximizable: false,
    resizable: false,
    movable: false,
    alwaysOnTop: true,
    skipTaskbar: true,
    transparent: process.platform !== 'linux',
    webPreferences: {
      nodeIntegration: true,
      nodeIntegrationInWorker: true,
      backgroundThrottling: false,
      enableRemoteModule: true,
      contextIsolation: false,
    }
  });

  trayWindow.loadURL(trayWinURL);

  trayWindow.on('double-click', () => {
    global.mainWindow.show();
  });

  trayWindow.on('blur', () => {
    trayWindow.hide();
  });

  trayWindow.on('closed', () => {
    trayWindow = null;
  });
  
  return trayWindow;
}