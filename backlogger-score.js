#!/usr/bin/env node

var program = require("commander");
var locallydb = require("locallydb");
var db = new locallydb("./db");
var games = db.collection("games");

program
	.option("-p --platform <platform>", "game platform, this is not case sensitive")
	.option("-s --simple", "simple calculation: an unfinished game negates a point, a finished game adds a point.")
	.parse(process.argv);

var items = games.items; // default

var where = [];

if(program.platform)
	where.push("(@platform == '" + program.platform.toLowerCase() + "')");

if(where.length)
	items = games.where(where.join(" || ")).items;

var score = 0;
var unfinished = 0;
var finished = 0;
for(var g = 0; g < items.length; g++){
	let i = games.items[g];

	var weight = i.status === "unfinished" ? -1 : 1;
	if(!program.simple){
		var now = new Date().getTime();
		weight = Math.floor(((((now - i.date) / 1000) / 60 ) / 60) / 24);
	}

	score += weight;

	if(i.status === "unfinished") unfinished--;
	if(i.status === "finished") finished++;
}

function gcd(p, q) {
    if (q == 0) return p;
    else return gcd(q, p % q);
}

function ratio(a, b) {
   var gcdd = gcd(a,b);
   return a/gcdd + ":" + b/gcdd;
}

console.info(
	"Your score: %d (%d/%d) ratio: %s",
	score, unfinished, finished, ratio(unfinished * -1, finished)
);
