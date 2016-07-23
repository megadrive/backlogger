#!/usr/bin/env node

var program = require("commander");
var colors = require("colors");
var locallydb = require("locallydb");
var db = new locallydb("./db");
var games = db.collection("games");

program
	.option("-y --yes", "accept the responsibility of killing the item")
	.parse(process.argv);

var opts = program.args;

if(opts){
	if(program.yes){
		var i = games.where("@cid === " + opts[0]).items[0];
		if(i){
			games.remove(i.cid);
			console.info("success\t".green.inverse + " removed " + i.name);
		}
	}
	else {
		console.warn("warning\t".yellow.inverse + " are you sure? append -y to the command if so");
	}
}
else {
	console.error("error\t".red.inverse + " must provide an id");
}
