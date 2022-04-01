let rfid;
let rgbled;
let button;
let myFirebase;

let clearButton = document.getElementById("clear");
let showButton = document.getElementById("show");
let backButton = document.getElementById("back");

let rfIDText = document.getElementById("input");

let ledOn = document.getElementById("on");
let ledOff = document.getElementById("off");




boardReady({device: '10dMjWX4'}, function (board) {
  board.samplingInterval = 250;
  rgbled = getRGBLedCathode(board, 15, 12, 13);
  button = getPullupButton(board, 4);
  rfid = getRFID(board);
  button.on('pressed', function () {
    rgbled.setColor('#ff0000');
  });
  button.on('released', function () {
    rgbled.setColor('#000000');
  });
  rfid.read();
  rfid.on("enter",function(_uid){
  // 卡扣：E540AD75 
    rfIDText.innerHTML = _uid;
    localStorage.setItem('ID', _uid);
    ledOn.classList.add("show");
    ledOff.classList.remove('show');
    speak('歡迎登入',["zh-TW",1,1,1], function () {
      rgbled.setColor('#ffff33');

    },0);
  });
  board.on('error', function (err) {
    board.error = err;
    window.alert('連線失敗');
  });
});

function setUserName() {
  alert("您好，請將票卡靠近機器");
  
}

if(!localStorage.getItem('ID')) {
  setUserName();
	// alert("無獲得");
} else {
  let storedName = localStorage.getItem('ID');
  rfIDText.innerHTML = storedName;
  alert("您的卡片已載入");
}

clearButton.onclick = function() {
  // saveID();
  rfIDText.innerHTML = "";
  localStorage.removeItem('ID');
	
}
function saveID(){
  if (rfid._uid == undefined) {

    console.log("error");
    
  }else{

    localStorage.setItem('ID', rfid._uid);
  }
  
}

showButton.onclick = function() {
  Show();
	
}

function Show(){

  let render = document.getElementById('render');

  // show 按鈕， render 清單區塊

  if (render.style.display === 'none') {
    render.style.display = 'block';
    showButton.innerText = "隱藏卡號";
   
  }
  else {
    render.style.display = 'none';
    showButton.innerText = "顯示卡號";


  }

}

backButton.onclick = function() {
  // setUserName();
	
}

