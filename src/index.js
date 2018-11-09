const generateMaze = require('./mazegenerator');
const {
	dim,
	xStart,
	yStart,
	xEnd,
	yEnd,
} = require('./config');

const rowNum = [-1, 0, 0, 1];
const colNum = [0, -1, 1, 0];

const isValid = (row, col) => (row >= 0) && (col >= 0) && (row < dim) && (col < dim);

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

const pushPairs = (arr, path) => { // push coordinates in pairs
	const fillPath = path;
	if (arr.length === 0) {
		return fillPath;
	}
	fillPath.push(arr.splice(0, 2).reverse());

	return pushPairs(arr, fillPath);
};

const solveMaze = () => {
	const maze = generateMaze();
	const colChecked = new Array(dim).fill();
	const checked = colChecked.map(() => new Array(dim).fill(false));
	const buffer = [];
	checked[xStart][yStart] = true;
	const bufferNode = [[xStart, yStart], 0];
	buffer.push(bufferNode);

	while (buffer.length) {
		const currentNode = buffer[0];
		const [x, y] = currentNode[0];
		const distance = currentNode[1];

		if (x === xEnd && y === yEnd) {
			console.log(maze);
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

	return solveMaze();
};

const shortestPath = () => {
	const path = [];
	try {
		const nodes = solveMaze();
		const flatNodes = deepFlat(nodes);
		const coordinates = getCoordinates(flatNodes).reverse().slice(2); // slice to remove starting point
		return pushPairs(coordinates, path);
	} catch (err) {
		return '10x10 maze with THAT number of blocks is not solvable';
	}
};

console.log(shortestPath());
