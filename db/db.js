const mongoose = require("mongoose");

const connectionString = "mongodb://localhost/" + "photos3";

mongoose.connect(connectionString, {
	useNewUrlParser: true
});


mongoose.connection.on("connected", () => {
	console.log(`mongoose connected to ${connectionString}`);
});

mongoose.connection.on("disconnected", () => {
	console.log(`mongoose disconnected to ${connectionString}`);
});

mongoose.connection.on("error", () => {
	console.log(`mongoose error to ${err}`);
});