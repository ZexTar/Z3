# Z3
This code represents binary 10x10 maze solver without walls. It is basically implementation of DFS algo in javascript, source:

https://en.wikipedia.org/wiki/Depth-first_search

There is also function that can generate random maze with specific number of unpassable squares.

In src/config file u can configure starting and ending point of maze as well as number of blocks(unpassable squares):

```
//example:
// select starting point
const xStart = 0;
const yStart = 2;

// select ending point
const xEnd = 5;
const yEnd = 9;

// number of blocks
const blocks = 20;
```
Run npm start to run this code.



