const router = require("express").Router();
const Room = require("../models/Room.model")
const isLoggedIn = require("../middleware/isLoggedIn")


router.post("/:id/delete", (req, res)=>{
    const id = req.params.id

    Room.findByIdAndDelete(id)
        .then((room)=>{
            res.redirect("/rooms")
            
        })

})

router
    .route("/:id/edit")
    .get((req, res) => {
        const id = req.params.id
        Room.findById(id)
            .populate("owner")
            .then((room) => {
                if(room.owner._id.toString() !== req.session.user){
                    res.redirect("/rooms")
                }res.render("rooms/room-edit", room)
            })
    })
    .post((req, res) => {
        const id = req.params.id
        const {name, description, imageUrl} = req.body
        Room.findByIdAndUpdate(id,{name, description, imageUrl})
            .then((room) => {
                res.redirect("/rooms", room)
            })
    })

    
    router
    .route("/create")
    .get(isLoggedIn,(req, res) => {
        res.render("rooms/new-room")
    })
    .post((req, res) => {
        
        const {name, description, imageUrl} = req.body
        const owner = req.session.user
        
        Room.create({name, description, imageUrl, owner})
        .then((newRoom) => {
            console.log(newRoom, owner)
            res.redirect("/rooms")
        })
    })


    router.get("/:id/details",isLoggedIn,(req, res) => {
        const roomId = req.params.id

        Room.findById(roomId)
            .then((room)=>{
                res.render("room/room", room)
            })
    })


    
    router.get("/", (req, res) => {
        Room.find()
        .then((roomsList)=>{
            res.render("rooms/roomsList", {roomsList})
        })
    })
    
    module.exports = router;