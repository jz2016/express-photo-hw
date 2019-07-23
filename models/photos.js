const mongoose = require("mongoose");

const photoSchema = new mongoose.Schema({
	photoUrl: {type: String, required: true},
	photoName: String,
	caption: String
});

const Photo = mongoose.model("Photo", photoSchema);

module.exports = Photo;