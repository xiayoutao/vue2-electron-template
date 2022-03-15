import { LOAD_URL, PORT, previewIcon } from '../config';

const winURL = process.env.NODE_ENV === 'development' ? `http://localhost:${PORT}/#setting` : `${LOAD_URL}#setting`;
let settingWindow;

/**
 * 设置窗口
 * @param {*} BrowserWindow 
 */
export default function createSettingWindow (BrowserWindow) {
  if (settingWindow) return;

  const width = 280 + 20;
  const height = 340 + 20;

  settingWindow = new BrowserWindow({
    width,
    height,
    minWidth: width,
    minHeight: height,
    show: false,
    frame: false,
    fullscreenable: false,
    minimizable: false,
    maximizable: false,
    resizable: false,
    skip: false,
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

  settingWindow.loadURL(winURL);

  settingWindow.center();

  settingWindow.on('show', () => {
    settingWindow.send('window-show', 'settingWindow');
  });

  settingWindow.on('closed', () => {
    settingWindow = null;
  });

  return settingWindow;
}
