const express = require("express")
const cors = require("cors")
// Routes
const tasksRoute = require("./routes/tasks")

const app = express()

const port = process.env.PORT || 5000

app.use(express.urlencoded({ extended: true }))
app.use(express.json({ type: ["application/json", "text/plain"] }))
app.use(cors({
    origin: "http://localhost:3000", //<--- location of the react app
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}))
// Routes
app.use("/tasks", tasksRoute)


app.listen(port, (err) => {
    if (err) return console.log(err)
    console.log(`Server running on http://localhost:${port}`)
})