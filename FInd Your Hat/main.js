const prompt = require('prompt-sync')({ sigint: true });

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
	constructor(field = [[]]) {
		this.field = field;
		this.currentPosX = 0;
		this.currentPosY = 0;
		this.field[0][0] = pathCharacter; // Set pathCharacter to beginning of field
	}
	static generateField(height, width, percentage = 0.1) {
		const field = new Array(height).fill(0).map((el) => new Array(width)); // Initialise a heightXwidth field filled with zeros
		// fill the field with a random number of holes, the rest with field characters
		for (let y = 0; y < height; y++) {
			for (let x = 0; x < width; x++) {
				const prob = Math.random();
				field[x][y] = prob > percentage ? fieldCharacter : hole;
			}
		}
		// randomise hat location
		const hatLocation = {
			x: Math.floor(Math.random() * width),
			y: Math.floor(Math.random() * height),
		};
		// if hat location is at start position re-calculate until in a valid position
		while (hatLocation.x === 0 && hatLocation.y === 0) {
			(hatLocation.x = Math.floor(Math.random() * width)),
				(hatLocation.y = Math.floor(Math.random() * height));
		}
		field[hatLocation.y][hatLocation.x] = hat;
		return field;
	}
	print() {
		// print the generated field to the console
		const displayString = this.field
			.map((row) => {
				return row.join('');
			})
			.join('\n');
		console.log(displayString);
	}
	askQuestion() {
		// ask user for a direction, possible directions are: U-up, D-down, L-left, R-right
		const answer = prompt('Which way? ').toUpperCase();
		switch (answer) {
			case 'U':
				this.currentPosY -= 1;
				break;
			case 'D':
				this.currentPosY += 1;
				break;
			case 'L':
				this.currentPosX -= 1;
				break;
			case 'R':
				this.currentPosX += 1;
				break;
			default:
				console.log('Enter U, D, L, or R.');
				this.askQuestion();
				break;
		}
	}
	isInBounds() {
		// check the position is within the bounds of the field
		return (
			this.currentPosY >= 0 &&
			this.currentPosX >= 0 &&
			this.currentPosY < this.field.length &&
			this.currentPosY < this.field[0].length
		);
	}
	isHat() {
		// check position is on hat
		return this.field[this.currentPosY][this.currentPosX] === hat;
	}
	isHole() {
		// check position is on hole
		return this.field[this.currentPosY][this.currentPosX] === hole;
	}
	runGame() {
		let playing = true;
		while (playing) {
			// print the field
			this.print();
			// ask for user input
			this.askQuestion();
			// check if out of bounds
			if (!this.isInBounds()) {
				console.log('Out of bounds!');
				break;
			}
			// check if landed on a hole
			else if ((this.isHole())) {
				console.log('Sorry, you fell down a hole!');
				break;
			}
			// check if landed on the hat
			else if (this.isHat()) {
				console.log('Congrats, you found your hat!');
				break;
			}
			// update field to show pathCharacter on position selected
			this.field[this.currentPosY][this.currentPosX] = pathCharacter;
		}
	}
}

const myField = new Field(Field.generateField(10, 10, 0.2));
myField.runGame();
