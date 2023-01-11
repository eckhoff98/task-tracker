import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
admin.initializeApp();
const db = admin.firestore();

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
            const title = options.title ? options.title : "No title"
            const body = options.body ? options.body : "No body"
            options.tokens.forEach((_token: string) => {
                console.log("sending to: " + _token)
                const payload = {
                    token: _token,
                    notification: {
                        title: title,
                        body: body,
                        // tag: "any-string-here"
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
        // if (options.token) {
        //     const title = options.title ? options.title : "No title"
        //     const body = options.body ? options.body : "No body"
        //     // const message = "test message"
        //     const payload = {
        //         token: options.token,
        //         notification: {
        //             title: title,
        //             body: body,
        //             // tag: "any-string-here"
        //         }
        //     };
        //     admin.messaging().send(payload).then((response) => {
        //         // Response is a message ID string.
        //         console.log('Successfully sent message:', response);
        //         return { success: true };
        //     }).catch((error) => {
        //         return { error: error.code };
        //     });
        // }
        // db.collection('logs').add({ notification: 'notification' })
    }
}

