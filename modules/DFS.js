class Stack {
  constructor() {
    this.data = [];
  }

  push(item) {
    this.data.push(item);
  }

  pop() {
    return this.data.pop();
  }

  peek() {
    return this.data[this.data.length - 1];
  }

  isEmpty() {
    return this.data.length === 0;
  }
}

export function DFS(grid) {
  var dir = [
    [0, -1],
    [1, 0],
    [0, 1],
    [-1, 0],
  ];
  var stack = new Stack();
  var startNode = [];
  var vis = [];
  for (var i = 0; i < grid.length; i++) {
    vis[i] = [];
    for (var j = 0; j < grid[0].length; j++) {
      vis[i][j] = false;
      if (grid[i][j] == "s") {
        startNode = [i, j];
      }
    }
  }
  stack.push(startNode);
  var result = [];
  while (!stack.isEmpty()) {
    var curr = stack.pop();
    var x = curr[1],y = curr[0];
    if(x<0 || x>=grid[0].length || y<0 || y>=grid.length){
      continue;
    }
    vis[y][x] = true;
    result.push([y,x]);
    for (var i = 0; i < dir.length; i++) {
      var newX = x + dir[i][1];
      var newY = y + dir[i][0];
      if(newX<0 || newX>=grid[0].length || newY<0 || newY>=grid.length){
        continue;
      }
      if (grid[newY][newX] != "e") {
        continue;
      }
      if (vis[newY][newX] == false) {
        stack.push([newY, newX]);
      }
    }
  }
  result.shift();
  return result;
}
