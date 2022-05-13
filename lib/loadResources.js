// 引入Q
const Q = require('q');

/**
 * 异步加载外部js文件
 * 
 * @param url 导入js的url地址
 * @param id  script标签的id（必须唯一）
 * @param success 加载成功的回调函数
 * @param error 加载失败的回调函数
 * @returns {*} export此函数方便全局调用
 */
export function asyncLoadJs(url, id, success, error) {
    return Q.Promise((resovle, reject) => {
        let srcArr = document.getElementsByTagName('script');
        for (let i = 0; i < srcArr.length; i++) {
            // 如果找到了重复的js标签将它删除
            if (srcArr[i].id === id) {
                document.getElementById(id).remove();
            }
        }

        // 创建script标签，并为此标签添加id
        let script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = url;
        script.id = id;

        // 添加标签到body尾部
        document.body.appendChild(script);

        // 处理回调函数
        script.onload = () => {
            if (success && typeof success === 'function') {
                success();
            }
            resovle();
        };
        script.onerror = () => {
            if (error && typeof error === 'function') {
                error();
            }
            reject();
        }
    })
}

/**
 * 添加js代码
 * 
 * @param {} code js代码（字符串）
 * @param id  script标签的id（必须唯一）
 * @returns {*} export此函数方便全局调用
 */
export function insertJsCode(code, id) {
    let srcArr = document.getElementsByTagName('script');
    for (let i = 0; i < srcArr.length; i++) {
        // 如果找到了重复的js标签将它删除
        if (srcArr[i].id === id) {
            document.getElementById(id).remove();
        }
    }

    // 创建script标签，并为此标签添加id
    let newScript = document.createElement("script");
    newScript.type = 'text/javascript';
    newScript.id = id;

    // 往script标签内添加js代码
    let inlineScript = document.createTextNode(code);
    newScript.appendChild(inlineScript);

    // 添加标签到body尾部
    document.body.appendChild(newScript);
}

/**
 *
 * 加载外部css文件
 * 
 * @param url 导入css的url地址
 * @returns {*} export此函数方便全局调用
 */
export function loadCss(url) {
    let css = document.createElement('link');
    css.href = url;
    css.rel = 'stylesheet';
    css.type = 'text/css';
    document.head.appendChild(css);
}
