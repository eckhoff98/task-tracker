import { initializeApp } from "firebase/app";
import { getFirestore, Timestamp, doc, getDoc, setDoc, arrayUnion, arrayRemove } from "@firebase/firestore"
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getMessaging, getToken } from "firebase/messaging";
import { getFunctions, httpsCallable } from 'firebase/functions';


const { initializeAppCheck, ReCaptchaV3Provider } = require("firebase/app-check");

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
export const app = initializeApp(firebaseConfig);
const functions = getFunctions(app);
export const auth = getAuth(app);
export const db = getFirestore(app)
export const provider = new GoogleAuthProvider();
export const messaging = getMessaging(app);

const appCheck = initializeAppCheck(app, {
    provider: new ReCaptchaV3Provider('6Ley4s8jAAAAABPyFDSYhW2oE5obqJu7LjXSH0qi'),

    // Optional argument. If true, the SDK automatically refreshes App Check
    // tokens as needed.
    isTokenAutoRefreshEnabled: true
});



export async function requestPermission(user) {
    if (!user) return console.log("no logged in user, canceling permission request")

    try {
        console.log('Requesting permission...');
        const permission = await Notification.requestPermission()

        if (permission !== "granted") return
        const token = await getToken(messaging, { vapidKey: 'BJje9NpOzGlOceheK6J7-c8UsFlyzQmV-XUpqJDLqg6UkbEeoLbH-2aaYNGyIstVMSpcJnTiQFjumJyj3psmBPI' })

        if (!token) return console.log('No registration token available. Request permission to generate one.');
        console.log(token)
        const result = await addFcmToken({token: token})
        console.log(result)
        return token
    } catch (err) { console.log(err) }
}

const addFcmToken = httpsCallable(functions, 'addFcmToken');
export const addNotificationTask = httpsCallable(functions, 'addNotificationTask');
export const removeNotificationTask = httpsCallable(functions, 'removeNotificationTask');
// const addFcmToken = async (user, token) => {
    
    // const docsnap = await getDoc(doc(db, "users", user.uid))

    // if (docsnap.exists()) {
    //     const tokens = docsnap.data().fcmTokens
    //     if (tokens && tokens.length > 0) {
    //         for (const i in tokens) {
    //             if (tokens[i].token === token) {
    //                 console.log("matching token")
    //                 await setDoc(doc(db, "users", user.uid), {
    //                     fcmTokens: arrayRemove(tokens[i])
    //                 }, { merge: true })
    //                     .catch(err => console.log(err))
    //             }
    //         }
    //     }
    // }
    // console.log("adding token")
    // await setDoc(doc(db, "users", user.uid), {
    //     fcmTokens: arrayUnion({ token: token, timestamp: Timestamp.now() })
    // }, { merge: true })
    //     .catch(err => console.log(err))
// }





