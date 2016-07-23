#!/usr/bin/env node

var program = require("commander");
var colors = require("colors");
var locallydb = require("locallydb");
var db = new locallydb("./db");
var games = db.collection("games");

program
	.option("-p --platform <platform>", "game platform")
	.parse(process.argv);

var opts = program.args;

if(program.platform){
	var name = opts.join(" ");

	games.insert({
		"name": name,
		"platform": program.platform.toLowerCase(),
		"date": new Date().getTime(),
		"status": "unfinished"
	});

	console.info("success\t".green.inverse + " added game " + name + " on " + program.platform);
}
else {
	console.error("error\t".red.inverse + " must have a platform");
}
