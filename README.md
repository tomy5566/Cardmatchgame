# Card Match Game練習專案readme
card_pair_找出相同數字的牌 JS小遊戲

## 主要介紹
使用JavaScript創建小遊戲，練習狀態與程式碼模組化，使用MVC架構(Model(資料)、View(畫面)、Controller(控制) 三個區塊)。

## DEMO link
[https://tomy5566.github.io/Cardmatchgame/](https://tomy5566.github.io/Cardmatchgame/)

## 使用技術
- HTML
- CSS: [flex](https://developer.mozilla.org/zh-CN/docs/Web/CSS/flex)
- JavaScript
- [Bootstrap](https://getbootstrap.com/)

## JavaScript 使用技術介紹(待修正)

1. 使用[MVC架構]([https://getbootstrap.com/](https://zh.wikipedia.org/zh-tw/MVC))(Model(資料)、View(畫面)、Controller(控制) 三個區塊)建構程式碼。和資料有關的程式碼歸類在 model。和畫面呈現有關的程式碼歸類在 view 。再由 controller 發號施令進行動作。
2. 練習定義程式狀態(state management)，判斷現在的流程(狀態)在哪裡，並將所有狀態命名在一組變數中，決定程式目前要執行什麼動作。
2. 使用[Bootstrap](https://getbootstrap.com/)建立版型。並運用 flex-basis、flex-grow、flex-shrink 設定每排 13 張的卡片排版。
3. 利用 Array.from 生成數字陣列，並使用 :last-child 選擇器和 transform 屬性，搭配CSS製作倒轉的卡片數字，呈現出撲克牌52張的數字與花色畫面。
4. 使用 Fisher-Yates Shuffle 洗牌演算法，讓每次重新整理得牌能隨機出現在畫面中。
5. 練習將程式碼和函式模組化，並搭配MVC架構整理，以利程式出問題時，就只需要去對應的區塊查看。
 

## 功能介紹
- 將52張牌組，用13*4的方式隨機顯示於畫面上。
- 翻開牌組，比對兩張數字是否相同，相同則得分並保留(變色)，不同則覆蓋回去。
- 上方設計計分功能，以及翻牌次數的統計。


## 介面展示
![image](https://github.com/tomy5566/Cardmatchgame/blob/main/cadrgame_demo.gif)



## 參考資料
ALPHA Camp 網路課程資源
