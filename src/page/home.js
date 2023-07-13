webpanda.data ({
    name: 'page://home',
    selector: 'body',
    template: {
        src: webpanda.env.src ('page/home.html'),
    },
    mount: [
        webpanda.env.require ('component://docs', {
            use: 'Docs'
        }),
        webpanda.env.require ('component://readme', {
            use: 'Readme'
        }),
        webpanda.env.require ('component://page/footer', {
            use: 'Footer',
            tag: true
        }),
    ],
    include: [
        
        /**
         * 模板样式:
         * https://www.bootmb.com/themes/boomerang/
         */
        webpanda.env.src ('assets/css/theme.css'),
        webpanda.env.src ('assets/css/demo.css'),
        
        /**
         * prism 代码高亮
         * https://prismjs.com/
         */
        webpanda.env.library ('prism/prism.css'),
        webpanda.env.library ('prism/prism.js'),

        webpanda.env.src ('assets/css/index.css'),
    ],
    onexecute: function (e) {
        console.log (this.$.name, 'onexecute');
        // 加载文档
        this.Docs.load ();
    },
    construct: function () {
        this.sidebarToggled = false;
        this.navigation = null;
    },
    prototype: function () {
       
        /**
         * 插件
         * @param {HTMLElement} parentNode 父级节点对象
         */
        this.plugin = function (parentNode) {
            // 代码高亮
            var nodeList = parentNode.querySelectorAll ('pre>code');
            for (var i = 0; i < nodeList.length; i++) {
                nodeList[i].highlightStatus = true;
                Prism.highlightElement (nodeList[i]);
            }

            // 设置a标签的跳转属性
            var targets = parentNode.querySelectorAll ('a');
            for (var i = 0; i < targets.length; i ++) {
                var target = targets[i].getAttribute ('target');
                if (!target) {
                    targets[i].setAttribute ('target', '_blank');
                }
                
            }
        };


        /**
         * 创建导航
         * @param {HTMLElement} parentNode 父级节点对象
         */
        this.createNavigation = function (parentNode) {
            var navigation = new Array ();
            // 先获取子节点
            var nodeList = parentNode.querySelectorAll ('h1,h2,h3,h4,h5,h6');
            if (nodeList && nodeList.length) {
                for (var i = 0; i < nodeList.length; i++) {
                    var node = nodeList[i];
                    var obj = {
                        id: node.nodeName + '-' + i,
                        anchor: webpanda.URLEncode (node.nodeName + '-' + i + '-' + node.innerHTML),
                        title: node.innerHTML,
                        serial: node.nodeName,
                        level: parseInt (node.nodeName.toLowerCase ().replace ('h','')),
                        node: node,
                    };

                    // 设置ID锚点
                    node.setAttribute('id', obj.anchor);
                    navigation.push (obj);
                }
            }

            this.navigation = webpanda.observer.disable(navigation);
            // console.log (123, this.navigation);
        };





    }

});