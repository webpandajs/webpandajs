webpanda.data ({
    name: 'component://page/footer',
    template: {
        src: webpanda.env.src ('component/page/footer.html'),
    },
    mount: [
        webpanda.env.require ('component://readme', {
            use: 'Readme'
        }),
    ],
});