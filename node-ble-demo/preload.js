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



var _gatt;
var _service;
var _deviceName;
var _chrct_cube;
var UUID_SUFFIX = '-0000-1000-8000-00805f9b34fb';
var SERVICE_UUID = '0000fff0' + UUID_SUFFIX;
var CHRCT_UUID_CUBE = '0000fff6' + UUID_SUFFIX;



noble.on('discover', async (peripheral)=> {
    console.log('发现设备，名称：', peripheral.advertisement.localName);
    if (peripheral.advertisement.localName === 'QY-QYSC-S-D2D3') {
      

        //targetDevice = peripheral;
        console.log('准备连接设备：', peripheral.advertisement.localName);
        await noble.stopScanningAsync();
        


      await peripheral.connectAsync();
      console.log('连接成功！');

      // 发现指定服务和特征
      const { services, characteristics } = await peripheral.discoverSomeServicesAndCharacteristicsAsync(
        [SERVICE_UUID],
        [CHRCT_UUID_CUBE]
      );

      if (characteristics.length === 0) {
        console.log('未找到目标特征');
        await peripheral.disconnectAsync();
        process.exit(1);
      }

      const cubeChar = characteristics[0];
      console.log('找到特征:', CHRCT_UUID_CUBE);



















        //noble.stopScanningAsync();

         //peripheral.connectAsync();

        // const { services } = await peripheral.discoverAllServicesAndCharacteristicsAsync();
        // services.forEach(s => {
        //   console.log('Service:', s.uuid);
        //   s.characteristics.forEach(c => {
        //     console.log('  Char:', c.uuid, 'Props:', c.properties.join(','));
        //   });
        // });






//        


//         const { characteristics } =  peripheral.discoverSomeServicesAndCharacteristicsAsync(
//           SERVICE_UUID,   // Battery Service
//           CHRCT_UUID_CUBE   // Battery Level Characteristic
//         );

//  peripheral.disconnectAsync();

//         console.log(characteristics);
        // noble.connect(SERVICE_UUID,useCallback);
        // peripheral.discoverServices(SERVICE_UUID, callback);
        

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

