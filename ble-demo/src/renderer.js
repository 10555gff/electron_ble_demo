const listEl = document.getElementById("device-list");
const scenBtn = document.getElementById("scenBtn");
const selectBtn = document.getElementById("select");
const cancelBtn = document.getElementById("cancel");

let selectedDeviceId = null;

listEl.addEventListener("change", () => {
  selectedDeviceId = listEl.value;
  console.log("当前选中:", selectedDeviceId);
});

selectBtn.addEventListener("click", () => {
  if (!selectedDeviceId) {
    alert("请先选择一个设备");
    return;
  }
  console.log("用户选中:", selectedDeviceId);
  window.electronAPI?.selectBLEDevice(selectedDeviceId);
});








console.log("蓝牙ble测试");
 
 
var _gatt;
var _service;
var _deviceName;
var _chrct_cube;
var UUID_SUFFIX = '-0000-1000-8000-00805f9b34fb';
var SERVICE_UUID = '0000fff0' + UUID_SUFFIX;
var CHRCT_UUID_CUBE = '0000fff6' + UUID_SUFFIX;
 
var decoder = null;
var deviceMac = 'CC:A3:00:00:D2:D3';
var KEYS = ['NoDg7ANAjGkEwBYCc0xQnADAVgkzGAzHNAGyRTanQi5QIFyHrjQMQgsC6QA'];










scenBtn.addEventListener("click", async () => {
  try {
    console.log("开始连接");
 
    // 1. 请求 BLE 设备
    const device = await navigator.bluetooth.requestDevice({
    acceptAllDevices: true,
    optionalServices: [SERVICE_UUID] // 这里加上你要访问的所有 service UUID
    });
    console.log('设备:', device.name);
 
    // 2. 连接 GATT 服务
    const server = await device.gatt.connect();
    console.log('已连接 GATT Server');
 
    // 3. 获取 Service
    const service = await server.getPrimaryService(SERVICE_UUID);
    console.log('service:\n',service);
 
    // 4. 获取 Characteristic
    const characteristic  = await service.getCharacteristic(CHRCT_UUID_CUBE);
    console.log('Characteristic:\n', characteristic);
 
    // 5. 订阅数据通知
    _chrct_cube=await characteristic.startNotifications();
    _chrct_cube.addEventListener('characteristicvaluechanged', onCubeEvent);
    console.log('已订阅数据通知 ✅');










  } catch (err) {
    console.error("❌ 请求失败:", err);
  }
});


cancelBtn.addEventListener("click",  ()=>{
  window.electronAPI?.cancelBLEDevice();
  listEl.innerHTML = "";
});


// 监听主进程发送的设备列表
window.electronAPI?.onBLEDeviceList((_evt, deviceList) => {
  // 清空旧选项（可选）
  listEl.innerHTML = "";

  deviceList.forEach(device => {
    const option = document.createElement("option");
    option.value = device.deviceId;     // 选项值
    option.textContent  = `${device.deviceName || "未知设备"} (${device.deviceId})`; // 显示的文字
    listEl.appendChild(option);

  });

});





 

 
 
  //数据处理函数
  function onCubeEvent(event) {
    console.log("aaaaaaaaaaaaaaaa");
 
  }
