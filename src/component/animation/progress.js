webpanda.data ({
    name: 'component://animation/progress',
    selector: 'body',
    template: {
        src: webpanda.src ('component/animation/progress.html')
    },
    onpageprogress: function (e) {
        this.percent = e.percent;
        if (100 == this.percent) {
            // 中间圆圈和文字立即关闭
            this.firstShow = false;
            // this.show = false;
            // 顶部读条渲染的太快了，给一个超时器，稍微等待一点
            var that = this;
            webpanda.timer (function () {
                that.show = false;
            }).timeout (150).start ();
        } else {
            this.show = true;
        }  
    },
    construct: function () {
        // var that = webpanda.data.this;
        // console.log('construct', that.$.name, that);
        
        this.loaded = 0;
        this.total = 0;
        this.percent = 0;
        this.show = false;
        this.background = '#2d8cf0';
        this.percentColor = '#2d8cf0';

        // this.background = '#dc3545';
        // this.percentColor = '#dc3545';
        
        // 如果是第一次渲染，那么显示中间动画
        this.firstShow = true;
       
    },

});
