/* global ID, BLOG_ID, NAME, KEYWORD, QR_CODE, RANDOM, LOCK_TOC, LIB_URL, CSS_URL, EXCLUDES */

import { asyncLoadJs, loadCss } from "./loadResources.js";
import { initPlugin } from "./readmorePlugin.js";
const { match } = require('node-match-path')

export default {
  updated() {
    // 排除指定的文章
    var path = window.location.pathname;
    var length = EXCLUDES.length;
    for (var i = 0; i < length; i++) {
      var ruleExp = EXCLUDES[i];
      var result = match(ruleExp, path);
      if (result.matches) {
        return;
      }
    }

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
