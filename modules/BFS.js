class queue {
  constructor() {
    var q = [];
    this.push = function (x) {
      q.push(x);
    };
    this.pop = function () {
      return q.shift();
    };
    this.isEmpty = function () {
      return q.length == 0;
    };
    this.size = function () {
      return q.length;
    };
  }
}

var dir = [
  [0, 1],
  [0, -1],
  [1, 0],
  [-1, 0],
];

export function BFS(grid) {
  var q = new queue();
  var tempGrid = JSON.parse(JSON.stringify(grid));
  var result = [];
  var st = [];
  for (var i = 0; i < grid.length; i++) {
    for (var j = 0; j < grid[0].length; j++) {
      if (grid[i][j] == "s") {
        st.push([i, j]);
        q.push([i, j]);
      }
    }
  }
  while (!q.isEmpty()) {
    var z = q.size();
    var curr = [];
    for (var i = 0; i < z; i++) {
      var temp = q.pop();
      for (var j = 0; j < dir.length; j++) {
        var x = temp[1] + dir[j][0];
        var y = temp[0] + dir[j][1];
        if(y>=0 && y<grid.length && x>=0 && x<grid[0].length && tempGrid[y][x] == "e") {
          tempGrid[y][x] = "v";
          curr.push([y, x]);
          q.push([y, x]);
        }
      }
    }
    result.push(curr);
  }
  return result;
}
