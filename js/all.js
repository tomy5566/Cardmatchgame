// 設定遊戲狀態
const GAME_STATE = {
  FirstCardAwaits: "FirstCardAwaits",
  SecondCardAwaits: "SecondCardAwaits",
  CardsMatchFailed: "CardsMatchFailed",
  CardsMatched: "CardsMatched",
  GameFinished: "GameFinished",
}

//花色圖片陣列
const Symbols = [
    'images/spade.png', // 黑桃
    'images/heart.png', // 愛心
    'images/diamonds.png', // 方塊
    'images/club.png' // 梅花
  ]


//渲染卡片：view.displayCards
const view = {
  //  getCardElement (index) {
  //     const number =  this.transformNumber((index % 13) + 1)
  //     const symbol = Symbols[Math.floor(index / 13)]
  //     // console.log(symbol);
  //     return `
  //       <div class="card">
  //         <p>${number}</p>
  //         <img src="${symbol}"/>
  //         <p>${number}</p>
  //       </div>`
  //   },

  getCardElement (index) {
    return  `<div data-index="${index}" class="card back"></div>`
  },
  getCardContent (index) {
    const number = this.transformNumber((index % 13) + 1)
    const symbol = Symbols[Math.floor(index / 13)]
    return `
      <p>${number}</p>
      <img src="${symbol}" />
      <p>${number}</p>
    `
  },

  transformNumber (number) {
    switch (number) {
      case 1:
        return 'A'
      case 11:
        return 'J'
      case 12:
        return 'Q'
      case 13:
        return 'K'
      default:
        return number
    }
  },


  //等同於 displayCards: function displayCards() { ...  }
  //因為  當物件的屬性與函式/變數名稱相同時，可以省略不寫
// displayCards () {
  displayCards (indexes) {
      const rootElement = document.querySelector('#cards')
        // rootElement.innerHTML = this.getCardElement(0)
        //1.Array.from 把(Array(52).keys())的索引值，轉為陣列 
        //2.用 map 迭代陣列，並依序將數字丟進 view.getCardElement()，會變成有 52 張卡片的陣列
        //3.接著要用 join("") 把陣列合併成一個大字串，才能當成 HTML template 來使用
        // JOIN 方法會將陣列中所有的元素連接、合併成一個字串，並回傳此字串。MDNS Array.prototype.join()，join("")代表沒有分隔
        //4.把組合好的 template 用 innerHTML 放進 #cards 元素裡
        // let str =  Array.from(Array(52).keys()).map(index => this.getCardElement(index)).join("");
        // let str2 =utility.getRandomNumberArray(52).map(index => this.getCardElement(index)).join('');
      let str3 =indexes.map(index => this.getCardElement(index)).join('');
      rootElement.innerHTML = str3;
        // console.log(str);
    },


  flipCard (card) {
    console.log(card)
    if (card.classList.contains('back')) {
      // 回傳正面
      card.classList.remove('back')
      card.innerHTML = this.getCardContent(Number(card.dataset.index))
      return
    }
    // 回傳背面
    card.classList.add('back');
    card.innerHTML = null;
  },

  pairCard(card) {
    card.classList.add('paired')
  },

  renderScore(score) {
    document.querySelector(".score").textContent = `Score: ${score}`;
  },
  
  renderTriedTimes(times) {
    document.querySelector(".tried").textContent = `You've tried: ${times} times`;
  },


}
// view.displayCards();

//宣告 Model
const model = {
  revealedCards: [],
  //被翻開的卡片。使用者每次翻牌時，就先把卡片丟進這個牌組，集滿兩張牌時就要檢查配對有沒有成功，檢查完以後，這個暫存牌組就需要清空。
  isRevealedCardsMatched() {
    return this.revealedCards[0].dataset.index % 13 === this.revealedCards[1].dataset.index % 13 
  },
  score: 0,
  triedTimes: 0

}



//宣告 Controller
const controller = {
  currentState: GAME_STATE.FirstCardAwaits,  // 加在第一行
  generateCards () {
    view.displayCards(utility.getRandomNumberArray(52))
  },

  dispatchCardAction (card) {
    if (!card.classList.contains('back')) {
      return
    }
    switch (this.currentState) {
      case GAME_STATE.FirstCardAwaits:
        view.renderTriedTimes(++model.triedTimes)  //算次數
        view.flipCard(card)
        model.revealedCards.push(card)
        this.currentState = GAME_STATE.SecondCardAwaits
        break
      case GAME_STATE.SecondCardAwaits:
        view.flipCard(card)
        model.revealedCards.push(card)

        if (model.isRevealedCardsMatched()) {
          // 配對成功
          view.renderScore(model.score += 10)  //成功加十分
          this.currentState = GAME_STATE.CardsMatched
          view.pairCard(model.revealedCards[0])
          view.pairCard(model.revealedCards[1])
          model.revealedCards = []
          this.currentState = GAME_STATE.FirstCardAwaits
          
        } else {
          // 配對失敗
          this.currentState = GAME_STATE.CardsMatchFailed
          setTimeout(() => {
            view.flipCard(model.revealedCards[0])
            view.flipCard(model.revealedCards[1])
            model.revealedCards = []
            this.currentState = GAME_STATE.FirstCardAwaits
          }, 1200)
        }



        // 判斷配對是否成功
        break
    }
    console.log('this.currentState', this.currentState)
    console.log('revealedCards', model.revealedCards.map(card => card.dataset.index))
  }
}






//洗牌演算法：Fisher-Yates Shuffle
const utility = {
    getRandomNumberArray (count) {
      const number = Array.from(Array(count).keys())
      for (let index = number.length - 1; index > 0; index--) {
        let randomIndex = Math.floor(Math.random() * (index + 1))
          ;[number[index], number[randomIndex]] = [number[randomIndex], number[index]]
      }
      return number
    }
  }

controller.generateCards() // 取代 view.displayCards()

//或是可以參考 https://ithelp.ithome.com.tw/articles/10211614
//重點是.qeurySelector() 只會針對元素的第一筆資料，其他並不會被選入
//這時候可以使用 .querySelectorAll()，這個不但可以把同樣的元素選起來外，還會以陣列的方式被傳回
document.querySelectorAll('.card').forEach(card => {
  card.addEventListener('click', event => {
    // view.flipCard(card)
    controller.dispatchCardAction(card)
  })
})