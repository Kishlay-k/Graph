export function recurMaze(sx, sy, width, height, grid, res) {
  if (width < 3 || height < 3) {
    return;
  }
  var hor = decideDir(width, height);
  if (hor) {
    var n = Math.floor(height / 2);
    var wy = Math.floor(Math.random() * n) * 2 + 1 + sy;
    var wx = sx;
    var gx = Math.floor(Math.random() * Math.floor(width / 2 + 1)) * 2 + sx;
    var wall = [];
    for (var i = 0; i < width; i++) {
      if (wx != gx) {
        wall.push([wy, wx]);
        // document.getElementById(wy * 100 + wx).style.backgroundColor = "black";
      }
      wx++;
    }
    res.push(wall);
    recurMaze(sx, sy, width, wy - sy, grid, res);
    recurMaze(sx, wy + 1, width, height - wy + sy - 1, grid, res);
  } else {
    var n = Math.floor(width / 2);
    var wx = Math.floor(Math.random() * n) * 2 + 1 + sx;
    var wy = sy;
    var gy = Math.floor(Math.random() * Math.floor(height / 2 + 1)) * 2 + sy;
    var wall = [];
    for (var i = 0; i < height; i++) {
      if (wy != gy) {
        wall.push([wy, wx]);
        // document.getElementById(wy * 100 + wx).style.backgroundColor = "black";
      }
      wy++;
    }
    res.push(wall);
    recurMaze(sx, sy, wx - sx, height, grid, res);
    recurMaze(wx + 1, sy, width - wx + sx - 1, height, grid, res);
  }
}

export function decideDir(width, height) {
  if (width > height) {
    return false;
  } else if (width < height) {
    return true;
  } else {
    return Math.random() > 0.5;
  }
}
