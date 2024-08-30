//setting up async/await ask functionality for the command line
const readline = require("readline");
const readlineInterface = readline.createInterface(
    process.stdin,
    process.stdout
);

function ask(questionText) {
    return new Promise((resolve, reject) => {
        readlineInterface.question(questionText, resolve);
    });
}

//YOUR CODE GOES HERE
class Line {
	constructor(color) {
		this.color = color;
		this.connections = [];
	}

	addConnections(lines) {
		this.connections.push(...lines);
	}
}

class Person {
	constructor(startingLine) {
		this.currentLine = startingLine;
		this.name = null;
	}

	transferLines(line) {
		this.currentLine = line;
	}
}

let blue = new Line("blue");
let green = new Line("green");
let yellow = new Line("yellow");
let red = new Line("red");
let purple = new Line("purple");

blue.addConnections([green, red]);
green.addConnections([blue, yellow]);
yellow.addConnections([green, red, purple]);
red.addConnections([blue, yellow]);
purple.addConnections([yellow]);

let user = new Person(blue);

async function main() {
	//YOUR RIDE GOES HERE
	//introduce user to our program
	console.log("Hello! Welcome to our subway!");
	//ask user what their name is
	user.name = await ask("What is your name? ");
	//TODO: what happens if user's name is ""?
	//tell the user where they are starting
	console.log(`Hello ${user.name}! You are currently on the ${user.currentLine.color} line.`);

	//let the user travel from line to line
	//ask the user for a destination to travel to
	let destLine = undefined;
	do {
		const destination = await ask("Where would you like to go? ");
		//find the line object that the user provided in our current line's connections array
		destLine = user.currentLine.connections.find((line) => line.color === destination);
		//TODO: what happens if destination is "Red"?
		//TODO: how does our user know where they can travel?

		//tell the user they can't go there
		if (destLine === undefined) {
			console.log(`You can't go from ${user.currentLine.color} to ${destination}.`);
		}
	} while (destLine === undefined) //test if the user can travel to their destination

	//move to the destination
	user.transferLines(destLine);
	console.log(`You are now on the ${user.currentLine.color} line.`);
	//TODO: let the user move lines more than one time

	//end program
	process.exit();
}

main();