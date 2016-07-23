#!/usr/bin/env node

var program = require("commander");

// backlogger list

program
	.version("0.0.1")

	.command("add [options] <gamename>", "add a game").alias("a")
	.command("remove <id>", "remove a game by id. find out the id via list").alias("rm")
	.command("finish [options] <id>", "finish a game, with optional arguments")
	.command("score", "give a summary of your backlog score")
	.command("list", "list games")

	.parse(process.argv);

if(!program.args.length) program.help();

