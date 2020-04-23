self.addEventListener('install', e => {
    e.waitUntil(
        caches.open('v2').then(cache => {
            console.log('CACHING')
            return cache.addAll([
                '/',
                '/login',
                '/demo',
                '/user',
                '/user/account',
                '/index.html',
                '/favicon.ico',

                // '/manifest.json',
                // '/icon192.png',
                // '/icon512.png',
                
                '/css/app.css',
                '/js/app.js',
                '/js/chunk-vendors.js',
                '/img/checklist_light.png',
                '/img/landing_page_light.png',
                '/img/landing_page_dark.png',
                

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
                if(response !== undefined){
                    return response
                }
            })
        })
    )
})