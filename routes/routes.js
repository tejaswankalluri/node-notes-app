const express = require("express")
const router = express()
const mongoose = require("mongoose")
const templatepath = require("app-root-path").resolve("/template/views")
// views engine
router.set("views", templatepath)

// mongoose
const notesSchema = new mongoose.Schema({
    title: String,
    body: String,
})
const Notes = mongoose.model("notes", notesSchema)

router.get("/", async (req, res) => {
    const Notes1 = await Notes.find({})

    res.render("index", { Notes1 })
})
router.post("/", async (req, res) => {
    const { title, body } = req.body
    // console.log(req.body)
    const newNotes = new Notes({
        title: title,
        body: body,
    })
    await newNotes.save()
    res.redirect("/")
})
//delete notes
router.get("/delete/:id", async (req, res) => {
    const { id } = req.params
    // console.log(id)
    await Notes.deleteMany({ _id: id })
        .then(res.redirect("/"))
        .catch((e) => {
            console.log(e)
        })
})
// update notes
router.get("/note/:id", async (req, res) => {
    const { id } = req.params
    let findNotes
    await Notes.findById(id, (err, docs) => {
        if (err) {
            console.log(err)
        } else {
            findNotes = docs
        }
    })
    // console.log(findNotes)

    res.render("edit", { findNotes })
})
router.post("/note/:id", async (req, res) => {
    const { id } = req.params
    const { title, body } = req.body
    await Notes.findByIdAndUpdate(
        id,
        { title: title, body: body },
        (err, docs) => {
            if(err){
                console.log(err)
            }
            else{
                res.redirect("/")
            }
        }
    )
})
// css
router.get("/note/css/edit.css",(req,res)=>{
    const path = require("app-root-path").resolve("/public/css/edit.css")
    res.sendFile(path)
})
module.exports = router
