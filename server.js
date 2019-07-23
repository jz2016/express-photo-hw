const express = require("express");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const app = express();

require("./db/db");

const photoController = require("./controllers/photos");
const userController = require("./controllers/users");


app.use(bodyParser.urlencoded({extended:false}));
app.use(methodOverride("_method"));
app.use(express.static('public'));
app.use("/photos", photoController);
app.use("/users", userController);


app.get("/", (req, res) => {
  res.render('index.ejs');
});





app.listen(3000, () => {
	console.log("listening on port 3000 right now")
});