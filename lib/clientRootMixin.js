/* global ID, BLOG_ID, NAME, KEYWORD, QR_CODE, RANDOM, LOCK_TOC, LIB_URL, CSS_URL, EXCLUDES, REVERSE, INTERVAL, EXPIRES, HEIGHT, TYPE */

import { asyncLoadJs, loadCss } from "./loadResources.js";
import { initPlugin } from "./readmorePlugin.js";
const { match } = require('node-match-path')

export default {

  mounted() {
    // 加载引流插件
    this.loadPlugin(500);

    // 监听路由变化
    this.$router.afterEach((to, from) => {
      var toPath = to.path;
      var fromPath = from.path;
      // 忽略带锚点的路由变化
      if (toPath != fromPath) {
        this.loadPlugin(500);
      }
    })
  },

  methods: {
    // 加载引流插件
    loadPlugin(waitMills) {
      // 利用定时器来保证可以正常操作DOM节点
      setTimeout(() => {
        this.updatePlugin();
      }, waitMills);
    },

    // 更新引流插件
    updatePlugin() {
      // 排除指定的文章链接
      var path = window.location.pathname;
      var strExp = EXCLUDES.strExp;
      var regExp = EXCLUDES.regExp;
      var isExcluded = false;

      // 路径 + 通配符规则匹配
      if (strExp && strExp.length > 0) {
        for (var i = 0; i < strExp.length; i++) {
          if (match(strExp[i], path).matches) {
            isExcluded = true;
            break;
          }
        }
      }

      // 正则表达式匹配
      if (regExp && regExp.length > 0 && !isExcluded) {
        for (var i = 0; i < regExp.length; i++) {
          // 创建正则表达式
          var newExp = new RegExp(regExp[i], 'gi');
          if (match(newExp, path).matches) {
            isExcluded = true;
            break;
          }
        }
      }

      // 应用排除规则
      if (isExcluded && !REVERSE) {
        return;
      }
      // 反转排除配规则
      else if (!isExcluded && REVERSE) {
        return;
      }
      // 更新引流插件
      else {
        // 获取文章内容的DIV
        var divArr = document.querySelectorAll(SELECTOR);
        if (divArr && divArr.length > 0) {
          // 文章内容DIV设置ID
          divArr[0].id = ID;
          // 加载引流插件的CSS文件
          loadCss(CSS_URL, 'readmore-css');
          // 异步加载引流插件的JS文件
          asyncLoadJs(LIB_URL, 'readmore-js', () => {
            // 初始化引流插件
            initPlugin(ID, BLOG_ID, NAME, KEYWORD, QR_CODE, RANDOM, LOCK_TOC, INTERVAL, EXPIRES, HEIGHT, TYPE);
          })
        } else {
          console.warn('readmore plugin occurred error: not found article content by selector "' + SELECTOR + '"');
        }
      }
    }
  }
}