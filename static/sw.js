var CACHE_NAME = 'mfblog-v5';

self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll([
        '/',
        '/2017/01/02/starting-a-blog/index.html',
        '/2017/01/11/jenkins-on-azure-app-service/index.html',
        '/2017/01/21/hugo-in-azure-blob-storage/index.html',
        '/2017/02/09/microsoft-ignite-next-week/index.html',
        '/2017/02/13/live-demo/index.html',
        '/2017/02/23/ignite-wrap-up/index.html',
        '/2017/05/01/getting-started-with-terraform-on-azure/index.html',
        '/2017/05/30/taking-helm-for-a-spin/index.html',
        '/2018/02/27/start-using-jenkins-with-azure-in-5-minutes/index.html',
        '/2018/03/31/hugo-in-azure-blob-storage-part-2/index.html',
        '/2018/04/15/ci/cd-with-hugo-and-azure/index.html',
        '/2018/05/01/k8s-secrets-in-azure/',
        '/404.html',
        '/apple-touch-icon.png',
        '/categories/index.html',
        '/categories/index.xml',
        '/css/font-awesome.min.css',
        '/css/images/avatar.png',
        '/css/images/logo.png',
        '/css/images/thumb-default-small.png',
        '/css/monokai.css',
        '/css/style.css',
        '/fancybox/blank.gif',
        '/fancybox/fancybox_loading.gif',
        '/fancybox/fancybox_loading@2x.gif',
        '/fancybox/fancybox_overlay.png',
        '/fancybox/fancybox_sprite.png',
        '/fancybox/fancybox_sprite@2x.png',
        '/fancybox/helpers/fancybox_buttons.png',
        '/fancybox/helpers/jquery.fancybox-buttons.css',
        '/fancybox/helpers/jquery.fancybox-buttons.js',
        '/fancybox/helpers/jquery.fancybox-media.js',
        '/fancybox/helpers/jquery.fancybox-thumbs.css',
        '/fancybox/helpers/jquery.fancybox-thumbs.js',
        '/fancybox/jquery.fancybox.css',
        '/fancybox/jquery.fancybox.js',
        '/fancybox/jquery.fancybox.pack.js',
        '/favicon.ico',
        '/fonts/fontawesome-webfont.eot',
        '/fonts/fontawesome-webfont.svg',
        '/fonts/fontawesome-webfont.ttf',
        '/fonts/fontawesome-webfont.woff',
        '/fonts/fontawesome-webfont.woff2',
        '/fonts/FontAwesome.otf',
        '/img/azjenkban.png',
        '/img/cicd.jpg',
        '/img/cicdban.png',
        '/img/helmban.png',
        '/img/hex.png',
        '/img/hexban.png',
        '/img/hugoazure1.PNG',
        '/img/hugoazureban.png',
        '/img/hugoazureban2.png',
        '/img/igniteban.png',
        '/img/ignitebanrecent.png',
        '/img/ignitedemo1.png',
        '/img/ignitedemoban.png',
        '/img/ignitedemobanrecent.png',
        '/img/ignitewrapupban.png',
        '/img/ignitewrapupbanrecent.png',
        '/img/jenk1.png',
        '/img/jenk2.png',
        '/img/jenkaz5.png',
        '/img/jenkaz51.png',
        '/img/jenkaz52.png',
        '/img/jenkaz53.png',
        '/img/jenkban.png',
        '/img/logo.png',
        '/img/me128.png',
        '/img/terraformban.png',
        '/img/touch/icon-144x144.png',
        '/img/touch/icon-152x152.png',
        '/img/touch/icon-192x192.png',
        '/img/touch/icon-512x512.png',
        '/index.html',
        '/index.xml',
        '/js/highlight.min.js',
        '/js/jqlight.lazyloadxt.min.js',
        '/js/lazyload.min.js',
        '/js/script.js',
        '/js/site.js',
        '/manifest.json',
        '/page/1/index.html',
        '/page/2/index.html',
        '/page/aboutme/index.html',
        '/page/index.html',
        '/page/index.xml',
        '/page/page/1/index.html',
        '/post/index.html',
        '/post/index.xml',
        '/post/page/1/index.html',
        '/post/page/2/index.html',
        '/sitemap.xml',
        '/sw.js',
        '/tags/app-service/index.html',
        '/tags/app-service/index.xml',
        '/tags/app-service/page/1/index.html',
        '/tags/azure/index.html',
        '/tags/azure/index.xml',
        '/tags/azure/page/1/index.html',
        '/tags/blob/index.html',
        '/tags/blob/index.xml',
        '/tags/blob/page/1/index.html',
        '/tags/helm/index.html',
        '/tags/helm/index.xml',
        '/tags/helm/page/1/index.html',
        '/tags/hugo/index.html',
        '/tags/hugo/index.xml',
        '/tags/hugo/page/1/index.html',
        '/tags/ignite/index.html',
        '/tags/ignite/index.xml',
        '/tags/ignite/page/1/index.html',
        '/tags/index.html',
        '/tags/index.xml',
        '/tags/jenkins/index.html',
        '/tags/jenkins/index.xml',
        '/tags/jenkins/page/1/index.html',
        '/tags/kubernetes/index.html',
        '/tags/kubernetes/index.xml',
        '/tags/kubernetes/page/1/index.html',
        '/tags/terraform/index.html',
        '/tags/terraform/index.xml',
        '/tags/terraform/page/1/index.html',
      ]);
    })
  );
});

self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.filter(function (cacheName) {
        }).map(function (cacheName) {
          return caches.delete(cacheName);
        })
      );
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    fetch(event.request).catch(function() {
      return caches.match(event.request);
    })
  );
});