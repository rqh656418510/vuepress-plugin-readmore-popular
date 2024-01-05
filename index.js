const colors = require('colors');
const { resolve } = require('path');

module.exports = (options = {}, context) => {

  // 输出日志信息
  console.log(colors.bold.white.bgBlue(' READMORE PLUGIN ') + ' running... ');

  return {
    // 定义插件名称
    name: 'vuepress-plugin-readmore-popular',

    // 定义用户参数
    define: {
      ID: options.id || 'readmore-container',
      BLOG_ID: options.blogId || '',
      NAME: options.name || '',
      KEYWORD: options.keyword || '',
      QR_CODE: options.qrcode || '',
      RANDOM: options.random || 1,
      LOCK_TOC: options.lockToc || 'yes',
      SELECTOR: options.selector || 'div.theme-default-content',
      LIB_URL: options.libUrl || 'https://qiniu.techgrow.cn/readmore/dist/readmore.js',
      CSS_URL: options.cssUrl || 'https://qiniu.techgrow.cn/readmore/dist/vuepress.css',
      EXCLUDES: options.excludes || { strExp: [], regExp: [] },
      REVERSE: options.reverse || false,
      INTERVAL: options.interval || 60,
      EXPIRES: options.expires || 365,
      HEIGHT: options.height || 'auto',
      TYPE: 'vuepress',
      BASEURL: options.baseUrl || '',
      ALLOW_MOBILE: options.allowMobile || false,
      WAIT_DOM_MILLS: options.waitDomMills || 1000
    },

    // 定义指向 mixin 文件的路径，控制根组件的生命周期
    clientRootMixin: resolve(__dirname, './lib/clientRootMixin.js')

  };
  
};
