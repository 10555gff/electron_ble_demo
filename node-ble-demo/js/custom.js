$(function(){
   const $listEl   = $('#device-list');
   const $scenBtn  = $('#scenBtn');
   const $selectBtn = $('#select');
   const $cancelBtn = $('#cancel');



   $scenBtn.click(function(){
       console.log(" 开始写 jQuery 代码");
       window.services.startScanning();
  });
 
   //...
  
 
});