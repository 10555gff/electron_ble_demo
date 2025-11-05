const { bluetooth } = require('webbluetooth').bluetooth;


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
 

async function connect() {

 
 console.log("开始连接");
 
    // 1. 请求 BLE 设备
    const device = await bluetooth.requestDevice({
        filters: [{
            name: 'QY-QYSC-S-D2D3'
        }],
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



}




window.services = {
  startScanning:async  () => {
    connect();
   
  },

};

 
  //数据处理函数
  function onCubeEvent(event) {
    console.log("aaaaaaaaaaaaaaaa");
 
  }
