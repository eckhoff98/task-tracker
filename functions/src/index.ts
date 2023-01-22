import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
admin.initializeApp();
const db = admin.firestore();

// -------------------- User tasks --------------------
exports.addFcmToken = functions.https.onCall(async (data, context) => {
    if (!context.auth) return
    const query = db.collection('users').doc(context.auth.uid).collection("fcmTokens").where('token', '==', data.token)
    const tokens = await query.get()

    // Delete all duplicate tokens
    if (tokens) {
        tokens.forEach(snapshot => {
            context.auth && db.collection("users").doc(context.auth.uid).collection("fcmTokens").doc(snapshot.id).delete()
            // context.auth && db.collection("users").doc(context.auth.uid).collection("fcmTokens").doc(snapshot.id).update({ timestamp: new Date() })
            // return ({ msg: "token already in list, updating timestamp" }) 
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
    // console.log(data.taskRunnerTaskId)
    try {
        await db.collection("tasks").doc(data.id).delete()
        return ({ msg: "delete success" })
    } catch (err) {
        console.log(err)
        return err
    }

    // Delete all with taskId
    // try {
    //     const taskId = data.id
    //     const query = db.collection("tasks").where('taskId', '==', taskId)
    //     const toDelete = await query.get()
    //     let toDeleteRefs: any[] = []
    //     toDelete.forEach(snapShot => toDeleteRefs.push(snapShot.ref))
    //     for (let i = 0; i < toDeleteRefs.length; i++) {
    //         await toDeleteRefs[i].delete()
    //     }
    //     return ({ msg: "delete success" })
    // } catch (err) {
    //     console.log(err)
    //     return err
    // }

    // const result = (await db.collection("tasks").doc(data.taskRunnerTaskId).get()).exists && await db.collection("tasks").doc(data.taskRunnerTaskId).delete()
    // return result
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

    const task = {
        performAt: admin.firestore.Timestamp.fromDate(new Date(data.datetime)),
        status: "scheduled",
        worker: "notification",
        options: {
            taskId: data.id ? data.id : "no_id",
            title: data.name,
            body: data.description,
            tokens: justTokens
        }
    }

    if (data.taskRunnerTaskId) {
        (await db.collection("tasks").doc(data.taskRunnerTaskId).get()).exists && db.collection("tasks").doc(data.taskRunnerTaskId).update(task)
        return ({ taskRunnerTaskId: data.taskRunnerTaskId })
    } else {
        const result = await db.collection("tasks").add({ ...task })
        return ({ taskRunnerTaskId: result.id })
    }

});

// -------------------- tasks --------------------
// exports.addTaskServer = functions.https.onCall(async (data, context) => {
//     if (!context.auth) return

//     // Generate an id here
//     const randomId: string = String(Date.now() + Math.random()).replace(/[,.-]/g, '');
//     try {
//         await db.collection("users")
//             .doc(context.auth.uid).collection("tasks")
//             .doc(randomId).set({
//                 ...data,
//                 datetime: new Date(data.datetime),
//                 id: randomId
//             })
//         return ({ msg: "success", taskId: randomId })
//     } catch (err) {
//         console.log(err)
//         return err
//     }
// });
// exports.updateTaskServer = functions.https.onCall(async (data, context) => {
//     if (!context.auth) return
//     try {
//         await db.collection("users").doc(context.auth.uid)
//             .collection("tasks").doc(data.id)
//             .update({ ...data, datetime: new Date(data.datetime) })
//         return ({ msg: "success" })
//     } catch (err) {
//         console.log(err)
//         return err
//     }
// });
// exports.deleteTaskServer = functions.https.onCall(async (data, context) => {
//     if (!context.auth) return
//     try {
//         await db.collection("users").doc(context.auth.uid)
//             .collection("tasks").doc(data.id)
//             .delete()
//         // await db.collection("tasks").doc(data.id).delete()
//         return ({ msg: "success" })
//     } catch (err) {
//         console.log(err)
//         return err
//     }
// });
exports.userTasksCreate = functions.firestore
    .document('users/{userId}/tasks/{task}')
    .onCreate(async (snap, context) => {
        const newValue = snap.data();
        await addNotificationTask2(newValue, context.params.userId)
    });
exports.userTasksUpdate = functions.firestore
    .document('users/{userId}/tasks/{task}')
    .onUpdate(async (change, context) => {
        const newValue = change.after.data();
        console.log(newValue)
        if (newValue.reminder) {
            await db.collection("tasks").doc(newValue.id).delete()
            await addNotificationTask2(newValue, context.params.userId)
        } else {
            await db.collection("tasks").doc(newValue.id).delete()
        }
    });
exports.userTasksDelete = functions.firestore
    .document('users/{userId}/tasks/{task}')
    .onDelete(async (snap, context) => {
        await db.collection("tasks").doc(snap.data().id).delete()
        console.log("delete")
    })

const addNotificationTask2 = async (data: any, uid: string) => {
    if (!data.reminder) return ({ msg: "no reminder" })
    console.log("addNotificationTask2")
    const query = db.collection("users").doc(uid).collection("fcmTokens")
    const tokens = await query.get()

    if (!tokens) return
    const justTokens: any[] = []
    tokens.forEach(snapshot => {
        justTokens.push(snapshot.data().token)
    });

    const task = {
        // performAt: admin.firestore.Timestamp.fromDate(new Date(data.datetime)),
        performAt: data.datetime,
        status: "scheduled",
        worker: "notification",
        options: {
            taskId: data.id ? data.id : "no_id",
            title: data.name,
            body: data.description,
            tokens: justTokens
        }
    }

    await db.collection("tasks").doc(data.id).set(task)
    return ({ msg: "success" })
}


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
        // if (options.name) {
        //     console.log(options.name)
        // }

        // Testing
        const title = options.title ? options.title : ""
        const body = options.body ? options.body : ""
        const tokens = options.tokens
        const paylod = {
            notification: {
                title: title,
                body: body,
                click_action: "/"
            },
            data: {
                taskId: options.taskId,
            }
        }
        try {
            await admin.messaging().sendToDevice(tokens, paylod)
        } catch (err) {
            console.log(err)
            return err
        }

        // if (options.tokens.length > 0) {
        //     // console.log("tokens is not zero")
        //     const title = options.title ? options.title : ""
        //     const body = options.body ? options.body : ""
        //     options.tokens.forEach((_token: string) => {
        //         console.log("sending to: " + _token)
        //         const payload = {
        //             token: _token,
        //             notification: {
        //                 title: title,
        //                 body: body,
        //             },
        //             data: { taskId: options.taskId }
        //         };
        //         admin.messaging().send(payload).then((response) => {
        //             // Response is a message ID string.
        //             console.log('Successfully sent message:', response);
        //             return { success: true };
        //         }).catch((error) => {
        //             return { error: error.code };
        //         });
        //     });
        // }
    }
}

