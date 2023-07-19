const fs = require('fs');
const path = require("path");

/**
 * https://www.npmjs.com/package/uglify-js
 */
const uglifyjs = require("uglify-js");

/**
 * https://www.npmjs.com/package/html-minifier
 */
const minify = require('html-minifier').minify;

/**
 * https://www.npmjs.com/package/cssmin
 */
const cssmin = require('cssmin');

/**
 * https://www.npmjs.com/package/console-color-node
 */
const color = require('console-color-node');

var helper = {};

/**
 * 控制台打印彩色
 * end: 结束(关闭颜色)
 * shallow: 淡化文本
 * bold: 文本加粗
 * italic: 文本斜体
 * underline: 文本下划线
 * black: 文本黑色
 * red: 文本红色
 * green: 文本绿色
 * yellow: 文本黄色
 * blue: 文本蓝色
 * purple: 文本紫色
 * cyan: 文本青色
 * white: 文本白色,
 * bg-black: 背景黑色,
 * bg-red: 背景红色,
 * bg-green: 背景绿色,
 * bg-yellow: 背景黄色,
 * bg-blue: 背景蓝色,
 * bg-purple: 背景紫色,
 * bg-cyan: 背景青色,
 * bg-white: 背景白色
 */
helper.console = {

    /**
     * 错误信息打印
     * @param {String} title 标题
     * @param {Object} catchError 捕获到的错误信息
     */
    error: function (title, catchError) {
        console.log (color('red', 'bold', '出错: ', 'end', 'red', title, 'end'));
        if (catchError) console.log (catchError);
    },

    /**
     * 配置日志
     * @param {String} key 
     * @param {String} value 
     */
    configlog: function (key, value) {
        console.log (color('bold', '配置日志', 'end'), color('underline', key, 'end'), JSON.stringify (value));
    },

    /**
     * 构建成功日志
     * @param {Number} runtime 运行时间
     * @param {Number} directorys 目录数量
     * @param {Number} files 文件数量
     */
    buildsuccess: function (runtime, directorys, files) {
        console.log (color('bold', '构建完成 ', 'end', 'green', 'bold', helper.runtime (runtime), 'end'), color('目录数量 ', 'cyan', 'bold', directorys, 'end'), color('文件数量 ', 'blue', 'bold', files, 'end'));
        console.log (color('italic', date (), 'end'));
    },


    /**
     * 拷贝文件日志
     * @param {String} src 资源路径
     */
    copylog: function (src) {
        console.log (color('blue', 'bold', '拷贝文件', 'end', 'blue', ' "' + src + '"', 'end'));
    },

    /**
     * 打包文件日志
     * @param {String} src 资源路径
     */
    buildlog: function (src) {
        console.log (color('green', 'bold', '打包文件', 'end', 'green', ' "' + src + '"', 'end'));
    },

    /**
     * 创建目录日志
     * @param {String} dir 目录路径
     */
    mkdirlog: function (dir) {
        console.log (color('cyan', 'bold', '创建目录', 'end', 'cyan', ' "' + dir + '"', 'end'));
    },

    /**
     * 清理目录日志
     */
    emptydirlog: function (dir) {
        console.log (color('purple', 'bold', '清空目录', 'end', 'purple', ' "' + dir + '"', 'end'));
    },

    /**
     * 忽略扩展日志
     */
    ignoreextensionlog: function (src) {
        console.log (color('purple', 'bold', '忽略后缀', 'end', 'purple', ' "' + src + '"', 'end'));
    },

    /**
     * 忽略日志
     */
    ignorelog: function (src) {
        console.log (color('purple', 'bold', '忽略地址', 'end', 'purple', ' "' + src + '"', 'end'));
    },

};


// 生成一个版本号
var dates = new Date ();
var times = [
    dates.getFullYear (),// 年
    dates.getMonth ()+1,// 月
    dates.getDate (),// 日
    dates.getHours (),// 时
    dates.getMinutes (),// 分
    dates.getSeconds (), //秒
    dates.getMilliseconds () //毫秒
];
helper.version = times.join ('');


/**
 * 获取根目录
 */
// __dirname
var modulePaths = module.path.split (/\\|\//g);
// ['...', 'framework', 'script']
modulePaths.pop ();
modulePaths.pop ();// 要从最后出栈两次才到根目录
helper.__rootname = path.join.apply (path, modulePaths);
helper.__libraryname = path.join.apply (path, [helper.__rootname, 'library']);
helper.__srcname = path.join.apply (path, [helper.__rootname, 'src']);
helper.__scriptname = module.path;


/**
 * 创建dist目录名称
 * @param {String|null} name 自定义名称
 */
helper.createDistname = function (name) {
    if (typeof name !== 'string' || name === '') {
        name = 'dist';
    }
    helper.__distname = path.join.apply (path, [helper.__rootname, name]);
};


/**
 * 提供特定于平台的路径片段分隔符
 * @var {String}
 */
helper.pathSep = path.sep;
helper.pathParse = path.parse;

/**
 * 获取目录路径
 * --------------
 * 单级路径 /src
 * path ('src')
 * 多级路径 /src/test/home.js
 * path ('src', 'test', 'home')
 * 支持分隔符
 * path ('src/test', 'home')
 * @param {String|null} ...dirname 
 * @return {String}
 */
helper.path = function () {
    if (arguments.length) {
        // 拼凑数据
        var dirnames = [helper.__rootname];
        for (var i=0; i < arguments.length; i++) {
            // 必须是字符串
            if (typeof arguments[i] !== 'string') {
                continue;
            }
            // 分割
            var args = arguments[i].split (/\\|\//g);
            // 合并
            dirnames = dirnames.concat (args);
        }
        return path.join.apply (path, dirnames);
    } else {
        return helper.__rootname;
    }
};


/**
 * 拼接地址信息
 */
helper.pathJoin = function () {
    if (arguments.length) {
        // 拼凑数据
        var dirnames = [];
        for (var i=0; i < arguments.length; i++) {
            // 必须是字符串
            if (typeof arguments[i] !== 'string') {
                continue;
            }
            // 分割
            var args = arguments[i].split (/\\|\//g);
            // 合并
            dirnames = dirnames.concat (args);
        }
        return path.join.apply (path, dirnames);
    } else {
        return '';
    }
};


/**
 * 同步[非递归]获取目录中的路径
 * @param {String}  dir 目录
 * @param {Boolean} isRecursion 是否递归获取所有，也就是包括子目录的路径
 * @param {Function} callback 回调，(fullpath, stat)
 */
helper.readdir = function (dir, isRecursion, callback) {
    var dirs = [dir];
    while (dirs.length) {
        var dir = dirs.pop ();
        try {
            var readdirs = fs.readdirSync (dir);
            if (!readdirs.length) {
                continue;
            }
        } catch (error) {
            // 忽略错误
            continue;
        }

        readdirs.forEach (function (item) {
            var fullpath = path.join (dir, item);// 连接、拼凑完整路径
            var stat = fs.statSync (fullpath);
            // 如果是目录则递归
            if (stat.isDirectory () === true) {
                if (typeof callback == 'function') {
                    callback (fullpath, stat);
                }
                
                // 如果是递归全部则添加
                if (isRecursion) {
                    dirs.push (fullpath);
                }
            }
            else if (stat.isFile () === true) {
                if (typeof callback == 'function') {
                    callback (fullpath, stat);
                }
            }
        });

    } // while (dirs.length) end
    
};


/**
 * 删除指定目录下所有子文件
 * @param {String} dir 目录
 */
helper.emptydir = function (dir) {
    helper.readdir (dir, true, function (fullpath, stat) {
        if (stat.isDirectory ()) {
            helper.emptydir (fullpath);
            // 删除空目录
            fs.rmdirSync (fullpath);
        } else {
            fs.unlinkSync (fullpath);
        }
    });
};

/**
 * 判断路径是否存在
 * @param {String} p 路径地址
 */
helper.pathExists = function (p) {
    return fs.existsSync (p);
};


/**
 * 获取路径Stat
 * @param {String} p 路径地址
 */
helper.pathStat = function (p) {
    return fs.statSync (p);
};

/**
 * 获取文件后缀
 */
helper.extname = function (p) {
    return path.extname (p);
};


/**
 * 显示执行时间
 * @param {Number} runtime
 */
helper.runtime = function (runtime) {
    // 小于等于1000表示毫秒
    if (runtime <= 1000) {
        return runtime + " ms";
    }
    // 否则显示秒
    else if (runtime <= 60000) {
        return (runtime/1000) + " s";
    } 
    // 否则显示分钟
    else {
        return ((runtime/1000)/60) + " min";
    }
};


function date () {
    var weeks = ['天','一','二','三','四','五','六'];
    var myTime = new Date ();
    var year = myTime.getFullYear ();
    var month = myTime.getMonth () + 1;
    var day = myTime.getDate ();
    var week = myTime.getDay ();
    var hours = myTime.getHours ();
    var minutes = myTime.getMinutes ();
    var seconds = myTime.getSeconds ();
    return year + '年' + month + '月' + day + '日 星期' + weeks[week]+hours+'时'+minutes+'分'+seconds+'秒';
}


/**
 * 创建目录  
 * mode 默认 0777
 */
helper.mkdir = function (dir, mode) {
    return fs.mkdirSync (dir, mode);
};


/**
 * 拷贝文件
 * @param {String} src 要被拷贝的源文件名称
 * @param {String} dest 拷贝操作的目标文件名
 * @param {Boolean} isCopyfileExcl 如果 dest 文件存在，操作将失败。
 */
helper.copyFile = function (src, dest, isCopyfileExcl) {
    // 默认情况下，dest 将创建或覆盖
    var flags = 0;// 拷贝操作修饰符 默认: 0
    if (isCopyfileExcl) {
        flags = fs.constants.COPYFILE_EXCL;
    }
    return fs.copyFileSync (src, dest, flags);
};


/**
 * 读取整个文件的内容
 * @param {String} filename 文件内容
 * @param {Object} options 选项
 */
helper.getFileContents = function (filename, options) {
    if (!options || typeof options != 'object') {
        options = {
            encoding: 'utf8'
        };
    }
    return fs.readFileSync (filename, options);
};


/**
 * 写入文件的内容
 * @param {String} filename 
 * @param {String} contents 内容 
 * @param {Object} options 选项
 */
helper.setFileContents = function (filename, contents, options) {
    if (!options || typeof options != 'object') {
        options = {
            encoding: 'utf8'
        };
    }
    return fs.writeFileSync (filename, contents, options);
};



/**
 * 将src路径转换为dist路径
 * @param {String} srcname
 */
helper.srcToDist = function (srcname) {
    return srcname.replace (helper.__srcname, helper.__distname);
};

/**
 * 将/library/...路径转换为dist/library/...路径
 * @param {String} srcname
 */
helper.libraryToDist = function (libraryname) {
    return libraryname.replace (helper.__rootname, helper.__distname);
};


/**
 * 将dist路径转换为url
 * @param {String} distname
 */
// helper.distToUrl = function (distname) {
//     return distname.replace (helper.__distname, '').replace (/\\/g, '/');
// };


/**
 * js代码压缩
 * @param {String} code
 * @param {Object} options 选项
 */
helper.uglifyjs = function (code, options) {
    // {
    //     warnings: true,
    //     mangle: true,
    //     ie: true,
    //     webkit: true,
    // }
    return uglifyjs.minify(code, options);
};

/**
 * html代码压缩
 * @param {String} code
 * @param {Object} options 选项
 */
helper.minifyhtml = function (code, options) {
    // {
    //     caseSensitive: true,// 以区分大小写的方式处理属性（对于自定义 HTML 标记很有用）
    //     collapseWhitespace: true, // 删除html里的空格 达到html的压缩
    //     // removeAttributeQuotes: true, // 尽可能删除html标签里的双引号 达到html的压缩
    //     removeComments: true, // 删除html中的注释
    //     removeCommentsFromCDATA: true, // 从脚本和样式删除的注释
    //     minifyCSS: true, // 压缩css
    // }
    return minify (code, options);
};

/**
 * css代码压缩
 * @param {String} code
 */
helper.minifycss = function (code) {
    return cssmin (code);
};

module.exports = helper;