self.addEventListener('install', e => {
    e.waitUntil(
        caches.open('v3').then(cache => {
            console.log('CACHING')
            return cache.addAll([
                '/',
                '/login',
                '/demo',
                '/user',
                '/user/account',
                '/user/checklist',
                '/index.html',
                '/favicon.ico',
 
                '/css/app.css',
                '/js/app.js',
                '/js/chunk-vendors.js',
                '/img/checklist_light.png',
                '/img/landing_page_light.png',
                '/img/landing_page_dark.png',

                '/fonts/RobotoCondensed-Regular.ttf',
                '/fonts/useRoboto.css',
                '/fonts/MaterialIcons-Regular.ttf',
                '/fonts/useIcons.css',

                '/manifest.json',
                '/icon192.png',
                '/icon512.png',
            ])
        }).catch(e => console.log(e))
    )
})



// follows a network falling back to cache model -> should probably use a cache then network model in the future
// but this works for now
self.addEventListener('fetch', e => {
    let url = e.request.url;
    let baseUrl = url.match(/htt.+\:\/\/.+?\//)[0];

    // if baseUrl has a trailing /, remove it
    if(baseUrl.lastIndexOf('/') === baseUrl.length - 1){ 
        baseUrl = baseUrl.slice(0, baseUrl.lastIndexOf('/'))
    }
    
    // the following if statements fix an issue where if the user refreshes the page on /user/account, or inside a checklist
    // the fetch url tries to fetch the manifest, fonts, etc from /user/account/fonts/,etc instead of the root folder
    if(url.includes('manifest.json')){
        url = `${baseUrl}/manifest.json`
    }
    if(url.includes('icon512.png')){
        url = `${baseUrl}/icon512.png`
    }
    if(url.includes('icon192.png')){
        url = `${baseUrl}/icon192.png`
    }


    if(url.includes('/fonts/MaterialIcons-Regular.ttf')){
        url = `${baseUrl}/fonts/MaterialIcons-Regular.ttf`
    }
    if(url.includes('/fonts/RobotoCondensed-Regular.ttf')){
        url = `${baseUrl}/fonts/RobotoCondensed-Regular.ttf`
    }
    if(url.includes('useIcons.css')){
        url = `${baseUrl}/fonts/useIcons.css`
    }
    if(url.includes('useRoboto.css')){
        url = `${baseUrl}/fonts/useRoboto.css`
    }
    
    // if the request is an API call then don't modify it, otherwise return a new request using updated url
    let request = e.request.url.includes('/api/') ? e.request : new Request(url, {...e.request, url});

    e.respondWith(
        fetch(request).then(response => {

            caches.open('v3').then(cache => {

                if(!/\/user\/checklist\/\d+/.test(url)){
                    cache.put(request, response);
                }
                
            })

            return response.clone();
        }).catch(err => {
            
            // if the user is inside a checklist and refreshes, serve them the /user/checklist/ cached route

            // because checklist urls contain dynamic numbers, it is not practical to cache them all -> instead
            // check to see if the request url is the checklist route, and if it is serve them the static route
            if(/\/user\/checklist\/\d+/.test(url)){
                return caches.match(`${baseUrl}/user/checklist/`).then(returnIfDefined)
            }

            return caches.match(url).then(returnIfDefined);
        })
    )
})

function returnIfDefined(response){
    if(response !== undefined){
        return response;
    }
}