#!/usr/bin/env node

var program = require("commander");
var locallydb = require("locallydb");
var db = new locallydb("./db");
var games = db.collection("games");
var Table = require("cli-table");

program
	.option("-p --platform <platform>", "game platform, this is not case sensitive")
	.option("-g --game <game>", "game name, note this is case sensitive")
	.parse(process.argv);

var table = new Table({
	"head": ["id", "platform", "name", "weight", "status", "added"],
	"colWidths": [4, 12, 30, 5, 12, 12]
});

var items = games.items; // default

var where = [];

if(program.platform)
	where.push("(@platform == '" + program.platform.toLowerCase() + "')");

if(program.game)
	where.push("(@name == '" + program.game + "')");

if(where.length)
	items = games.where(where.join(" || ")).items;

for(var g = 0; g < items.length; g++){
	let i = games.items[g];

	var now = new Date().getTime();
	var weight = Math.floor(((((now - i.date) / 1000) / 60 ) / 60) / 24);

	table.push(
		[i.cid, i.platform, i.name, weight, i.status, i["$created"].substring(0, i["$created"].indexOf("T"))]
	);
}

console.info(table.toString());
