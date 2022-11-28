const express = require("express")
const router = express.Router()
const sqlite3 = require("sqlite3")

//connect to sqlite db
let sql
const db = new sqlite3.Database("./server.db", sqlite3.OPEN_READWRITE, (err) => {
    if (err) return console.error(err.message)
})

router.get("/", (req, res) => {
    // Get tasks from db
    sql = 'SELECT * FROM tasks'
    db.all(sql, [], (err, rows) => {
        if (err) {
            throw err
        }
        res.send(rows)
    })
})

router.post("/", (req, res) => {
    data = [
        req.body.task.name,
        req.body.task.time,
        req.body.task.discription,
        req.body.task.reminder,
    ]
    sql = "INSERT INTO tasks (name, time, discription, reminder) VALUES (?,?,?,?)"
    db.run(sql, data, (err) => {
        if (err) throw err
        console.log("Added")
    })
    res.send("post task")
})

router.put("/", (req, res) => {
    console.log("Putting task")
    console.log(req.body)
    data = [
        req.body.task.name,
        req.body.task.time,
        req.body.task.discription,
        req.body.task.reminder,
        req.body.task.id
    ]
    sql = "UPDATE tasks SET name = ?, time = ?, discription = ?, reminder = ? WHERE id = ?"
    db.run(sql, data, (err) => {
        if (err) throw err
    })
    res.send("put task")
})

router.delete("/", (req, res) => {
    data = [req.body.task.id]
    sql = "DELETE FROM tasks WHERE id = ?"
    db.run(sql, data, (err) => {
        if (err) throw err
        console.log("Removed")
    })
    res.send("delete task")
})



module.exports = router
