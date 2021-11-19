import { collors } from "./colors.js";
//Create a table and add click handlers
export function createTable(r, c, st, grid, clr) {
  var root = document.getElementById("root");
  var table = document.createElement("table");
  for (var i = 0; i < r; i++) {
    var row = document.createElement("tr");
    for (var j = 0; j < c; j++) {
      var cell = document.createElement("td");
      cell.setAttribute("id", i * 100 + j);
      //set background color of cell
      cell.style.backgroundColor = collors.emptyColor;
      row.append(cell);
    }
    table.append(row);
  }
  root.append(table);
  $("td").on("mousedown mouseover", function (e) {
    var x = $(this).attr("id") % 100;
    var y = Math.floor($(this).attr("id") / 100);
    if (e.buttons == 1 || e.buttons == 3) {
      if (grid[y][x] != st[0][0]) {
        grid[y][x] = st[0][0];
        clr[y][x] = st[0][1];
        document.getElementById(100 * y + x).style.backgroundColor = clr[y][x];
      }
      console.log($(this).attr("id"), x, y);
    }
  });
}

//refreshes the grid to the colors stored in clr
export function refreshTable(clr) {
  for (var i = 0; i < clr.length; i++) {
    for (var j = 0; j < clr[0].length; j++) {
      document.getElementById(100 * i + j).style.backgroundColor = clr[i][j];
    }
  }
}

//reset all the colors of the grid other than source and wall to empty
export function resetConfig(clr, grid) {
  for (var i = 0; i < clr.length; i++) {
    for (var j = 0; j < clr[0].length; j++) {
      if (grid[i][j] == "e") {
        clr[i][j] = collors.emptyColor;
      } else if (grid[i][j] == "w") {
        clr[i][j] = collors.wallColor;
      } else if (grid[i][j] == "s") {
        clr[i][j] = collors.sourceColor;
      }
      document.getElementById(100 * i + j).style.backgroundColor = clr[i][j];
    }
  }
}
