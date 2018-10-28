# Z3
This code represents binary-no walls maze solver. It is basically implementation of DFS algo in javascript, source:

https://en.wikipedia.org/wiki/Depth-first_search

There is also function that can generate random maze with specific number of unpassable squares.

In src/config file u can configure maze dimmension, starting and ending point of maze as well as number of blocks(unpassable squares):

``` javascript
// maze dimension
const dim = 15;

// select starting point
const xStart = 0;
const yStart = 3;

// select ending point
const xEnd = 11;
const yEnd = 13;

// number of blocks
const blocks = 170;
```
Use ```npm start``` to run this code.



