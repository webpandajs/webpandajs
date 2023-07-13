webpanda.data ({
    name: 'component://animation/loading',
    selector: 'body',
    // 模板
    template: {
        src: webpanda.src ('component/animation/loading.html')
    },
    construct: {
        show: false,
        text: null,
    },
    prototype: function () {
        var that = webpanda.data.this;
        
        // 计时器
        this.timer = null;

        /**
         * 打开
         * @param {Number} triggeredTime 触发时间
         */
        this.open = function (triggeredTime) {
            this.$.render ();

            // 存在超时器则立即关闭
            if (this.timer) {
                this.timer.stop ();
            }

            // 如果存在触发时间，则创建一个计时器
            if (triggeredTime) {
                that._.timer = webpanda.timer (function() {
                    that.show = true;
                }, true).timeout (triggeredTime).start ();
            } else {
                // 否则立即显示
                this.show = true;
            } 
        };

        /**
         * 设置进度文本
         */
        this.progress = function (text) {
            this.text = text;
        };

        /**
         * 停止时
         */
        this.close = function () {
            // 存在超时器则立即关闭
            if (this.timer) {
                this.timer.stop ();
            }
            that.text = null;
            // 不显示
            that.show = false;
        }

    }


});
