## 安裝套件

請先切換到專案底下，並開啟終端機，

請在終端機輸入以下指令執行 npm 安裝套件

```
npm install
```

## 使用方式

請在終端機輸入以下指令執行 gulp default 任務

```
gulp
```

在瀏覽器輸入 http://localhost:8080 即可看到 hello world

對在 src 下的 html 檔案，以及 \css, \js, \images 下的檔案進行修改，都會同步到 dist 資料夾下並重新連線 server，更新瀏覽器上的畫面。

若要修改設定，請修改 gulpfile.js，並按下鍵盤的 Ctrl + C 關閉原本的 server，再重新開啟 server


## 使用的套件

1. gulp-connect
> 建立簡單的 server

2. gulp-sass
> 編譯 sass 及 scss 為 css，已經提供 compress，就不另外安裝 mincss 套件。

3. gulp-autoprefixer
> gulp-sass 沒有提供修飾前綴字的功能，自動增加 -webkit、-ms 等前綴修飾詞，讓 css 可以適用於更多瀏覽器。

4. gulp-liverereload
> 和 gulp watch(監聽) 功能合併使用，當有檔案進行修改或其他變更，就重新對 server 連線。

5. gulp-concat
> 在 scss 可以使用 @import 語法將不同的 scss 檔案會總成一個檔案，但是仍會編譯所有 scss 檔案。
> 在 js 沒有像是 css 一樣簡單的語法可以將不同檔案彙總成一個。所以需要使用 gulp-concat，注意，如果直接指定一個資料夾為需要 concat，他的順序會依照檔名，不然也可以使用陣列的方式一個個輸入。

6. gulp-clean
> 在尚未使用 gulp-clean 時，當你修改檔案，重新編譯後產生靜態檔就會覆蓋掉原本的檔案，但是為什麼還要使用 gulp-clean？
> 因為如果你不是修改檔案，而是刪除某個檔案，產生的靜態檔不想讓他繼續存在，你就需要多一個動作，但因為在 watch 時找不到方法直接刪除，所以在 gulp default task 一開始就先全部 clean，每次 gulp 都重新編譯或者移動檔案一次。

7. gulp-sourcemaps
> 如果沒有使用 gulp-sourcemaps，使用 concat 和 uglify 後的 js 和 css 都會是很難閱讀，而且無法從 chrome 下中斷點的格式，source map 可以幫助被 uglify 後的程式找到你尚未編譯的 js 和 css 檔案，方便你下中斷點以及在 chrome 直些修改