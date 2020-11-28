const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const path = require("path")
const port = 3000
const templatepath = path.join(__dirname + "/template/views")
// mongodb://127.0.0.1:27017/notesapp?readPreference=primary&appname=MongoDB%20Compass&ssl=false
require("dotenv").config()
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static("public")) //linking external css to handlebars

// view engine
app.set("view engine", "hbs")
app.set("views", templatepath)

// mongo connect
console.log("connecting to Database")
mongoose
    .connect(process.env.MONGO_URL, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useFindAndModify: false,
    })
    .then(
        () => {
            console.log("connected to Database!")
        },
        (err) => {
            console.log(err)
        }
    )
// use routes
app.use("/", require("./routes/routes"))

app.listen(port, () => {
    console.log(`server is up and running at http://localhost:${3000}`)
})
