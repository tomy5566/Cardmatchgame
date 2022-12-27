// 其他同學優化:https://codepen.io/joeShiang/pen/jOYEEPJ
// 預設解答: https://codepen.io/alpha-camp/pen/wveVQbQ

// BS pills 參考 https://getbootstrap.com/docs/4.0/components/navs/

//  1. 建立 基本參數 和 原始歌單album陣列
const BASE_URL = 'https://webdev.alphacamp.io/api/lyrics/'
const album = {
  artist: 'Adele',
  album: '25',
  tracks: [
    'Hello',
    'Send My Love (To Your New Lover)',
    'I Miss You',
    'When We Were Young',
    'Remedy',
    'Water Under the Bridge',
    'River Lea',
    'Love in the Dark',
    'Million Years Ago',
    'All I Ask',
    'Sweetest Devotion'
  ]
}

//2. 抓取HTML兩個左右排版中意的DOM元素 

const songList = document.querySelector('#song-list')
const lyricsPanel = document.querySelector('#lyrics-panel')


//3. 處理歌單 條目 渲染到左邊欄位songList中

function display_songlist() {
  let str='';
  album.tracks.forEach( function(song){
    // console.log("37"+song);
    str += `<li class='mt-3'>
            <a class="nav-link" href="#" role="tab" >${song}</a>
            </li>`;
    // console.log("41"+str);
    songList.innerHTML = str;
  })
};

display_songlist();

//4. 處理歌詞渲染到 右側 lyrics-panel中的問題和串接 AJAX

//4.1 因為有用框架，要處理標籤(點選到後)變色，所以先處理 點選到哪一欄位的 songlist
//4.2 使用 axios 串接API(包在裡面)
songList.addEventListener('click' , function(e){
  //如果標籤有active (之前點選選留下來的) 先去除掉
  //很重要: "不能"使用 e.target 去抓，是因為要刪除的標籤對象，它不是點選的e
  // console.log(e);
  const activeItem = document.querySelector('#song-list .active')
  if (activeItem) {
      activeItem.classList.remove('active')    
    }
  // 把現在點選的，加上active標籤，並抓取文字 
  //很重要，"可以"使用 e.target 去抓，是因為要 增加 active的標籤對象，它是點選的e
  // 另一種寫法 if (e.target.matches('.nav-link')) 去看classList裡的東西
 if (e.target.className =='nav-link') {
    // console.log(e);
    e.target.classList.add('active');
    const song = e.target.innerText

    //使用 axios 串接API
    axios.get(`${BASE_URL}Adele/${song}.json`)
      .then(response => {
        const lyrics = response.data.lyrics
        displayLyrics(song, lyrics)
      })
      .catch(error => console.log(error))
  }
});

//4.3 執行 渲染到 右邊 歌詞曲的函式

//注意:使用普通的 <p> tag 會濾掉換行及空白符號。而 <pre> tag 則能夠保留使用者編輯的內容文本格式。
//而這兩個內容的差別關鍵在於 white-space 屬性。 所以此處不使用// <p class='red'>${lyrics}</p>

function displayLyrics(song, lyrics) {
  lyricsPanel.innerHTML = `
      <h3 class='mt-3'>${song}</h3>
      <pre>${lyrics}</pre> 
  `
}

// 


// 想法二：將每個功能透過函式包裝
// function displaySongList(album) {
//   let songNameList = ''
//   // 新增forEach用法
//   album.tracks.forEach(song => {
//     songNameList += `
//       <li>
//         <a class="nav-link" href="#" role="tab">${song}</a>
//       </li>`
//   });
//   songList.innerHTML = songNameList
// }

// function displayLyrics(song, lyrics) {
//   lyricsPanel.innerHTML = `
//     <h3>${song}</h3>
//     <pre>${lyrics}</pre>
//   `
// }

// songList.addEventListener('click', event => {
//   const activeItem = document.querySelector('#song-list .active')
// //  after 1st click, one of the song will get class = 'active', so we need to check whether it is true, if true then remove it for making sure the second click song is the only class = 'active'
//   if (activeItem) {
//     activeItem.classList.remove('active')    
//   }
//上面這個只會抓地第一個有active的移除 要小心 可能是因為querySelector

//有問題的 不會移除active
  // if (event.target.matches('.active')) {
  //   event.target.classList.remove('active')
  // }


//   if (event.target.matches('.nav-link')) {
//     event.target.classList.add('active')
//     const song = event.target.innerText

//     //
//     axios.get(`${BASE_URL}Adele/${song}.json`)
//       .then(response => {
//         const lyrics = response.data.lyrics
//         displayLyrics(song, lyrics)
//       })
//       .catch(error => console.log(error))
//   }


// })

// displaySongList(album)

// WRITE YOUR CODE ////////////////////////
// 想法一
// 使用迴圈將歌名印出
// let songNameList = ''
// for (const song of album.tracks) {
//   songNameList += `
//       <li>
//         <a class="nav-link" href="#" role="tab">${song}</a>
//       </li>`
// }
// songList.innerHTML = songNameList

// songList.addEventListener('click', event => {
//   const activeItem = document.querySelector('#song-list .active')
  
//   console.log("37,"+activeItem);
//   console.log("e,"+event.target.classList);

//   if (activeItem) {
//     activeItem.classList.remove('active')
//   }
//   if (event.target.matches('.nav-link')) {
//     event.target.classList.add('active')
//     const song = event.target.innerText
//     // 點擊時向 axios 發出請求
//     axios.get(`${BASE_URL}Adele/${song}.json`)
//       .then(response => {
//         const lyrics = response.data.lyrics
//         lyricsPanel.innerHTML = `
//           <h3>${song}</h3>
//           <pre>${lyrics}</pre>
//           `
//       })
//       .catch(error => console.log(error))
//   }
// })



// // 想法三：使用Bootstrap的Pills
// function displaySongList(album) {
//   let songNameList = ''
//   // 新增 Bootstrap pills 用法
//   // 查閱在 pills 同個頁面下方的 Using data attributes 小標題中的說明可以發現透過 data-bs-toggle 可以很方便的讓被選取的項目呈現active的效果。
//   album.tracks.forEach(song => {
//     songNameList += `
//       <li>
//         <a class="nav-link" data-bs-toggle="pill" href="#" role="tab">${song}</a>
//       </li>`
//   });
//   songList.innerHTML = songNameList
// }

// function displayLyrics(song, lyrics) {
//   lyricsPanel.innerHTML = `
//     <h3>${song}</h3>
//     <pre>${lyrics}</pre>
//   `
// }

// songList.addEventListener('click', event => {
//   if (event.target.matches('.nav-link')) {
//     const song = event.target.innerText
//     axios.get(`${BASE_URL}Adele/${song}.json`)
//       .then(response => {
//         const lyrics = response.data.lyrics
//         displayLyrics(song, lyrics)
//       })
//       .catch(error => console.log(error))
//   }
// })

// displaySongList(album)

















//------我是分隔線------------


// 兩個問題
// 1. body位置很詭異
// 2. .catch改 function 會錯誤


//AC_AIAX練習_AXIOS 歌詞

let button = document.querySelector('button')
let show = document.querySelector('#show')

button.addEventListener('click', function () {
  axios
    .get('https://webdev.alphacamp.io/api/lyrics/Coldplay/Yellow.json')
    .then(response => {
      console.log(response.data)
      let lyrics = response.data.lyrics
      show.innerHTML = lyrics;
    })
    .catch(error => console.log(error))
})

//狗
let buttondog = document.querySelector('.getdogs')
let showdog = document.querySelector('#showdogs')
//我自己寫的 後面.catch 會錯誤

buttondog.addEventListener('click', function () {
  axios
    .get('https://webdev.alphacamp.io/api/dogs/random')
    .then(function (response) {
        console.log(response.data.message);
        let imgurl= response.data.message;
        showdog.innerHTML = `<img class="dog-image" src="${imgurl}" alt=""></img>`;
      })
    .catch(function (error) {
        console.log(error);
      });
});


//   //範例
// buttondog .addEventListener('click', function () {
//   axios
//     .get("https://webdev.alphacamp.io/api/dogs/random")
//     .then(response => {
//       console.log(response.data.message);
//       let imgurl= response.data.message;
//       showdog.innerHTML = `<img class="dog-image" src="${imgurl}" alt=""></img>`;
//     })
//     .catch(error => console.log(error));
// })




//AC_AIAX練習_AXIOS 人
//https://codepen.io/alpha-camp/pen/mvQmvb?editors=1010

let buttonperson = document.querySelector('.getperson');
let showperson= document.querySelector('#showperson');

buttonperson.addEventListener('click', function () {
  axios.get('https://webdev.alphacamp.io/api/v1/users/random/')
    .then(response => {
      console.log(response.data.results[0]);
      let persondata = response.data.results[0];
      let str = `
                 <h3>${persondata.name}</h3>
                  <img class="person-image" src="${persondata.avatar}" alt="">
                  <p>${persondata.email}</p>
                  ` ;
      showperson.innerHTML = str;
    })
    .catch(error => console.log(error))
});


//AC_AIAX練習_AXIOS 女生3人
// https://codepen.io/alpha-camp/pen/BMGWQV
// https://achq.notion.site/RANDOM-USER-GENERATOR-a139499895f34647851133560ec6074f

let buttonwoman = document.querySelector('.getwoman');
let showwoman= document.querySelector('.showwoman');
let womanstr='';
buttonwoman.addEventListener('click', function () {
  axios.get('https://webdev.alphacamp.io/api/v1/users/random?gender=female&results=3')
  .then(function (response) {
      console.log(response);      
      for (i=0;i<3;i++){        
        let womandata = response.data.results[i];      
        let str = `<div class="showwomanlist">
               <h3>${womandata.name}</h3>
               <img class="person-image" src="${womandata.avatar}" alt="">
               <p>${womandata.email}</p></div>` ;
        womanstr += str;
      }
      showwoman.innerHTML = womanstr;
      console.log("WW");
    })
    .catch(error => console.log(error))
});



