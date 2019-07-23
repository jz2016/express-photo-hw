const express = require("express");
const router = express.Router();
const Photo = require("../models/photos");

// INDEX
router.get("/", (req,res) => {
	Photo.find({}, (err,photos) => {
		console.log(photos, " <-- array of photos");
		if(err) {
			res.send(err)
		} else {
			res.render("index.ejs", {
				photos: photos
			});
		};
	});
});


// NEW Route
router.get("/new", (req,res) => {
	res.render("new.ejs")
});


// EDIT Route
router.get("/:id/edit", (req,res) => {
	Photo.findById(req.params.id, (err,foundPhoto) => {
		if(err) {
			res.send(err)
		} else {
			console.log(foundPhoto, " <-- EDIT route, document from mongdb");
			res.render("edit.ejs", {
				photo: foundPhoto
			});
		};
	});
});


// SHOW Route
router.get("/:id", (req,res) => {
	console.log(req.params.id, " <-- params in SHOW route");
	Photo.findById(req.params.id, (err,foundPhoto) => {
		if(err) {
			res.send(err)
		} else {
			console.log(foundPhoto, " <-- show route documentation from model");
			res.render("show.ejs", {
				photo: foundPhoto
			});
		};
	});
});


// CREATE
router.post("/", (req,res) => {
	console.log(req.body, " <-- content of the form from NEW page");
	Photo.create(req.body, (err, createdPhoto) => {
		console.log(createdPhoto, " <-- POST route /photos, createdPhoto");
		if(err) {
			res.send(err)
		} else {
			res.redirect("/photos")
		};
	});
});


module.exports = router;