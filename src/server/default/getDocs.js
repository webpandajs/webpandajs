webpanda.data ({
    name: 'server://default/getDocs',
    extend: webpanda.env.require ('server://base'),
    prototype: function () {
        this.url = '/README.md';
        this.method = 'GET';
        this.withCredentials = false;
        this.responseType = 'text';
    },
    
});