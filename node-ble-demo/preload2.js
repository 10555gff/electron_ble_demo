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
    const deviceName= `${peripheral.advertisement.localName || "未知设备"} (${peripheral.address})`;
    console.log('发现设备，名称：', deviceName);
    if (TARGET_NAME === peripheral.advertisement.localName) {
      await noble.stopScanningAsync();
      console.log('找到目标设备，停止扫描，准备连接...');


      try {
          console.log("开始连接");
          await peripheral.connectAsync();
  

          // // 发现指定服务和特征
          // const { services, characteristics } = await peripheral.discoverSomeServicesAndCharacteristicsAsync(
          //   [SERVICE_UUID],
          //   [CHRCT_UUID_CUBE]
          // );

          const services=await peripheral.discoverServicesAsync([SERVICE_UUID]);
          const characteristics=await services[0].discoverCharacteristicsAsync([CHRCT_UUID_CUBE]);


          console.log('找到服务:', services[0]);
          const cubeChar = characteristics[0];
          console.log('找到特征:', cubeChar);

          // ========== 订阅通知（noble 方式）==========
          if (cubeChar.properties.includes('notify') || cubeChar.properties.includes('indicate')) {
            cubeChar.on('data', (data, isNotification) => {
              console.log('收到数据:', data.toString('hex'));
              onCubeEvent(data); // 你的处理函数
            });

            await cubeChar.subscribeAsync();
            console.log('已订阅通知');
          } else {
            console.log('特征不支持通知');
          }


        console.log('连接成功！');


        


        } catch (err) {
          console.error("❌ 请求失败:", err);
        }

    }
});

