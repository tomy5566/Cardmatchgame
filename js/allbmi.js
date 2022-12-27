//日期設定
const dateObject = new Date(); //Fri Jul 15 2016 16:23:49 GMT+0800 (CST)
const date = dateObject.getDate(); //15
const month = dateObject.getMonth()+1 ;  //6 要記得+1才是正確的，不然原始是0~11月
const year = dateObject.getFullYear();  //2016

//變數設定
let height = document.querySelector('.personheight');
let weight = document.querySelector('.personweight');
let submit = document.querySelector('.submitData');
let submitbtn = document.querySelector('.submitDatabtn');
// let submitbtn;
let result = document.querySelector('.content ul');

// let btnReset ;

var data = JSON.parse(localStorage.getItem('listDataBMI')) || [];
submitbtn.addEventListener('click', calcu, false);

//也可以把常出現的程式碼 包成一個函式執行
// function getSubmitDomAndAddEventlinstener () {
//   submitbtn = document.querySelector('.submitDatabtn');
//   submitbtn.addEventListener('click', calcu, false);
// }
// getSubmitDomAndAddEventlinstener();

//計算函式
function calcu(e){
    e.preventDefault();
    // alert('5566');
    addData(e);
    changeResultWord(e);
    //重整按鈕設定圖片 (要放在calcu DOM已經出現img才抓得到)
    let btnReset = document.querySelector('#reword img');
    btnReset.addEventListener('click' , btnResetALL, false);
}
  
//重新計算 改變按鈕的函式
function btnResetALL(e){
  // alert('ttt');
  submit.innerHTML = '<input type="button" class="submitDatabtn" value="計算">'+'<p id="reword" class="bmiFin hidden">&nbsp; &nbsp; &nbsp; 原始<img src="images/arrows-rotate-solid.svg" alt="重整"></img></p>';
  height.value= [];
  weight.value= [];
  
  //因為DOM改變  要重新抓一次 監聽一次
  submitbtn = document.querySelector('.submitDatabtn');
  submitbtn.addEventListener('click', calcu, false);
  // getSubmitDomAndAddEventlinstener();
}


//更改送出按鈕的文字
function changeResultWord(e){
    // console.log('新按鈕'+newResultWord);
    submit.innerHTML = '<input type="button" class="submitDatabtn '+colorclass+'" value="BMI:'+ bmiresult+'">'+'<p id="reword" class="bmiFin '+colorclass+'">&nbsp; &nbsp; &nbsp; '+newResultWord+'<img src="images/arrows-rotate-solid.svg" alt="重整"></img></p>'
}


//加入列表，並同步更新網頁與 localstorage
let bmiresult = 0;
let colorclass = 0;
let newResultWord = 0;

function addData(e) {
    e.preventDefault();

    let weightNum = Number(weight.value);
    let heightNum = Number((height.value)/100);
        bmiresult = (weightNum / (heightNum * heightNum)).toFixed(2);  
    console.log(bmiresult); 
    console.log(typeof(weightNum )); 
    console.log(typeof(heightNum )); 

    let health = 0;
        colorclass = 0;
    if (bmiresult<18.5 && bmiresult>0){
        // alert('過輕');
        health = '過輕';
        colorclass = 'blue'; 
        newResultWord = '過輕';

    }else if(bmiresult<24 && bmiresult>=18.5){
        // alert('標準')
        health = '標準';
        colorclass = 'green'; 
        newResultWord = '標準';

    }else if(bmiresult<27 && bmiresult>=24){
        // alert('過重')
        health = '過重';
        colorclass ='orange'; 
        newResultWord = '過重';
    
    }else if(bmiresult>=27){
        // alert('肥胖')
        health = '肥胖';  
        colorclass = 'red';  
        newResultWord = '肥胖';        

    }else{
        // alert('請輸入身高體重')
        health = '無值';  
        colorclass = 'red';  
        newResultWord = '無值';    
    };

    //排除 NAN 情況 ，寫入localStorage   
    if (bmiresult == 'NaN' || weightNum == 0 ){
      alert('請重新輸入');

    }else{
      console.log('正確輸入');
      let final = '<li class="'+ colorclass+'">'+health+' &emsp;&emsp;你的BMI是<span>'+ bmiresult +'</span>&emsp;體重<span>'+ weightNum +'</span>kg&emsp;身高<span>'+ heightNum*100 +'</span>cm &emsp;&emsp;'+year+'/'+month+'/'+date+'&emsp;&emsp;';
      // result.innerHTML = final;   //這邊新增的話會沒有 "刪除"設計
      var txt = final;
      var todo = {
        content: txt
      };
      data.push(todo);
      updateList(data);
      localStorage.setItem('listDataBMI', JSON.stringify(data));
    };    
    
  }

  // 更新網頁內容 和增加 "刪除"設計
  function updateList(items) {
    str = '';
    var len = items.length;
    for (var i = 0; len > i; i++) {
      str += items[i].content+'<a href="#" data-index=' + i + ' />刪除</a></li>' ;
    }
    result.innerHTML = str;
    console.log('第二次'+bmiresult);
  }


  // 刪除 某一筆資料
  let card = document.querySelector('.content .card');
  card.addEventListener('click', toggleDone);

  function toggleDone(e) {
    e.preventDefault();
    if(e.target.nodeName !== 'A'){return};
    var index = e.target.dataset.index;
    data.splice(index, 1);
    localStorage.setItem('listDataBMI', JSON.stringify(data));
    updateList(data);
  }


//清除全部資料 clearALL()
let clearAll = document.querySelector('.clearlink');
clearAll.addEventListener('click', clearALL , false);

function clearALL(e){
   localStorage.clear(e);
   data = [];   //也要清空DATA否則他下次會重新寫入
   alert('全部都清空了');
   result.innerHTML = '<li>全部都清空了</li>';
   submit.innerHTML = '<input type="button" class="submitDatabtn" value="計算">';

  //因為DOM改變  要重新抓一次 監聽一次 和上面重整一樣
  submitbtn = document.querySelector('.submitDatabtn');
  submitbtn.addEventListener('click', calcu, false);
}
