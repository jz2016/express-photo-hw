const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const photoSchema = new Schema({
	photoUrl: {type: String, required: true},
	photoName: String,
	caption: String,
	user: {
		type: Schema.Types.ObjectId,
		ref: "User"
	}
});

const Photo = mongoose.model("Photo", photoSchema);

module.exports = Photo;