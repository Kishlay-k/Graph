import {
  createTable,
  refreshTable,
  resetConfig,
} from "./modules/tableModule.js";
import { BFS } from "./modules/BFS.js";
import { recurMaze } from "./modules/maze.js";
/* -------------------------------------------------------------------------- */
/*                              Declare variables                             */
/* -------------------------------------------------------------------------- */

//To store the number of rows and columns
var r = 35,
  c = 79;

//To store the current state to be filled in cell onclick
var st = [["e", "#C4C748"]];
//'e'-empty color #C4C748
//'w'-wall color #0D2414
//'s'-source color #46C16B
//'v'-visited color #5c93f5
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
      clr[i][j] = "#C4C748";
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
  st[0] = ["w", "#0D2414"];
};
srcBtn.onclick = function () {
  st[0] = ["s", "#46C16B"];
};
clrBtn.onclick = function () {
  st[0] = ["e", "#C4C748"];
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
  stepWiseColor(res, "#0D2414", true);
};

/* ----------------------------------- bfs ---------------------------------- */
var bredthFirstSearch = document.getElementById("BFS");
bredthFirstSearch.onclick = function () {
  resetConfig(clr, grid);
  vis = [];
  vis = BFS(grid);
  stepWiseColor(vis, "red", false);
};


/* -------------------------------------------------------------------------- */
/*                           DOM (create table etc)                           */
/* -------------------------------------------------------------------------- */

//creates grid of given dimensions
createTable(r, c, st, grid, clr);

//The folowing code block takes an array of array of coordinates and then colors them with the mentioned color
function stepWiseColor(result, color, indCell) {
  var i = 0;
    i = 0;
    myLoopT(result, color);
  function myLoopT() {
    setTimeout(function () {
      if (indCell == false) {
        colorVisited(result[i], color);
      }else{
        colorInd(result[i],color);
      }
      i++;
      if (i < result.length) {
        myLoopT();
      }
    }, 100);
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
function colorInd(indArr,color){
  var i =0;
  myLoopInd();
  function myLoopInd(){
    setTimeout(function(){
      clr[indArr[i][0]][indArr[i][1]] = color;
      refreshTable(clr);
      i++;
      if(i<indArr.length){
        myLoopInd();
      }
    },25);
  }
}

/* -------------------------------------------------------------------------- */
/*                                    test                                    */
/* -------------------------------------------------------------------------- */

var debug = document.getElementById("debug");
debug.onclick = function () {
  console.log("st", st);
  console.log("grid", grid);
  console.log("clr", clr);
  refreshTable(clr);
};

var clrBrd = document.getElementById("Empty");
clrBrd.onclick = function () {
  for (var i = 0; i < r; i++) {
    for (var j = 0; j < c; j++) {
      grid[i][j] = "e";
      clr[i][j] = "#C4C748";
    }
  }
  vis = [];
  refreshTable(clr);
};
