const {
	dim,
	xStart,
	yStart,
	xEnd,
	yEnd,
	blocks,
} = require('./config');

const rowNum = [-1, 0, 0, 1];
const colNum = [0, -1, 1, 0];

const isValid = (row, col) => (row >= 0) && (col >= 0) && (row < dim) && (col < dim);

const generateMaze = () => {
	const column = new Array(dim).fill();
	const maze = column.map(() => new Array(dim).fill(0));
	const buffer = [];
	let neighbors = [];
	const bufferNode = [xStart, yStart];
	buffer.push(bufferNode);

	while (buffer.length) {
		const currentNode = buffer[0];
		const [x, y] = currentNode;
		maze[x][y] = 1;

		if (x === xEnd && y === yEnd) {
			let blockNum = 0;
			maze.forEach((el) => {
				for (let i = 0; i < el.length; i += 1) {
					if (el[i] === 0) {
						blockNum += 1;
					}
				}
			});

			if (blockNum === blocks) {
				return maze;
			}

			return generateMaze();
		}

		buffer.shift();

		for (let i = 0; i < 4; i += 1) {
			const row = x + rowNum[i];
			const col = y + colNum[i];

			if (isValid(row, col)) {
				const newNode = [row, col];
				neighbors.push(newNode);
			}
		}
		if (neighbors.length) {
			const random = Math.floor(Math.random() * neighbors.length);
			neighbors.forEach((el, i) => {
				if (i === random) {
					buffer.push(el);
				}
			});
			neighbors = [];
		} else {
			buffer.push(currentNode);
		}
	}

	return 0;
};

module.exports = generateMaze;
