const express = require("express");
const router = express.Router();
const Photo = require("../models/photos");
const User = require("../models/users");

// INDEX
router.get("/", (req,res) => {
	Photo.find({}, (err,photos) => {
		console.log(photos, " <-- array of photos");
		if(err) {
			res.send(err)
		} else {
			res.render("photos/index.ejs", {
				photos: photos
			});
		};
	});
});


// NEW Route
router.get("/new", async (req,res) => {
	const users = await User.find();
	console.log(users);
	res.render("photos/new.ejs", {
		users: users
	})
});


// EDIT Route
router.get("/:id/edit", (req,res) => {
	Photo.findById(req.params.id, (err,foundPhoto) => {
		if(err) {
			res.send(err)
		} else {
			console.log(foundPhoto, " <-- EDIT route, document from mongdb");
			res.render("photos/edit.ejs", {
				photo: foundPhoto
			});
		};
	});
});

// UPDATE
router.put("/:id", (req,res) => {
	Photo.updateOne(
		{_id: req.params.id},
		req.body,
		(err, response) => {
			if(err){
				res.send(err);
			} else {
				console.log(response, "<-- PUT route");
				res.redirect("/photos");
			};
		});
});


// SHOW Route
// router.get("/:id", (req,res) => {
// 	console.log(req.params.id, " <-- params in SHOW route");
// 	Photo.findById((req.params.id).populate("user"), (err,foundPhoto) => {
// 		if(err) {
// 			res.send(err)
// 		} else {
// 			console.log(foundPhoto, " <-- show route documentation from model");
// 			res.render("photos/show.ejs", {
// 				photo: foundPhoto
// 			});
// 		};
// 	});
// });

router.get("/:id", async (req,res) => {
	const foundPhoto = await Photo.findById(req.params.id).populate("user");
	console.log(foundPhoto);
	res.render("photos/show.ejs", {
		photo: foundPhoto
	})
});


// DELETE Route
router.delete("/:id", (req,res) => {
	console.log(req.body, "<-- in DELETE Route");
	Photo.findByIdAndDelete(
		req.params.id,
		(err,response) => {
			if(err) {
				console.log(err)
			} else {
				console.log(response, "<-- DELETE Route");
				res.redirect("/photos");
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