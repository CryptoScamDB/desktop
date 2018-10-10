import { app, BrowserWindow } from 'electron';
import { join } from 'path';

const isDevelopment = process.env.ELECTRON_ENV !== 'production';
let window: BrowserWindow | null;

const createWindow = () => {
  window = new BrowserWindow({
    width: 800,
    height: 600,
    title: 'CryptoScamDB',
    icon: join(__dirname, 'assets/favicon/favicon.png')
  });

  if (isDevelopment) {
    // Delay loading for 2 seconds to make sure webpack-dev-server has started
    setTimeout(() => {
      window!.loadURL('http://localhost:3000');
    }, 2000);
  } else {
    window.loadFile(join(__dirname, 'index.html'));
  }

  window.on('closed', () => {
    window = null;
  });
};

app.on('ready', () => {
  createWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (window === null) {
    createWindow();
  }
});
