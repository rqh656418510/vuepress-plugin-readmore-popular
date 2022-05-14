/* global ID, BLOG_ID, NAME, KEYWORD, QR_CODE, RANDOM, LOCK_TOC, LIB_URL, CSS_URL */

import { asyncLoadJs, loadCss } from "./loadResources.js";
import { initPlugin } from "./readmorePlugin.js";

export default {
  updated() {
    // 获取文章内容的DIV
    var divArr = document.querySelectorAll(SELECTOR);
    if (divArr && divArr.length > 0) {
      // 文章内容DIV设置ID
      divArr[0].id = ID;
      // 加载Readmore插件的CSS文件
      loadCss(CSS_URL, 'readmore-css');
      // 异步加载Readmore插件的JS文件
      asyncLoadJs(LIB_URL, 'readmore-js', () => {
        // 初始化Readmore插件
        initPlugin(ID, BLOG_ID, NAME, KEYWORD, QR_CODE, RANDOM, LOCK_TOC);
      })
    } else {
      console.warn('readmore plugin occurred error: not found div by selector "' + SELECTOR + '"');
    }
  }
}
