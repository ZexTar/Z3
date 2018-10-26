const {
	xStart,
	yStart,
	xEnd,
	yEnd,
	blocks,
} = require('./config');

const randomBlocks = (maze) => {
	const randX = Math.floor(10 * Math.random());
	const randY = Math.floor(10 * Math.random());
	const block = [randX, randY];

	if ((randX === xStart && randY === yStart) || (randX === xEnd && randY === yEnd) || maze[randX][randY] === 0) {
		return false;
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

module.exports = generateMaze;
