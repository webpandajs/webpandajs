webpanda.data ({
    name: 'component://docs',
    mount: [
        webpanda.require ('server://default/getDocs', {
            use: 'Request'
        }),
    ],
    include: [
        webpanda.library ('marked/marked.min.js'),
    ],
    construct: function () {
        // 加载状态
        this.loading = true;
        // 数据
        this.data = null;
        // 错误信息
        this.error = null;
    },
    prototype: function () {

        /**
         * 加载数据
         */
        this.load = function () {
            
            var dates = new Date ();
            var times = [
                dates.getFullYear (),// 年
                dates.getMonth ()+1,// 月
                dates.getDate (),// 日
                dates.getHours (),// 时
                // dates.getMinutes (),// 分
                // dates.getSeconds (), //秒
                // dates.getMilliseconds () //毫秒
            ];
            
            // 缓存一天
            var query = {
                d: times.join ('')
            }

            this.loading = true;
            this.error = null;
            this.data = null;
            this.Request.ajax ({
                query: query,
                isLoading: false,
                onsuccess: this.requestsuccess,
                onerror: this.requesterror
            });
        };

        /**
         * 成功时
         */
        this.requestsuccess = function (ret) {
            // console.log ('requestsuccess', ret);
            // this.data = ret;
            this.data = marked (ret.data);
            // 加载状态完成
            this.loading = false;
        };


        /**
         * 失败时
         */
        this.requesterror = function (err) {
            console.log ('requesterror', err);
            this.error = err;
            // 加载状态完成
            this.loading = false;
        };


    }
});