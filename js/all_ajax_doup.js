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



//------我是分隔線------------
//參考網路資源AC素材練習

