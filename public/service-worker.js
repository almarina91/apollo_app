let cacheData = "appV1";

//set the files to cache
this.addEventListener("install", (event)=>{
    event.waitUntil(
        caches.open(cacheData).then((cache)=> {
            cache.addAll([
                '/static/js/main.chunk.js',
                '/static/js/0.chunk.js',
                '/static/js/bundle.js',
                '/index.html',
                '/',
                '/static/media/1.d5f26e68.webp',
                '/static/media/2.fb7a6bc8.webp',
                '/static/media/3.f83504c0.webp',
                '/static/media/4.4440535e.webp',
                '/static/media/5.69b38e1d.webp',
                '/static/media/6.6970d1d4.webp'
            ])
        })
    )
})
//get the data from server or cache
this.addEventListener("fetch", (event)=> {
    //check if you're online, if so, get the data from server, otherwise from cache
    if(!navigator.online) {
        event.respondWith(
            caches.match(event.request).then((resp)=>{
                if(resp) {
                    return resp;
                }
            })
        )
    }

})