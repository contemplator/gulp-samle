## 安裝套件

```
npm install
```

## 使用的套件

1. gulp-connect
> 建立簡單的 server

2. gulp-sass

3. gulp-autoprefixer

4. gulp-liverereload

5. gulp-concat
> 在 scss 可以使用 @import 語法將不同的 scss 檔案會總成一個檔案
> 在 js 沒有像是 css 一樣簡單的語法可以將不同檔案彙總成一個。所以需要使用 gulp-concat，注意，如果直接指定一個資料夾為需要 concat，他的順序會依照檔名，不然也可以使用陣列的方式一個個輸入。

6. gulp-clean
> 在尚未使用 gulp-clean 時，當你修改檔案，重新編譯後產生靜態檔就會覆蓋掉原本的檔案，但是為什麼還要使用 gulp-clean？
> 因為如果你不是修改檔案，而是刪除某個檔案，產生的靜態檔不想讓他繼續存在，你就需要多一個動作，但因為在 watch 時找不到方法直接刪除，所以在 gulp default task 一開始就先全部 clean，每次 gulp 都重新編譯或者移動檔案一次。

7. gulp-sourcemaps
> 如果沒有使用 gulp-sourcemaps，使用 concat 和 uglify 後的 js 和 css 都會是很難閱讀，而且無法從 chrome 下中斷點的格式，source map 可以幫助被 uglify 後的程式找到你尚未編譯的 js 和 css 檔案，方便你下中斷點以及在 chrome 直些修改。