// Disable no-unused-vars, broken for spread args
/* eslint no-unused-vars: off */
import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';

export type Channels = 'ipc-example';

const electronHandler = {
  ipcRenderer: {
    sendMessage(channel: Channels, ...args: unknown[]) {
      ipcRenderer.send(channel, ...args);
    },
    on(channel: Channels, func: (...args: unknown[]) => void) {
      const subscription = (_event: IpcRendererEvent, ...args: unknown[]) =>
        func(...args);
      ipcRenderer.on(channel, subscription);

      return () => {
        ipcRenderer.removeListener(channel, subscription);
      };
    },
    once(channel: Channels, func: (...args: unknown[]) => void) {
      ipcRenderer.once(channel, (_event, ...args) => func(...args));
    },

    // 事件
    onReady(func: () => void) {
      ipcRenderer.on('ready', func);
    },
  },
};

/**
 * contextBridge API
 * @description 该 API 用于在渲染进程和主进程之间建立安全的通信桥梁
 * @param {string} exposeInMainWorld 该方法用于将 electronHandler 对象暴露到渲染进程的 window 对象中
 * @param {string} electron 该方法用于将 electronHandler 对象暴露到渲染进程的 window 对象中
 * @returns {ElectronHandler} 返回 electronHandler 对象
 * @example
 * 在渲染进程中，可以通过 window.electron.ipcRenderer 来访问 ipcRenderer 对象
 * 在渲染进程中，可以通过 window.electron.ipcRenderer.sendMessage 来发送消息
 * 在渲染进程中，可以通过 window.electron.ipcRenderer.on 来监听消息
 * 在渲染进程中，可以通过 window.electron.ipcRenderer.once 来监听一次消息
 */
contextBridge.exposeInMainWorld('electron', electronHandler);

export type ElectronHandler = typeof electronHandler;
