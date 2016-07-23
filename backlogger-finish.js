#!/usr/bin/env node

var program = require("commander");
var colors = require("colors");
var locallydb = require("locallydb");
var db = new locallydb("./db");
var games = db.collection("games");

program
	.parse(process.argv);

var opts = program.args;

var i = games.where("@cid === " + opts[0]).items[0];
if(i){
	games.update(i.cid, {
		"status": "finished"
	});

	console.info("success\t".green.inverse + " updated " + i.name + " to finished status");
}
else {
	console.error("error\t".red.inverse + " id does not exist");
}
