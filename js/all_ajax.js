// 其他同學優化:https://codepen.io/joeShiang/pen/jOYEEPJ
// 預設解答: https://codepen.io/alpha-camp/pen/wveVQbQ

// BS pills 參考 https://getbootstrap.com/docs/4.0/components/navs/


// DEFAULT CODE ////////////////////////
const BASE_URL = 'https://webdev.alphacamp.io/api/lyrics/'
const songList = document.querySelector('#song-list')
const lyricsPanel = document.querySelector('#lyrics-panel')
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

// 想法二：將每個功能透過函式包裝
function displaySongList(album) {
  let songNameList = ''
  // 新增forEach用法
  album.tracks.forEach(song => {
    songNameList += `
      <li>
        <a class="nav-link" href="#" role="tab">${song}</a>
      </li>`
  });
  songList.innerHTML = songNameList
}

function displayLyrics(song, lyrics) {
  lyricsPanel.innerHTML = `
    <h3>${song}</h3>
    <pre>${lyrics}</pre>
  `
}

songList.addEventListener('click', event => {
  const activeItem = document.querySelector('#song-list .active')
//  after 1st click, one of the song will get class = 'active', so we need to check whether it is true, if true then remove it for making sure the second click song is the only class = 'active'
  if (activeItem) {
    activeItem.classList.remove('active')    
  }
//上面這個只會抓地第一個有active的移除 要小心 可能是因為querySelector

//有問題的 不會移除active
  // if (event.target.matches('.active')) {
  //   event.target.classList.remove('active')
  // }


  if (event.target.matches('.nav-link')) {
    event.target.classList.add('active')
    const song = event.target.innerText

    //
    axios.get(`${BASE_URL}Adele/${song}.json`)
      .then(response => {
        const lyrics = response.data.lyrics
        displayLyrics(song, lyrics)
      })
      .catch(error => console.log(error))
  }


})

displaySongList(album)

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



