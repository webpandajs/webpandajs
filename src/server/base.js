webpanda.data ({
    abstract: true,
    name: 'server://base',
    // 挂载
    mount: [
        // 加载数据工程
        webpanda.require ('component://animation/loading', {
            use: 'Loading'
        }),
    ],
    // 成员属性
    prototype: function () {
        var that = webpanda.data.this;

        // 接口URL
        this.url = '';
        // 请求方式
        this.method = 'GET';
        // 选项, 设置异步请求、响应数据类型为JSON
        this.async = true;
        // 响应类型: text|xml|json
        this.responseType = 'json';
        // 请求参数
        this.body = {};
        // 请求头
        this.header = {'Content-Type' : 'application/x-www-form-urlencoded;charset=UTF-8'};
        // 超时时间
        this.timeout = 30000;
        // 是否跨域
        this.withCredentials = true;
        
        /**
         * AJAX 请求
         * @param {Object} config 配置
         * @param {Object} config.body 请求body 
         * @param {Boolean} config.isFormData 是否使用 FormData 格式
         * @param {Boolean} config.isLoading 是否使用加载动画
         * @param {Function} config.onprogress 上传进度事件
         * @param {Function} config.onrequest 发送请求前执行事件
         * @param {Function} config.onresponse 完成事件
         * @param {Function} config.onerror 出错事件
         * @param {Function} config.onsuccess 成功事件
         * @param {Function} config.onfinally 无论出错还是成功都要执行的事件, 在成功或者失败事件之后执行
         * @return {webpanda.ajax}
         */
        this.ajax = function (config) {
            if (!config || typeof config != 'object') {
                config = new Object ();
            }
            
            // 是否使用加载动画
            if (config.isLoading) {
                that.Loading.open ();
            }
            
            // 判断是否存在请求数据、合并
            var body = {};
            for (var i in that.body) {
                body[i] = that.body[i];
            }

            if (config.body && typeof config.body == 'object') {
                for (var i in config.body) {
                    body[i] = config.body[i];
                }
            }

            // 是否使用 FormData 格式
            if (config.isFormData) {
                body = that.toFormData (body);
            }

            var ajax = new webpanda.mount.Ajax ({
                url: that.url,
                body: body,
                header: that.header,
                method: that.method,
                async: that.async,
                responseType: that.responseType,
                // 设置超时时间，毫秒
                timeout: that.timeout,
                // 发送请求前执行事件
                onrequest: function (XMLHttpRequest) {
                
                    // 是否跨域
                    if (that.withCredentials) {
                        XMLHttpRequest.withCredentials = true;
                    }
                    
                    if (typeof config.onprogress =='function' && XMLHttpRequest.upload) {
                        XMLHttpRequest.upload.onprogress = function (e) {
                            if (e.lengthComputable) {
                                var loaded = e.loaded; 
                                var total = e.total;
                                var percent = Math.floor (100 * loaded / total); 
                                config.onprogress (percent, loaded, total);
                            }
                        };

                    }

                    if (typeof config.onrequest == 'function') {
                        config.onrequest.call (this, XMLHttpRequest);
                    }

                },
                // 完成事件
                onresponse: function (result) {
                    if (config.isLoading) {
                        // 关闭加载动画
                        that.Loading.close ();
                    }

                    if (typeof config.onresponse == 'function') {
                        config.onresponse.call (this, result);
                    }
                },
                // 出错事件
                onerror: function (result) {
                    result.onerror = true;
                    if (typeof config.onerror == 'function') {
                        config.onerror.call (this, result);
                    }
                    if (typeof config.onfinally == 'function') {
                        config.onfinally.call (this, result);
                    }
                },
                // 成功事件
                onsuccess: function (result) {
                    result.onsuccess = true;
                    if (typeof config.onsuccess == 'function') {
                        config.onsuccess.call (this, result);
                    }
                    if (typeof config.onfinally == 'function') {
                        config.onfinally.call (this, result);
                    }
                },
            });
            
            return ajax.send ();
        };



        /**
         * 将关联数组和对象生成 FormData 键值对结构[!<=IE9]
         * @param {Object} obj 
         */
        this.toKeyValue = function (obj) {
            var arr = new Array ();
            if (typeof obj != 'object') {
                return arr;
            }

            for (var i in obj) {
                // 防止死循环
                if (!obj.hasOwnProperty (i) || obj[i] === obj) {
                    continue;
                }

                var child = this.getChildFormData (obj[i]);
                for (var j in child) {
                    arr.push ({
                        key: i + child[j].key,
                        value: child[j].value
                    });
                }
            }

            return arr;
        };


        this.getChildFormData = function (data) {
            var arr = new Array ();
            if (data && typeof data == 'object') {
                for (var i in data) {
                    // 防止死循环
                    if (!data.hasOwnProperty (i) || data[i] === data) {
                        continue;
                    }
                    var child = this.getChildFormData (data[i]);
                    for (var j in child) {
                        arr.push({
                            key: '[' + i + ']' + child[j].key,
                            value: child[j].value
                        });
                    }
                }
            } else {
                arr.push ({
                    key: '',
                    value: data
                });
            }
            return arr;
        };


        /**
         * 将对象转换为 FormData 数据格式
         * @param {Object} data
         * @return {FormData}
         */
        this.toFormData = function (data) {
            var formDataObject = new FormData ();
            var forms = this.toKeyValue (data);
            if (forms && forms.length) {
                for (var i = 0; i < forms.length; i ++) {
                    formDataObject.append (forms[i].key, forms[i].value);
                }
            }
            return formDataObject;
        };





    }




});