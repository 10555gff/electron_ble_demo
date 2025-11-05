const noble = require('@abandonware/noble');

window.services = {
  startScanning: () => {
    return  noble.startScanning();
  },

};


// 扫描蓝牙设备
function startBLEScan() {
    console.log("affffffffffffffa");



    noble.startScanningAsync();
    noble.on('stateChange', (state) => {
         console.log("ddddddddddddddddddddddddddddddddddddddddd");
        if (state === 'poweredOn') {
            noble.startScanning([], false);
        } else {
            noble.stopScanning();
        }
    });
//     noble.on('discover', function(peripheral) {
//     console.log('发现设备，名称：', peripheral.advertisement.localName);
//     console.log('发现设备，uuid：', peripheral.uuid);
//     console.log('发现设备，peripheral：', peripheral);
//     if (peripheral.advertisement.localName === 'Super Health-xxx') {
//         targetDevice = peripheral;
//         console.log('准备连接设备：', peripheral.advertisement.localName);
//         noble.stopScanning();
//         connectToDevice();
//     }
// });

    noble.on('discover', (device) => {
        console.log('发现设备:', device.address, device.advertisement.localName);
        // 可以发送到渲染页面
        // utools.sendSubInput({
        //     type: 'device',
        //     data: {
        //         name: device.advertisement.localName,
        //         address: device.address
        //     }
        // });
    });
}

// function connectToDevice() {
//     targetDevice.connect(function (error) {
//         if (error) {
//             console.error('连接失败：', error);
//         } else {
//             console.log('设备连接成功，准备发现服务...');
//             //discoverServices();
//             targetDevice.write('服务 UUID', '特征 UUID', Buffer.from('指令'), true, function(error) {
//                 if (error) {
//                     console.error('写入指令失败:', error);
//                 } else {
//                     console.log('写入指令成功');
//                 }
//             });
//         }
//     });
// }

window.addEventListener("dblclick", async () =>{    //   双击事件
    console.log("aa");
    startBLEScan();

});