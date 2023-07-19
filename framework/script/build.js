const process = require('process');
const helper = require('./helper');
const copyright = require('./copyright');
const config = require(helper.path ('webpanda.config.js'));

// 创建dist目录名称
helper.createDistname (config.dist||null);

// 打印路径
helper.console.configlog ('root', helper.__rootname);
helper.console.configlog ('library', helper.__libraryname);
helper.console.configlog ('src', helper.__srcname);
helper.console.configlog ('dist', helper.__distname);

// 统计信息
var statistics = {
    files: 0,
    directorys: 0,
    startTime: Date.now (),// 开始时间
    endTime: 0,// 结束时间
};

// 判断打包发布路径是否存在
if (helper.pathExists (helper.__distname)) {
    
    try {
        var distStat = helper.pathStat (helper.__distname);
    } catch (err) {
        helper.console.error ('"' + helper.__distname + '" 发布目录信息获取失败', err);
        return process.exit();
    }

    // 路径存在，如果不是目录则抛出错误
    if (!distStat.isDirectory ()) {
        helper.console.error ('"' + helper.__distname + '" 不是一个目录, 移除该文件之后重试');
        return process.exit();
    }

    // 清空发布目录
    try {
        helper.emptydir (helper.__distname);
        helper.console.emptydirlog (helper.__distname);
    } catch (err) {
        helper.console.error ('"' + helper.__distname + '" 发布目录清理失败', err);
    }

} else {
    // 创建发布目录
    try {
        helper.mkdir (helper.__distname);
        helper.console.mkdirlog (helper.__distname);
    } catch (err) {
        helper.console.error ('"' + helper.__distname + '" 发布目录创建失败', err);
        return process.exit();
    }
}


// 忽略地址
var ignorePath = new Array ();
if (config.ignore && config.ignore.path instanceof Array) {
    // 格式化拷贝配置
    for (var i = 0; i < config.ignore.path.length; i ++) {
        if (typeof config.ignore.path[i] == 'string') {
            var iexc = config.ignore.path[i].trim ();
            if (iexc !== '') {
                ignorePath.push (helper.path (iexc));
            }
        }
    }
}
helper.console.configlog ('ignore.path', ignorePath);

// 忽略扩展名
var ignoreExtension = new Object ();
if (config.ignore && typeof config.ignore.extension == 'object') {
    for (var dir in config.ignore.extension) {
        var folder = dir.trim ().toLowerCase ();
        if ('' === folder) {
            continue;
        }
        ignoreExtension[folder] = new Array ();
        if (config.ignore.extension[dir] instanceof Array) {
            var extensionDir = config.ignore.extension[dir];
            for (var i = 0; i < extensionDir.length; i ++) {
                if (typeof extensionDir[i] == 'string') {
                    var ext = extensionDir[i].trim ().toLowerCase ();
                    if (ext !== '') {
                        ignoreExtension[folder].push (ext);
                    }
                }
            } // for (var i = 0; i < extensionDir.length; i ++) end
        } // if (config.ignore.extension[dir] instanceof Array) end
    } // for (var dir in config.ignore.extension) end
} // if (config.ignore && typeof config.ignore.extension == 'object') end
helper.console.configlog ('ignore.extension', ignoreExtension);


// 压缩配置: 不压缩的列表
var minifyExclude = new Array ();
if (config.minify && config.minify.exclude instanceof Array) {
    // 格式化拷贝配置
    for (var i = 0; i < config.minify.exclude.length; i ++) {
        if (typeof config.minify.exclude[i] == 'string') {
            var mec = config.minify.exclude[i].trim ();
            if (mec !== '') {
                minifyExclude.push (helper.path (mec));
            }
        }
    }
}
helper.console.configlog ('minify.exclude', minifyExclude);


var htmlminifierOptions = {};
if (config.minify && config.minify.htmlminifier) {
    htmlminifierOptions = config.minify.htmlminifier.options || {};
}
helper.console.configlog ('minify.htmlminifier.options', htmlminifierOptions);

var uglifyjsOptions = {};
if (config.minify && config.minify.uglifyjs) {
    uglifyjsOptions = config.minify.uglifyjs.options || {};
}
helper.console.configlog ('minify.uglifyjs.options', uglifyjsOptions);


/**
 * 移动index.html
 */
try {
    // 获取index.html
    var builderIndexfile = config.index||'index.html';
    var builderIndexPath = helper.path (builderIndexfile);
    helper.console.configlog ('index', builderIndexPath);
    var builderIndexContents = helper.getFileContents (builderIndexPath);

    /**
     * 来源src="/src/都要加版本号，并且清理query
     * 例如相关文件 src="/src/main.js" | src="/src/router.js"
     */
    builderIndexContents = builderIndexContents.replace (/src\=[\"\']\/([^\"\']+)\.js([^\"\']{0,})[\"\']/gi, 'src="/$1.js?version=' + helper.version + '"');
    // 替换src="/src/
    builderIndexContents = builderIndexContents.replace (/src\=\"\/src\//g, 'src="/').replace (/href\=\"\/src\//g, 'href="/');
    
    // 拼凑拷贝的构建路径
    var builderIndexDistPath = helper.pathJoin (helper.__distname, builderIndexfile);
    helper.setFileContents (builderIndexDistPath, helper.minifyhtml (builderIndexContents, htmlminifierOptions));
    helper.console.buildlog (builderIndexDistPath);
} catch (err) {
    helper.console.error ('构建index.html失败', err);
    return process.exit();
}

// 获取入口文件的绝对路径
var builderMainPath = helper.path (config.main||'src/main.js');
helper.console.configlog ('main', builderMainPath);


/**
 * 移动root文件
 */
if (config.root && config.root instanceof Array) {
    for (var i = 0; i < config.root.length; i ++) {

        /**
         * @type {String}
         */
        var builderRootFile = config.root[i];
        if (typeof builderRootFile !== 'string' || builderRootFile === '') {
            continue;
        }
        
        try {
            var builderRootDistPath = helper.pathJoin (helper.__distname, builderRootFile);
            helper.copyFile (helper.path (builderRootFile), builderRootDistPath, true);
            helper.console.copylog (builderRootDistPath);
        } catch (err) {
            helper.console.error ('拷贝root文件失败', err);
            return process.exit();
        }
    }
}




/**
 * 是否需要压缩
 * @param {String} srcPath 源地址
 * @return {Boolean} 如果要压缩则返回true,否则不压缩
 */
function isMinify (srcPath) {
    for (var i = 0; i < minifyExclude.length; i ++) {
        var path = minifyExclude[i];
        if (srcPath.indexOf (path) > -1) {
            return false;
        }
    }
    // 上面的不压缩列表每找到，那么说明要压缩
    return true;
};

/**
 * 是否忽略
 * @param {String} sourcePath 源地址
 * @return {Boolean} 如果要忽略则返回true,否则不忽略
 */
function isIgnorePath (sourcePath) {
    for (var i = 0; i < ignorePath.length; i ++) {
        var path = ignorePath[i];
        if (sourcePath.indexOf (path) > -1) {
            return true;
        }
    }
    // 上面没有找到说明不忽略
    return false;
}


/**
 * 是否扩展名称
 * @param {String} folder 所属文件夹: src、library
 * @param {String} extension 扩展名称
 * @return {Boolean} 如果要忽略则返回true,否则不忽略
 */
function isIgnoreExtension (folder, extension) {
    if (typeof ignoreExtension[folder] === 'undefined') {
        return false;// 不存在说明不忽略
    }

    // 找到了表示忽略
    if (ignoreExtension[folder].indexOf (extension) > -1) {
        return true;
    } else {
        return false;// 没有找到说明不忽略
    }

}


try {
    // 发布
    helper.readdir (helper.__srcname, true, function (srcPath, stat) {
        // 是否忽略地址
        if (isIgnorePath (srcPath)) {
            helper.console.ignorelog (srcPath);
            return;
        }

        // 判断是否为文件还是目录
        if (stat.isFile ()) {
            // 获取扩展名
            var extname = helper.extname (srcPath).toLowerCase ();
            // 判断是否忽略扩展名
            if (isIgnoreExtension ('src', extname)) {
                helper.console.ignoreextensionlog (srcPath);
                return;
            }
            
            // 添加统计信息
            statistics.files ++;

            // 获取发布地址
            var distPath = helper.srcToDist (srcPath);
            // 如果不是js、或者是minifyUnaffected路径前缀则直接拷贝
            if ((extname !== '.js' && extname !== '.html' && extname !== '.css') || !isMinify (srcPath)) {
                helper.copyFile (srcPath, distPath, true);
                helper.console.copylog (distPath);
                return;
            }
            
            // 获取原内容
            var originContents = helper.getFileContents (srcPath);
            if (extname === '.js') {
                var uglifyjs = helper.uglifyjs (originContents, uglifyjsOptions);
                // 判断是否为配置文件，那么在前面加上构建信息
                if (srcPath === builderMainPath) {
                    uglifyjs.code = 'webpanda.mount.__builder={version:"' + helper.version + '",src:"/"};' + uglifyjs.code;
                } 
                var minify = copyright + uglifyjs.code;
            } 
            else if (extname === '.css') {
                // css 文件压缩
                var minify = helper.minifycss (originContents);
            }
            else {
                // 否则就是html了
                var minify = helper.minifyhtml (originContents, htmlminifierOptions);
            }
            
            // 写入到文件
            helper.setFileContents (distPath, minify);
            helper.console.buildlog (distPath);
        } else {
            // 添加统计信息
            statistics.directorys ++;
            // 创建目录
            var distPath = helper.srcToDist (srcPath);
            helper.mkdir (distPath);
            helper.console.mkdirlog (distPath);
        }
        // console.log (srcPath, stat.isFile ());
    });
} catch (err) {
    helper.console.error ('发布失败', err);
    return process.exit();
}

try {
    // 创建发布的库目录
    var distPath = helper.libraryToDist (helper.__libraryname);
    helper.mkdir (distPath);
    helper.console.mkdirlog (distPath);
    
    // 拷贝库代码
    helper.readdir (helper.__libraryname, true, function (libraryPath, stat) {
        // 是否忽略地址
        if (isIgnorePath (libraryPath)) {
            helper.console.ignorelog (libraryPath);
            return;
        }

        // 判断是否为文件还是目录
        if (stat.isFile ()) {
            // 获取扩展名
            var extname = helper.extname (libraryPath).toLowerCase ();
            // 判断是否忽略扩展名
            if (isIgnoreExtension ('library', extname)) {
                helper.console.ignoreextensionlog (libraryPath);
                return;
            }

            // 添加统计信息
            statistics.files ++;

            // 获取发布地址
            var distPath = helper.libraryToDist (libraryPath);
            helper.copyFile (libraryPath, distPath, true);
            helper.console.copylog (distPath);

        } else {
            // 添加统计信息
            statistics.directorys ++;
            // 创建目录
            var distPath = helper.libraryToDist (libraryPath);
            helper.mkdir (distPath);
            helper.console.mkdirlog (distPath);
        }
    });

} catch (err) {
    helper.console.error ('拷贝库代码失败', err);
    return process.exit();
}


// 获取结束时间
statistics.endTime = Date.now ();

console.log ('\r\n');
helper.console.buildsuccess ((statistics.endTime - statistics.startTime), statistics.directorys, statistics.files);
return process.exit();



