/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

importScripts(
  "/precache-manifest.57908e779e2162c139cbd81706b399e0.js"
);



/*function initInSw() {

  importScripts("https://www.gstatic.com/firebasejs/8.9.1/firebase-app.js");
  importScripts("https://www.gstatic.com/firebasejs/8.9.1/firebase-messaging.js");

  const firebaseConfig = {
    apiKey: "AIzaSyBjYX-Aru2FaPLZvNun5soT4A6c8v5Ig_Q",
    authDomain: "onepirate-629ed.firebaseapp.com",
    databaseURL: "https://onepirate-629ed-default-rtdb.firebaseio.com/",
    projectId: "onepirate-629ed",
    storageBucket: "onepirate-629ed.appspot.com",
    messagingSenderId: "797106594064",
    appId: "1:797106594064:web:8d7b28c214b69a799a0595"
  };
  
  
  
  //const app = 
  firebase.initializeApp(firebaseConfig);
  //const initMessaging 
  


}

function onBackgroundMessage() {
  const messaging = firebase.messaging();

  // [START messaging_on_background_message]
  messaging.onBackgroundMessage((payload) => {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);
    // Customize notification here
    const notificationTitle = 'Background Message Title';
    const notificationOptions = {
      body: 'Background Message body.',
      icon: '/firebase-logo.png'
    };
  
    self.registration.showNotification(notificationTitle,
      notificationOptions);
  });
}*/


self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

workbox.core.clientsClaim();

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

workbox.routing.registerNavigationRoute(workbox.precaching.getCacheKeyForURL("/index.html"), {
  
  blacklist: [/^\/_/,/\/[^/?]+\.[^/]+$/],
});
