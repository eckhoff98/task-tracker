import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore"
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getMessaging, getToken } from "firebase/messaging";


// Store this information in an env file
const firebaseConfig = {
    apiKey: process.env.REACT_APP_apiKey,
    authDomain: process.env.REACT_APP_authDomain,
    projectId: process.env.REACT_APP_projectId,
    storageBucket: process.env.REACT_APP_storageBucket,
    messagingSenderId: process.env.REACT_APP_messagingSenderId,
    appId: process.env.REACT_APP_appId,
    measurementId: process.env.REACT_APP_measurementId
};
const app = initializeApp(firebaseConfig);

export const provider = new GoogleAuthProvider();

export const messaging = getMessaging(app);
getToken(messaging, { vapidKey: 'BJje9NpOzGlOceheK6J7-c8UsFlyzQmV-XUpqJDLqg6UkbEeoLbH-2aaYNGyIstVMSpcJnTiQFjumJyj3psmBPI' }).then((currentToken) => {
    if (currentToken) {
        // Send the token to your server and update the UI if necessary
        console.log(currentToken)
        // ...
    } else {
        // Show permission request UI
        console.log('No registration token available. Request permission to generate one.');
        // ...
    }
}).catch((err) => {
    console.log('An error occurred while retrieving token. ', err);
    // ...
});

export function requestPermission() {
    console.log('Requesting permission...');
    Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
            console.log('Notification permission granted.');
        }
    }).then(() => {

    })
}


export const auth = getAuth(app);

export const db = getFirestore(app)


