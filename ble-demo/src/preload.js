// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  onBLEDeviceList: (callback) => ipcRenderer.on("ble-device-list", callback),
  selectBLEDevice: (deviceId) => ipcRenderer.send("ble-device-selected", deviceId),
  cancelBLEDevice: () => ipcRenderer.send("ble-device-cancel"),
});