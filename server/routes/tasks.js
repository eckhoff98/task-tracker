const express = require("express")
const router = express.Router()

router.get("/", (req, res) => {
    res.send("get task")
})

router.post("/", (req, res) => {
    console.log(req.body)
    res.send("post task")
})

router.put("/", (req, res) => {
    console.log(req.body)
    res.send("put task")
})

router.delete("/", (req, res) => {
    console.log(req.body)
    res.send("delete task")
})



module.exports = router
