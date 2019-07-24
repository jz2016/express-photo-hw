const express = require("express");
const router = express.Router();
const User = require("../models/users");
const Photo = require("../models/photos");


// INDEX
router.get("/", async (req,res) => {
	try {
		const users = await User.find();
		res.render("users/index.ejs", {
			users: users
		});
	} catch(error){
		res.send(error);
	}
});


// NEW Route
router.get("/new", (req,res) => {
	res.render("users/new.ejs")
});


// EDIT 
router.get("/:id/edit", async (req,res) => {
	try {
		const editedUser = await User.findById(req.params.id);
		res.render("users/edit.ejs", {
			user: editedUser
		});
	} catch(error) {
		res.send(error)
	}
});

// UPDATE
router.put("/:id", async (req,res) => {
	try {
		const updatedUser = await User.updateOne({_id: req.params.id}, req.body);
		res.redirect("users/show.ejs");
	} catch(error) {
		res.send(error)
	};
});


// SHOW Route
router.get("/:id", async (req,res) => {
	try {
		const foundUser = await User.findById(req.params.id);
		const thisUsersPhotos = await Photo.find({user: req.params.id});
		res.render("users/show.ejs", {
			user: foundUser,
			photos: thisUsersPhotos
		});
	} catch(error){
		res.send(error)
	}
});


// DELETE Route
router.delete("/:id", async (req,res) => {
	try {
		const deletedUser = await User.findByIdAndDelete(req.params.id);
		res.redirect("/users");
	} catch(error) {
		res.send(error)
	};
});


// CREATE
router.post("/", async (req,res) => {
	console.log(req.body, "<-- req.body entered in NEW form");
	try {
		const createdUser = await User.create(req.body);
		res.redirect("/users")
	} catch(error) {
		res.send(error)
	}
});



module.exports = router;
