module.exports = {
    // 忽略配置
    ignore: {
        extension: {
            // 忽略扩展名, 只对src目录代码有效
            src: [".less", ".psd"],
        },
        // 忽略列表
        // path: [
        //     "library/jquery-3.6.4/jquery.js",
        // ],
    },
    // 压缩配置: 只对src目录有效
    minify: {
        htmlminifier: {
            options: {
                keepClosingSlash: true,// 在单例元素上保留尾部斜杠
                caseSensitive: true,// 以区分大小写的方式处理属性（对于自定义 HTML 标记很有用）
                collapseWhitespace: true, // 删除html里的空格 达到html的压缩
                // removeAttributeQuotes: true, // 尽可能删除html标签里的双引号 达到html的压缩
                removeComments: true, // 删除html中的注释
                removeCommentsFromCDATA: true, // 从脚本和样式删除的注释
                minifyCSS: true, // 压缩css
                minifyJS: true, // 压缩js
            },
        },
        uglifyjs: {
            options: {
                warnings: true,
                mangle: true,
                ie: true,
                webkit: true,
            }
        },
    },
};
