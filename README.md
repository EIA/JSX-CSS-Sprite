# JSX-CSS-Sprite
自動生成up、over狀態的 photoshop script<br/>
測試環境: win/mac  CS5/CS6<br/>

=============
> [About.me](http:about.me/eia)<br/>

在Flash裡,我們會用 'up'、'over'、'hit'來製作按鈕元件，<br/>
![alt](images/flash.png)

小工具使用類似方式命名群組與圖層名<br/>
![alt](images/photoshop.png)

1: 選定包含 'up'、'over'、'hit' 三個圖層名稱的群組<br/>
2: 執行 "jsx-css-sprite.jsx"<br/>

   會依據 hit 作為 CSS Sprite 範圍的依據，<br/>
   複製一份群組到新增檔案，<br/>
   並將up 與 over 狀態垂直排列成 CSS Sprite<br/>

=============
> 'up'、'over'、'hit' 不區分大小寫

=============
執行方式:<br/>
方法1: File > Scripts > Browse... 選擇 "jsx-css-sprite.jsx"<br/>
方法2: 將 "jsx-css-sprite.jsx" 存檔於 "/Presets/Scripts/ 中，<br/>
      並使用 File > Scripts > jsx-css-sprite.jsx 執行<br/>
      可設定快捷鍵