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
const TARGET_NAME = 'QY-QYSC-S-D2D3';




noble.on('discover', async (peripheral)=> {
    console.log('发现设备，名称：', peripheral.advertisement.localName);
    if (TARGET_NAME === peripheral.advertisement.localName) {
      //targetDevice = peripheral;
      await noble.stopScanningAsync();
      console.log('找到目标设备，停止扫描，准备连接...');


      try {
          console.log("开始连接");
          await peripheral.connectAsync();
          // 发现指定服务和特征
          const { services, characteristics } = await peripheral.discoverSomeServicesAndCharacteristicsAsync(
            [SERVICE_UUID],
            [CHRCT_UUID_CUBE]
          );
          

          console.log('找到服务:', services[0]);

          console.log('找到特征:', characteristics[0]);



        

   
      
          // // 3. 获取 Service
          // const service = await server.getPrimaryService(SERVICE_UUID);
          // console.log('service:\n',service);
      
          // // 4. 获取 Characteristic
          // const characteristic  = await service.getCharacteristic(CHRCT_UUID_CUBE);
          // console.log('Characteristic:\n', characteristic);
      
          // 5. 订阅数据通知
          _chrct_cube=await characteristics.startNotifications();
          _chrct_cube.addEventListener('characteristicvaluechanged', onCubeEvent);
          console.log('已订阅数据通知 ✅');

        } catch (err) {
          console.error("❌ 请求失败:", err);
        }


































      console.log('连接成功！');























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

