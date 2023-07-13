webpanda.data ({
    name: 'component://page/footer',
    template: {
        src: webpanda.src ('component/page/footer.html'),
    },
    mount: [
        webpanda.require ('component://readme', {
            use: 'Readme'
        }),
    ],
});