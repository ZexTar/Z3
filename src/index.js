const maze = require('./mazegenerator');
const [sCoord, eCoord] = require('./config');

const [startX, startY] = sCoord;
const [endX, endY] = eCoord;
const colChecked = new Array(10).fill();
const checked = colChecked.map(() => new Array(10).fill(false));
const buffer = [];
const path = [];

const rowNum = [-1, 0, 0, 1];
const colNum = [0, -1, 1, 0];

const isValid = (row, col) => (row >= 0) && (col >= 0) && (row < 10) && (col < 10);

const getCoordinates = (nodes) => { // get coordinates from nodes array
	const coordinates = nodes;
	let i = coordinates.length;
	while (i) {
		if ((i + 1) % 3 === 0) {
			coordinates.splice(i, 1);
		}
		i -= 1;
	}
	return coordinates;
};

const deepFlat = (arr) => { // handle nested arrays
	const stack = [...arr];
	const res = [];
	while (stack.length) {
		const next = stack.pop();
		if (Array.isArray(next)) {
			stack.push(...next);
		} else {
			res.push(next);
		}
	}

	return res.reverse();
};

const pushPairs = (arr) => { // push coordinates in pairs
	if (arr.length === 0) {
		return false;
	}
	path.push(arr.splice(0, 2).reverse());

	return pushPairs(arr);
};

const solveMaze = () => {
	checked[startX][startY] = true;
	const bufferNode = [sCoord, 0];
	buffer.push(bufferNode);

	while (buffer.length) {
		const currentNode = buffer[0];
		const [x, y] = currentNode[0];
		const distance = currentNode[1];

		if (x === endX && y === endY) {
			console.log(`It took ${distance} steps to reach endpoint!`);
			return currentNode;
		}

		buffer.shift();

		for (let i = 0; i < 4; i += 1) {
			const row = x + rowNum[i];
			const col = y + colNum[i];

			if (isValid(row, col) && maze[row][col] && !checked[row][col]) {
				checked[row][col] = true;
				const newNode = [[row, col], distance + 1, currentNode];
				buffer.push(newNode);
			}
		}
	}

	return false;
};

const shortestPath = () => {
	const nodes = solveMaze();

	if (!nodes) {
		return 'endpoint is unreachable!!!';
	}

	const flatNodes = deepFlat(nodes);
	const coordinates = getCoordinates(flatNodes).reverse().slice(2); // slice to remove starting point
	pushPairs(coordinates);

	return path;
};

console.log(maze);
console.log(shortestPath());
