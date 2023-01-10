importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

const firebaseConfig = {
    apiKey: "AIzaSyB78gsaJsYOObvrLdjuKkU-Swi9JOi1tA8",
    authDomain: "fireshiptutorial-71e6c.firebaseapp.com",
    projectId: "fireshiptutorial-71e6c",
    storageBucket: "fireshiptutorial-71e6c.appspot.com",
    messagingSenderId: "1095372198065",
    appId: "1:1095372198065:web:45feeb485582cb5c325290",
    measurementId: "G-4MC011MMPM"
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

// messaging.onBackgroundMessage(function (payload) {
//     console.log('Received background message ', payload);

//     const notificationTitle = payload.notification.title;
//     const notificationOptions = {
//         body: payload.notification.body,
//     };

//     self.registration.showNotification(notificationTitle,
//         notificationOptions);
// });