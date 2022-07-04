importScripts("https://www.gstatic.com/firebasejs/8.9.1/firebase-app.js");
importScripts(
    "https://www.gstatic.com/firebasejs/8.9.1/firebase-messaging.js",
);
// For an optimal experience using Cloud Messaging, also add the Firebase SDK for Analytics.
importScripts(
    "https://www.gstatic.com/firebasejs/8.9.1/firebase-analytics.js",
);

// Initialize the Firebase app in the service worker by passing in the
// messagingSenderId.
firebase.initializeApp({
    messagingSenderId: "797106594064",
    apiKey: "AIzaSyBjYX-Aru2FaPLZvNun5soT4A6c8v5Ig_Q",
    projectId: "onepirate-629ed",
    appId: "1:797106594064:web:8d7b28c214b69a799a0595",
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function(payload) {
    console.log(
        "[firebase-messaging-sw.js] Received background message ",
        payload,
    );
    // Customize notification here
    const notificationTitle = "Background Message Title";
    const notificationOptions = {
        body: "Background Message body.",
        icon: "/itwonders-web-logo.png",
    };

    return self.registration.showNotification(
        notificationTitle,
        notificationOptions,
    );
});