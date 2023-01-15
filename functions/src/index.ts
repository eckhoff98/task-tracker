import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
admin.initializeApp();
const db = admin.firestore();

// User tasks

exports.addFcmToken = functions.https.onCall(async (data, context) => {
    if (!context.auth) return
    const query = db.collection('users').doc(context.auth.uid).collection("fcmTokens").where('token', '==', data.token)
    const tokens = await query.get()
    if (tokens) {
        // Delete all duplicate tokens
        tokens.forEach(snapshot => {
            context.auth && db.collection("users").doc(context.auth.uid).collection("fcmTokens").doc(snapshot.id).delete()
        })
    }
    // Add token to user's firestore with timstamp
    const now = admin.firestore.Timestamp.now()
    db.collection("users").doc(context.auth.uid).collection("fcmTokens").add({
        token: data.token,
        timestamp: now
    })

    return ({ msg: "recieved data", data: data })
});

exports.removeNotificationTask = functions.https.onCall(async (data, context) => {
    if (!context.auth) return
    console.log(data.taskRunnerTaskId)
    const result = (await db.collection("tasks").doc(data.taskRunnerTaskId).get()).exists && await db.collection("tasks").doc(data.taskRunnerTaskId).delete()
    return result
})
exports.addNotificationTask = functions.https.onCall(async (data, context) => {
    if (!context.auth) return
    const query = db.collection("users").doc(context.auth.uid).collection("fcmTokens")
    const tokens = await query.get()

    if (!tokens) return
    const justTokens: any[] = []
    tokens.forEach(snapshot => {
        justTokens.push(snapshot.data().token)
    });

    // Check if task already exists


    console.log(admin.firestore.Timestamp.fromDate(new Date(data.datetime)))
    const task = {
        performAt: admin.firestore.Timestamp.fromDate(new Date(data.datetime)),
        status: "scheduled",
        worker: "notification",
        options: {
            title: data.name,
            body: data.description,
            // name: "name",
            tokens: justTokens
        }
    }
    if (data.taskRunnerTaskId) {
        (await db.collection("tasks").doc(data.taskRunnerTaskId).get()).exists && db.collection("tasks").doc(data.taskRunnerTaskId).update(task)
        return ({ taskRunnerTaskId: data.taskRunnerTaskId })
    } else {
        const result = await db.collection("tasks").add(task)
        return ({ taskRunnerTaskId: result.id })
    }

});

export const taskRunner = functions.runWith({ memory: '2GB' }).pubsub

    .schedule('* * * * *').onRun(async context => {

        // Consistent timestamp
        const now = admin.firestore.Timestamp.now();

        // Query all documents ready to perform
        const query = db.collection('tasks').where('performAt', '<=', now).where('status', '==', 'scheduled');

        const tasks = await query.get();


        // Jobs to execute concurrently. 
        const jobs: Promise<any>[] = [];

        // Loop over documents and push job.
        tasks.forEach(snapshot => {
            const { worker, options } = snapshot.data();

            const job = workers[worker](options)

                // Update doc with status on success or error
                .then(() => snapshot.ref.update({ status: 'complete' }))
                .catch((err) => snapshot.ref.update({ status: 'error' }));

            jobs.push(job);
        });

        // Execute all jobs concurrently
        return await Promise.all(jobs);

    });

// Optional interface, all worker functions should return Promise. 
interface Workers {
    [key: string]: (options: any) => Promise<any>
}




// Business logic for named tasks. Function name should match worker field on task document. 
const workers: Workers = {
    helloWorld: () => db.collection('logs').add({ hello: 'world' }),
    notification: async (options) => {
        if (options.name) {
            console.log(options.name)
        }
        if (options.tokens.length > 0) {
            console.log("tokens is not zero")
            const title = options.title ? options.title : ""
            const body = options.body ? options.body : ""
            options.tokens.forEach((_token: string) => {
                console.log("sending to: " + _token)
                const payload = {
                    token: _token,
                    notification: {
                        title: title,
                        body: body,
                    }
                };
                admin.messaging().send(payload).then((response) => {
                    // Response is a message ID string.
                    console.log('Successfully sent message:', response);
                    return { success: true };
                }).catch((error) => {
                    return { error: error.code };
                });
            });
        }
    }
}

