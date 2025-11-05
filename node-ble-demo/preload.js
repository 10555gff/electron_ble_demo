const noble = require('@abandonware/noble');

noble.on('stateChange', async (state) => {
  if (state === 'poweredOn') {
    await noble.startScanningAsync([],false);//初始化，[] = 所有服务，true = 允许重复广播
  }
});

let targetDevice=null;

      

window.services = {
  startScanning: () => {
    
    noble.startScanningAsync(); 
  },

};






noble.on('discover', function(peripheral) {
    console.log('发现设备，名称：', peripheral.advertisement.localName);
    if (peripheral.advertisement.localName === 'Super Health-xxx') {
        targetDevice = peripheral;
        console.log('准备连接设备：', peripheral.advertisement.localName);
        noble.stopScanning();
        connectToDevice();
    }
});



// var _gatt;
// var _service;
// var _deviceName;
// var _chrct_cube;
// var UUID_SUFFIX = '-0000-1000-8000-00805f9b34fb';
// var SERVICE_UUID = '0000fff0' + UUID_SUFFIX;
// var CHRCT_UUID_CUBE = '0000fff6' + UUID_SUFFIX;
 
// var decoder = null;
// var is=true;
// //var deviceMac = 'CC:A3:00:00:D2:D3';
// var deviceMac = 'cc:a3:00:00:d2:d3';
// var KEYS = ['NoDg7ANAjGkEwBYCc0xQnADAVgkzGAzHNAGyRTanQi5QIFyHrjQMQgsC6QA'];

// noble.on('discover', function(devices) {
//   const deviceName = devices.advertisement.localName || '未知设备';
//   const deviceAddress=devices.address;
//   if(is && deviceMac==devices.address){
    
//     //noble.stopScanning();
//     // noble.stopScanning();

//     //noble.connect(devices.uuid, callback);












//     console.log('aaaaaaaaaaaaaaaaaaaaaa', deviceAddress);
//     is=false;
//   }
    
//     console.log('发现设备，名称：', deviceName);
    
//     // console.log('发现设备，名称：', peripheral.advertisement.localName);
//     // console.log('发现设备:', peripheral.address);
//     // console.log('发现设备，uuid：', peripheral.uuid);
//     // console.log('发现设备，peripheral：', peripheral);
//     //       const id = peripheral.id;
//     //   const name = peripheral.advertisement.localName || '未知设备';
//     //   const rssi = peripheral.rssi;

//     //         // 避免重复
//     //   if (!discovered.has(id)) {
//     //     discovered.set(id, true);
//     // }

//     // if (peripheral.advertisement.localName === 'Super Health-xxx') {
//     //     
//     //     console.log('准备连接设备：', peripheral.advertisement.localName);
//     //     
//     //     
//     // }
// });

