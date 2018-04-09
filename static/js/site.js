var pathArray = window.location.pathname.split( '/' );
var goodpart = pathArray[1];
var sw = window.location.protocol + "//" + window.location.host + "/" + goodpart + "/sw.js"
navigator.serviceWorker && navigator.serviceWorker.register(sw).then(function(registration) {
    console.log('Excellent, registered with scope: ', registration.scope);
  });