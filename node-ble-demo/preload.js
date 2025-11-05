const noble = require('@abandonware/noble');

// 用于存储发现的设备（避免重复）
const discovered = new Map();
let targetDevice=null;



window.services = {
  startScanning: () => {

    discovered.clear();
   // noble.startScanningAsync();
    noble.startScanningAsync([], false); // [] = 所有服务，true = 允许重复广播
  },

};


noble.on('discover', function(peripheral) {
    console.log('发现设备，名称：', peripheral.advertisement.localName);
    console.log('发现设备:', peripheral.address);
    console.log('发现设备，uuid：', peripheral.uuid);
    console.log('发现设备，peripheral：', peripheral);
          const id = peripheral.id;
      const name = peripheral.advertisement.localName || '未知设备';
      const rssi = peripheral.rssi;

            // 避免重复
      if (!discovered.has(id)) {
        discovered.set(id, true);
    }

    if (peripheral.advertisement.localName === 'Super Health-xxx') {
        targetDevice = peripheral;
        console.log('准备连接设备：', peripheral.advertisement.localName);
        noble.stopScanning();
        connectToDevice();
    }
});



