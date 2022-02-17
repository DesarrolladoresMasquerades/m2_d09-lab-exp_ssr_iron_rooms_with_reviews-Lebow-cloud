const {Schema, model} = require("mongoose")

const roomSchema = new Schema(

    {
        name: String,
        description: String,
        imageUrl:{type : String, default:"https://media.istockphoto.com/photos/bohemian-living-room-interior-3d-render-picture-id1182454657?k=20&m=1182454657&s=612x612&w=0&h=1xEsm7BqeicA8jYk9KlerUtGsAgzzo530l5Ak1HJdnc="},
        owner: {type: Schema.Types.ObjectId, ref : "User"},
        reviews: []
    }
    

)

const Room = model("Room", roomSchema )

module.exports = Room;