# egret-shader-sample

## 閱讀指引
- [Sample_1](./blob/main/src/filters/Sample_1.ts)  
    最直接的寫法, 但因為寫在字串內, 缺少IDE輔助不好編輯.
- [Sample_2](./blob/main/src/filters/Sample_2.ts)  
    獨立出 shader 檔案並且動態載入, 讓編輯更輕鬆.
- [Sample_3](./blob/main/src/filters/Sample_3.ts)  
    將抽象一些基本操作, 模擬日常使用時通常會包裝成類別的樣貌.
- [Sample_4](./blob/main/src/filters/Sample_4.ts)  
    因應日常會在遊戲的某個角落測試, 每次修改都要重新開遊戲會很浪費人生!!  
    實作在 runtime 中更換 shader(目前得要抽換整個 filter).
  - 另外實作 tween filter 參數的[範例](https://github.com/NaClYen/egret-shader-sample/blob/5cf4464fab530e217a3c173cccc6d538c52b085c/src/Main.ts#L222)

---

## start debug
press F5 to start
if has any issue, check `./vscode/launch.json` first.

---

## filter
在 egret 內要使用自定義的 shader, 要透過 [egret.CustomFilter](https://docs.egret.com/engine/docs/api/engine/egret.CustomFilter) 影響目標物件.  
目標物件需要是 [egret.DisplayObject](https://docs.egret.com/engine/docs/api/engine/egret.DisplayObject) 或其子孫.
### 啟用/關閉
控制 [filters](https://docs.egret.com/engine/docs/api/engine/egret.DisplayObject#filters) 加入/移除 filter 物件.
#### 注意事項
`filters` 不可為空陣列(`[]`), 但可為 `undefined`.

---

## about the demo texture
由 Dfenix - Imported from 500px (archived version) by the Archive Team. (detail page), CC BY 3.0, https://commons.wikimedia.org/w/index.php?curid=71321292