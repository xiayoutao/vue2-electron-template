import { LOAD_URL, PORT, previewIcon } from '../config';
// import {
//   openDevTools,
// } from '../modules/utils';

const winURL = process.env.NODE_ENV === 'development' ? `http://localhost:${PORT}/#/skins` : `${LOAD_URL}/#/skins`;
let skinsWindow;

/**
 * 皮肤中心窗口
 * @param {*} BrowserWindow 
 */
export default function createSkinsWindow (BrowserWindow) {
  if (skinsWindow) return;

  const width = 330 + 20;
  const height = 245 + 20;

  skinsWindow = new BrowserWindow({
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

  skinsWindow.loadURL(winURL);

  skinsWindow.on('closed', () => {
    skinsWindow = null;
  });

  // openDevTools(skinsWindow);

  return skinsWindow;
}
