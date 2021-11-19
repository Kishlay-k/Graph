import {
  createTable,
  refreshTable,
  resetConfig,
} from "./modules/tableModule.js";
import { BFS } from "./modules/BFS.js";
import { DFS } from "./modules/DFS.js";
import { recurMaze } from "./modules/maze.js";
import { collors } from "./modules/colors.js";
/* -------------------------------------------------------------------------- */
/*                              Declare variables                             */
/* -------------------------------------------------------------------------- */

//To store the number of rows and columns
var r = 35,
  c = 79;

//To store the current state to be filled in cell onclick
var st = [["e", collors.emptyColor]];
//'e'-empty color collors.emptyColor
//'w'-wall color collors.wallColor
//'s'-source color collors.sourceColor
//'v'-visited color collors.pathColor
//'#number'-weight of the cell (dijkstra)

//To store the states of cells
var grid = [];
var vis = [];
var res = [];
//To store the color of cells
var clr = [];

/* -------------------------------------------------------------------------- */
/*                              Initialise arrays                             */
/* -------------------------------------------------------------------------- */
function initialiseGrid(clr, grid) {
  for (var i = 0; i < r; i++) {
    grid[i] = [];
    clr[i] = [];
    for (var j = 0; j < c; j++) {
      grid[i][j] = "e";
      clr[i][j] = collors.emptyColor;
    }
  }
}
initialiseGrid(clr, grid);
/* -------------------------------------------------------------------------- */
/*                             button and onclick                             */
/* -------------------------------------------------------------------------- */

var wallBtn = document.getElementById("wall");
var srcBtn = document.getElementById("source");
var clrBtn = document.getElementById("clear");
wallBtn.onclick = function () {
  st[0] = ["w", collors.wallColor];
};
srcBtn.onclick = function () {
  st[0] = ["s", collors.sourceColor];
};
clrBtn.onclick = function () {
  st[0] = ["e", collors.emptyColor];
};

/* ------------------------------ maze creation ----------------------------- */
var recursiveMaze = document.getElementById("one");
recursiveMaze.onclick = function () {
  initialiseGrid(clr, grid);
  res = [];
  recurMaze(0, 0, c, r, grid, res);
  for (var i = 0; i < res.length; i++) {
    for (var j = 0; j < res[i].length; j++) {
      grid[res[i][j][0]][res[i][j][1]] = "w";
    }
  }
  stepWiseColor(res, collors.wallColor, false, 10, 10);
};

/* ----------------------------------- bfs ---------------------------------- */
var bredthFirstSearch = document.getElementById("BFS");
bredthFirstSearch.onclick = function () {
  resetConfig(clr, grid);
  vis = [];
  vis = BFS(grid);
  stepWiseColor(vis, collors.pathColor, false, 50, 25);
};

/* -------------------------------------------------------------------------- */
/*                           DOM (create table etc)                           */
/* -------------------------------------------------------------------------- */

//creates grid of given dimensions
createTable(r, c, st, grid, clr);

//The folowing code block takes an array of array of coordinates and then colors them with the mentioned color
function stepWiseColor(result, color, indCell, dur1, dur2) {
  var i = 0;
  i = 0;
  myLoopT(result, color);
  function myLoopT() {
    setTimeout(function () {
      if (indCell == false) {
        colorVisited(result[i], color);
      } else {
        colorInd(result[i], color, dur2);
      }
      i++;
      if (i < result.length) {
        myLoopT();
      }
    }, dur1);
  }
}

//Takes an array of visited cells and colors them (whole array instatntly)
function colorVisited(visit, color) {
  for (var i = 0; i < visit.length; i++) {
    clr[visit[i][0]][visit[i][1]] = color;
  }
  refreshTable(clr);
}

//Takes an array of visited cells and colors them (each cell with a gap in time)
function colorInd(indArr, color, dur) {
  var i = 0;
  myLoopInd();
  function myLoopInd() {
    setTimeout(function () {
      clr[indArr[i][0]][indArr[i][1]] = color;
      refreshTable(clr);
      i++;
      if (i < indArr.length) {
        myLoopInd();
      }
    }, dur);
  }
}

/* -------------------------------------------------------------------------- */
/*                                    test                                    */
/* -------------------------------------------------------------------------- */

// var debug = document.getElementById("debug");
// debug.onclick = function () {
//   console.log("st", st);
//   console.log("grid", grid);
//   console.log("clr", clr);
//   refreshTable(clr);
// };

var clrBrd = document.getElementById("Empty");
clrBrd.onclick = function () {
  for (var i = 0; i < r; i++) {
    for (var j = 0; j < c; j++) {
      grid[i][j] = "e";
      clr[i][j] = collors.emptyColor;
    }
  }
  vis = [];
  refreshTable(clr);
};

/* -------------------------------------------------------------------------- */
/*                                    test                                    */
/* -------------------------------------------------------------------------- */

var depthFirstSearch = document.getElementById("DFS");
depthFirstSearch.onclick = function () {
  resetConfig(clr, grid);
  vis = [];
  vis = DFS(grid);
  colorInd(vis, collors.pathColor, 20);
};

/* -------------------------------------------------------------------------- */
/*                                     exp                                    */
/* -------------------------------------------------------------------------- */

var weight = [];
function initialiseWeight(weight) {
  for (var i = 0; i < r; i++) {
    weight[i] = [];
    for (var j = 0; j < c; j++) {
      weight[i][j] = Math.floor(Math.random() * weightedColor.length);
    }
  }
  console.log(weight);
  //color each table cell with the weight
  for (var i = 0; i < r; i++) {
    for (var j = 0; j < c; j++) {
      document.getElementById(i * 100 + j).style.backgroundColor =
        weightedColor[weight[i][j]];
    }
  }
}

var wght = document.getElementById("weight");
//onclick runs initialiseWeight
wght.onclick = function () {
  initialiseWeight(weight);
};
var weightedColor = [
  "#ffffff",
  "#e6e6e6",
  "#cccccc",
  "#b3b3b3",
  "#999999",
  "#808080",
  "#666666",
  "#4c4c4c",
  "#333333",
  "#191919",
  "#000000",
];
