/* eslint global-require: off, no-console: off, promise/always-return: off */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `npm run build` or `npm run build:main`, this file is compiled to
 * `./src/main.js` using webpack. This gives us some performance wins.
 */
import path from 'path';
import { app, BrowserWindow, shell, ipcMain } from 'electron';
import { autoUpdater } from 'electron-updater';
import log from 'electron-log';
import MenuBuilder from './menu';
import { resolveHtmlPath } from './util';

class AppUpdater {
  constructor() {
    log.transports.file.level = 'info';
    autoUpdater.logger = log;
    autoUpdater.checkForUpdatesAndNotify();
  }
}

let mainWindow: BrowserWindow | null = null;

ipcMain.on('ipc-example', async (event, arg) => {
  const msgTemplate = (pingPong: string) => `IPC test: ${pingPong}`;
  console.log(msgTemplate(arg));
  event.reply('ipc-example', msgTemplate('pong'));
});

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

const isDebug =
  process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true';

if (isDebug) {
  require('electron-debug')();
}

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ['REACT_DEVELOPER_TOOLS'];

  return installer
    .default(
      extensions.map((name) => installer[name]),
      forceDownload
    )
    .catch(console.log);
};

const createWindow = async () => {
  if (isDebug) {
    await installExtensions();
  }

  console.log('isDebug', isDebug);
  console.log('app', app);
  console.log('app.isPackaged', app.isPackaged);
  const RESOURCES_PATH = app.isPackaged
    ? path.join(process.resourcesPath, 'assets')
    : path.join(__dirname, '../../assets');

  console.log('RESOURCES_PATH', RESOURCES_PATH);

  const getAssetPath = (...paths: string[]): string => {
    return path.join(RESOURCES_PATH, ...paths);
  };

  mainWindow = new BrowserWindow({
    show: false, // 是否显示窗口
    // x: 0, // 窗口的横坐标
    // y: 0, // 窗口的纵坐标
    width: 1024,
    height: 728,
    minWidth: 1024,
    minHeight: 728,
    resizable: true, // 窗口是否可以改变尺寸
    icon: getAssetPath('icon.png'),
    title: 'Electron React Starter',
    // frame: false, // 是否创建frameless窗口
    // transparent: true, // 是否是透明窗口（仅macOS）
    autoHideMenuBar: false, // 是否隐藏菜单栏
    webPreferences: {
      // webSecurity: false,
      devTools: true,
      preload: app.isPackaged
        ? path.join(__dirname, 'preload.js')
        : path.join(__dirname, '../../.erb/dll/preload.js'),
    },
  });

  mainWindow.loadURL(resolveHtmlPath('index.html'));

  const contents = mainWindow.webContents;
  console.log('contents', contents);

  mainWindow.on('ready-to-show', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    if (process.env.START_MINIMIZED) {
      mainWindow.minimize();
    } else {
      mainWindow.show();
    }

    /**
     * 通知
     */
    // const notification = new Notification({
    //   title: '通知',
    //   body: '欢迎使用electron',
    // });
    // notification.show();

    /**
     * 弹窗
     */
    // dialog.showMessageBox({
    //   type: 'info',
    //   title: '信息',
    //   message: '欢迎使用electron',
    //   buttons: ['确定'],
    //   checkboxLabel: '不再提醒',
    //   // checkboxChecked: false,
    // });
  });

  mainWindow.on('closed', () => {
    // 释放内存
    mainWindow = null;
  });

  const menuBuilder = new MenuBuilder(mainWindow);
  menuBuilder.buildMenu();

  // Open urls in the user's browser
  mainWindow.webContents.setWindowOpenHandler((edata) => {
    shell.openExternal(edata.url);
    return { action: 'deny' };
  });

  // Remove this if your app does not use auto updates
  // eslint-disable-next-line
  new AppUpdater();
};

/**
 * Add event listeners...
 */
app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app
  .whenReady()
  .then(() => {
    createWindow();
    app.on('activate', () => {
      // On macOS it's common to re-create a window in the app when the
      // dock icon is clicked and there are no other windows open.
      // 在 macOS 上，当单击应用程序的 Dock 图标并且没有其他窗口打开时，通常会重新创建一个窗口
      // 如果 mainWindow 为空，则会调用 createWindow() 函数创建一个新窗口。
      if (mainWindow === null) createWindow();
    });
  })
  .catch(console.log);

// 所有窗口关闭时退出应用
app.on('window-all-closed', () => {
  console.log('window-all-closed----->');
});

// 应用即将退出时触发
// 此时应用程序的窗口仍然可见, 可以阻止程序退出, 执行一些清理工作, 如保存数据, 清理缓存等
// 如果调用了 event.preventDefault() 则程序不会退出
app.on('before-quit', () => {
  console.log('before-quit----->');
});

// 应用即将退出时触发
// 此时应用程序的窗口已经全部关闭,不能再执行任何与窗口相关的操作
// 可以在此时进行一些资源释放操作, 如释放系统托盘图标, 清空通知区域等
app.on('will-quit', () => {
  console.log('will-quit----->');
});

// 应用退出时触发
app.on('quit', () => {
  console.log('quit----->');
});

// 应用激活时触发
app.on('activate', () => {
  console.log('activate----->');
});

// 窗口获得焦点时触发
app.on('browser-window-blur', () => {
  console.log('browser-window-blur----->');
});

// 窗口失去焦点时触发
app.on('browser-window-focus', () => {
  console.log('browser-window-focus----->');
});

// 窗口创建时触发 (在 ready 事件之后)
app.on('browser-window-created', () => {
  console.log('browser-window-created----->');
});
