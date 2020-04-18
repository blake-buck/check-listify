self.addEventListener('install', e => {
    e.waitUntil(
        caches.open('v1').then(cache => {
            return cache.addAll([
                '/',
                '/index.html',
                '/favicon.ico',
                
                '/css/app.925a991d.css',
                '/js/app.5bf1d475.js',
                '/js/chunk-vendors.57d69925.js',
                '/img/checklist_light.43267f33.png',
                '/img/landing_page_light.baddfee8.png',
                '/img/landing_page_dark.feb9e14b.png',

                'https://fonts.gstatic.com/s/robotocondensed/v18/ieVl2ZhZI2eCN5jzbjEETS9weq8-19K7DQ.woff2',
            ])
        }).catch(e => console.log(e))
    )
})

// follows a network falling back to cache model -> should probably use a cache then network model in the future
// but this works for now
self.addEventListener('fetch', e => {
    e.respondWith(
        fetch(e.request).then(response => {
            return response;
        }).catch(err => {
            return caches.match(e.request).then(response => {
                return response
            })
        })
    )
})