// The Cloud Functions for Firebase SDK to create Cloud Functions and set up triggers.
const functions = require('firebase-functions');

// The Firebase Admin SDK to access Firestore.
const admin = require('firebase-admin');

admin.initializeApp();

exports.test = functions.region('us-central1').https.onCall(async (req, res) => {
    console.log("Some text");
    // res.json({ result: "It worked" });
    return ({ result: "some info" })
});

exports.testNotification = functions.region('us-central1').https.onCall(async (data, context) => {
    console.log(data.token);
    console.log(context.auth.uid)

    const payload = {
        notification: {
            title: `test notification`,
            body: "test body"
        }
    };

    if (data.token) {
        try {
            const response = await admin.messaging().sendToDevice(data.token, payload);
            return ({ message: "notification set up" })
        } catch (err) {
            return ({ error: err })
        }
    }
    else {
        return ({ message: "didnt recieve a token" })
    }


});