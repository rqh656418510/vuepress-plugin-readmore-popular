import { insertJsCode } from "./loadResources.js";

/**
 * 初始化Readmore插件
 * 
 * @param id DIV的ID
 * @param blogId 博客ID
 * @param name  博客名称
 * @param keyword 微信公众号回复关键词
 * @param qrcode 微信公众号二维码链接
 * @param random 随机导流的概率
 * @param lockToc 是否锁住文章目录
 * @param interval 定时校验凭证有效性的时间间隔（秒）
 * @param expires 文章解锁后Token的有效天数
 * @param height 文章内容的预览高度
 * @param type 博客类型
 * @param baseUrl 后端务的地址
 * @param allowMobile 移动端是否启用引流
 */
export function initPlugin(id, blogId, name, keyword, qrcode, random, lockToc, interval, expires, height, type, baseUrl, allowMobile) {
    let code = `
    var regex = /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
    var isMobile = navigator.userAgent.match(regex);
    var allowMobile = ${allowMobile};
    if (!isMobile || (isMobile && allowMobile)) {
        try {
            var plugin = new ReadmorePlugin();
            plugin.init({
                ` +
                `id: "` + id + `", 
                ` +
                `blogId: "` + blogId + `",
                ` +
                `name: "` + name + `",
                ` +
                `keyword: "` + keyword + `",
                ` +
                `qrcode: "` + qrcode + `",
                ` +
                `random: "` + random + `",
                ` +
                `lockToc: "` + lockToc + `",
                ` +
                `interval: "` + interval + `",
                ` +
                `expires: "` + expires + `",
                ` +
                `height: "` + height + `",
                ` +
                `type: "` + type + `",
                ` +
                `baseUrl: "` + baseUrl + `"`
                + `
            });
        } catch (e) {
            console.warn("readmore plugin occurred error: " +  e.name + " | " + e.message);
        }
    }`;
    
    // 添加初始化Readmore插件的JS代码
    insertJsCode(code, "readmore-init");
}