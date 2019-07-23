const express = require("express");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const app = express();

require("./db/db");

const photoController = require("./controllers/photos");


app.use(bodyParser.urlencoded({extended:false}));
app.use(methodOverride("_method"));
app.use(express.static('public'));
app.use("/photos", photoController);








app.listen(3000, () => {
	console.log("listening on port 3000 right now")
});