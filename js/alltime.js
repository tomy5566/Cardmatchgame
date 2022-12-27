//日期設定
//const dateObject = new Date(); //Fri Jul 15 2016 16:23:49 GMT+0800 (CST)
//const date = dateObject.getDate(); //15 某一天
//const month = dateObject.getMonth()+1 ;  //6 要記得+1才是正確的，不然原始是0~11月
//const year = dateObject.getFullYear();  //2016
//const week = dateObject.getDay();  //星期幾 星期日為0 星期一為1

//格林威治時間處理
//舉例      台灣現在時間(GMT+8) = A.格林威治時間 + B.時區 8 小時
//校正方法  各地區時間 =  A.(台灣1970至今毫秒 + 本地與格林的差:這邊是8小時)+B.(校正時區小時)
//單位(毫秒)        =>    {getTime()+getTimezoneOffset()分鐘*60秒*1000毫秒 }+ { X小時*60分鐘*60秒*1000毫秒}


//參數轉換設定 變成英文
const monthsEN = [
  "Jan.", 
  "Feb.",
  "Mar.",
  "Apr.",
  "May.",
  "Jun.",
  "Jul.",
  "Aug.",
  "Sep.",
  "Oct.",
  "Nov.",
  "Dec."
];

const weeksEN = [
  "Sun.",
  "Mon.",
  "Tues.",
  "Wed.",
  "Thurs.",
  "Fri.",
  "Sat.",
];

//GMT時區設定
const timezone = {
  "New York" : -5,
  "London" : +1,
  "Bangkok" : +7,
  "Taiwan" : +8,
  "Sydeny" : +11,
}

//各個時區的抓取 時間日期 函數(注意單位)
function localtime(timezone){
  //都必須換成毫秒
  let TW_time = new Date().getTime();   //毫秒
  let offical_difference = new Date().getTimezoneOffset()*60*1000; //*已經是分鐘*60秒*1000毫秒(台灣是-480=-8*60)
  let timezone_difference = timezone*60*60*1000; //*已經是小時*60分鐘*60秒*1000毫秒
  let local_right_time = new Date(TW_time + offical_difference + timezone_difference); // 使用new Date()換回字串哪一天哪一月; 
  return local_right_time;
}

console.log( "60我是紐約時間"+localtime(-5));
console.log( "60我是台灣時間"+localtime(+8));
console.log( "60我是曼谷時間"+localtime(+7));
console.log( "60我是雪梨時間"+localtime(+11));

//練習FOR EACH 和製造資訊卡片

let allCardStr='';

function createCard(key, value) {
  let cityname = key;
  const dateObject = localtime(value); //Fri Jul 15 2016 16:23:49 GMT+0800 (CST)
  const local_date = dateObject.getDate(); //15 某一天
  const local_month =monthsEN[dateObject.getMonth()] ;  // 原始是0~11月，使用monthsEN陣列 去轉換成英文月份(所以沒有+1)
  const local_year = dateObject.getFullYear();  //2016
  const local_week = weeksEN[dateObject.getDay()];  //星期幾 星期日為0 星期一為1 原始是星期0~6，使用weekEN 陣列去轉換成英文星期
  let local_hour = dateObject.getHours();  //抓 當地小時
  let local_minute = dateObject.getMinutes();  //抓 當地的分鐘
  let local_seconds = dateObject.getSeconds();  //抓 當地的分鐘
  
  //製造晚上效果
  let class_change = '';
   if(local_hour< 6 || local_hour> 17){
     class_change = 'night';
   };

  //修正0 便於對齊 
  if(local_hour<10){
    local_hour = '0'+local_hour;
  };

  if(local_minute<10){
    local_minute = '0'+local_minute;
  };

  if(local_seconds<10){
    local_seconds = '0'+local_seconds;
  };

  // console.log(106, key, local_date,local_month,local_year,local_week,local_seconds);

  //插入卡片 
   str = `<div class="card  ${class_change}">
            <div class="small_Word">
              <div class="city_name"> ${cityname}</div>
              <div class="city_dayMonthYear">${local_date} ${local_month} ${local_year} ${local_week} </div>
            </div>
            <div class="big_Word">
               <div class="city_time"> ${local_hour} : ${local_minute}: ${local_seconds}  </div>
            </div>
          </div>`;
   allCardStr += str;
  
}


// console.log(96, Object.keys(timezone));
// console.log(96, Object.values(timezone));


//**張家祥提醒渲染有問題後，想到的可能原因，但有點繁瑣 分兩次進行，此方法比較不好
//很重要的 FOR EACH 
function start() {
  for (const [key, value] of Object.entries(timezone)) {
  // console.log(123, key, value,localtime(value));  
  createCard(key, value);
 };
}

window.setInterval(start, 1000);
start();

//把值插入資訊卡片，並記得每秒重整 而且要 "清空" /每次
function writeCard(){
  let time_info = document.querySelector('.time_info');
  time_info.innerHTML = allCardStr;
  allCardStr='';
}

window.setInterval(writeCard, 1000);
writeCard();


// 網友 張家祥 提供的解答 (比較好 簡短)
// let time_info = document.querySelector('.time_info');
// function start() {
//   for (const [key, value] of Object.entries(timezone)) {
//   // console.log(123, key, value,localtime(value));  
//   createCard(key, value);
//  };
//  //把值插入資訊卡片
//  time_info.innerHTML = allCardStr;
//  //很重要 要記得清空 不然會一直疊加
//  allCardStr='';
// }
// window.setInterval(start, 1000);
// start();


