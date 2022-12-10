const express = require("express")
const router = express.Router()
const sqlite3 = require("sqlite3")
const PocketBase = require("pocketbase/cjs")

// Connect to pocketbase
const pb = new PocketBase('http://127.0.0.1:8090');

//connect to sqlite db
let sql
const db = new sqlite3.Database("./server.db", sqlite3.OPEN_READWRITE, (err) => {
    if (err) return console.error(err.message)
})

router.get("/", async (req, res) => {
    try {
        const result = await pb.collection('tasks').getList(1, 100)
        res.send(result.items)
    } catch (err) {
        console.log(err)
    }
})

router.post("/", async (req, res) => {
    try {
        const task = req.body.task
        const newRecord = await pb.collection('tasks').create(task);
        res.send("post task")
    } catch (err) {
        console.log(err)
    }
})

router.put("/", async (req, res) => {
    try {
        const task = req.body.task
        console.log(task)
        const record = await pb.collection('tasks').update(task.id, task);
        res.send("put task")
    } catch (err) {
        console.log(err)
    }
})

router.delete("/", async (req, res) => {
    try {
        console.log(req.body.task.id)
        const record = await pb.collection('tasks').delete(req.body.task.id);
        res.send("delete task")
    } catch (err) {
        console.log(err)
    }
})

module.exports = router
