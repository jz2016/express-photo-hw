const express = require("express");
const router = express.Router();
const User = require("../models/users");


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









module.exports = router;
