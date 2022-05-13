const { resolve } = require('path');

module.exports = (options = {}, context) => ({
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
    LIB_URL: options.libUrl || 'https://qiniu.techgrow.cn/js/readmore.js'
  },

  // 定义指向 mixin 文件的路径，控制根组件的生命周期
  clientRootMixin: resolve(__dirname, './lib/clientRootMixin.js')

});
