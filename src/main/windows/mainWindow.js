import { previewIcon } from '../config';

export default function createWindow (BrowserWindow) {
  return new BrowserWindow({
    width: 800,
    height: 500,
    minWidth: 800,
    minHeight: 500,
    frame: false,
    fullscreenable: false,
    minimizable: true,
    maximizable: true,
    resizable: true,
    useContentSize: true,
    icon: previewIcon,
    webPreferences: {
      nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION,
      nodeIntegrationInWorker: true,
      webSecurity: false,
      navigateOnDragDrop: true,
      enableRemoteModule: true,
      contextIsolation: false,
      devTools: true,
    }
  });
}