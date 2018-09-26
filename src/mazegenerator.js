const [sCoord, eCoord, blocks] = require('./config');

const rowNum = [-1, 0, 0, 1];
const colNum = [0, -1, 1, 0];

const randomBlocks = (maze) => {
	const randX = Math.floor(10 * Math.random());
	const randY = Math.floor(10 * Math.random());
	const block = [randX, randY];

	if ((randX === sCoord[0] && randY === sCoord[1]) || (randX === eCoord[0] && randY === eCoord[1]) || maze[randX][randY] === 0) {
		return false;
	}

	for (let i = 0; i < 4; i += 1) {
		const sRow = sCoord[0] + rowNum[i];
		const sCol = sCoord[1] + colNum[i];
		const eRow = eCoord[0] + rowNum[i];
		const eCol = eCoord[1] + colNum[i];

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
