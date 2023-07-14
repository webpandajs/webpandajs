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
            this.loading = true;
            this.error = null;
            this.data = null;
            this.Request.ajax ({
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