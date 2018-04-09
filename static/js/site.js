var pathArray = window.location.pathname.split('/');
var goodpart = pathArray[1];
//var sw = window.location.protocol + "//" + window.location.host + "/" + goodpart + "/sw.js"
var sw = window.location.protocol + "//" + window.location.host + "/" + "/sw.js"

if ('serviceWorker' in navigator) {
  window.addEventListener('load', function () {
    navigator.serviceWorker.register(sw);
  });
}