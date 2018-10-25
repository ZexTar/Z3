const {
	xStart,
	yStart,
	xEnd,
	yEnd,
	blocks,
} = require('./config');

const rowNum = [-1, 0, 0, 1];
const colNum = [0, -1, 1, 0];

const randomBlocks = (maze) => {
	const randX = Math.floor(10 * Math.random());
	const randY = Math.floor(10 * Math.random());
	const block = [randX, randY];

	if ((randX === xStart && randY === yStart) || (randX === xEnd && randY === yEnd) || maze[randX][randY] === 0) {
		return false;
	}

	for (let i = 0; i < 4; i += 1) {
		const sRow = xStart + rowNum[i];
		const sCol = yStart + colNum[i];
		const eRow = xEnd + rowNum[i];
		const eCol = yEnd + colNum[i];

		if ((randX === sRow && randY === sCol) || (randX === eRow && randY === eCol)) {
			return false;
		}
	}

	return block;
};

const generateMaze = () => {
	let genBlk = blocks;
	const col = new Array(10).fill();
	const maze = col.map(() => new Array(10).fill(1));

	while (genBlk) {
		const block = randomBlocks(maze);
		if (block) {
			const [x, y] = block;
			maze[x][y] = 0;
			genBlk -= 1;
		}
	}

	return maze;
};

module.exports = generateMaze();
