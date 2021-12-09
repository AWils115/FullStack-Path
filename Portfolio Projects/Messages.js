// This project will take phrases from three arrays, to produce one random message.//

const animals = [
	'chicken',
	'dog',
	'cat',
	'horse',
	'elephant',
	'monkey',
	'hamster',
	'mouse',
	'rabbit',
	'fox',
	'lion',
];
const objects = [
	'road',
	'train track',
	'bridge',
	'river',
	'tree line',
	'ditch',
	'field',
	'lake',
	'motorway',
];
const reasons = [
	'To get to the other side',
	'To eat the pie',
	'Beacuse they wanted to',
	'Their mum told them to',
	"They didn't",
	'They thought they saw a ghost',
];

function messages() {
	randAnimal = Math.floor(Math.random() * animals.length);
	randObject = Math.floor(Math.random() * objects.length);
	randReason = Math.floor(Math.random() * reasons.length);
	return `Why did the ${animals[randAnimal]} cross the ${objects[randObject]}?\n${reasons[randReason]}.`;
}

console.log(messages());
