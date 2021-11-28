import MinHeap from "./minHeap.js";

function dijkstra(weight,sx = 0) {
  var dir = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
  ];
  var heap = new MinHeap();
  var distance = [];
  var parent = [];
  var seq = [];
  for (let i = 0; i < weight.length; i++) {
    distance[i] = [];
    parent[i] = [];
    for (let j = 0; j < weight[0].length; j++) {
      distance[i].push(Infinity);
      parent[i].push(null);
    }
  }
  heap.insert(weight[0][0], sx, sx);
  distance[Math.floor(sx/100)][sx%100] = weight[Math.floor(sx/100)][sx%100];
  parent[Math.floor(sx/100)][sx%100] = sx;
  while(heap.isNotEmpty()) {
    let curr = heap.remove();
    seq.push([Math.floor(curr[1]/100),curr[1]%100]);
    let start = [Math.floor(curr[1]/100), curr[1]%100];
    let d = curr[0];
    for (let i = 0; i < dir.length; i++) {
      let next = [start[0] + dir[i][0], start[1] + dir[i][1]];
      if (next[0] >= 0 && next[0] < weight.length && next[1] >= 0 && next[1] < weight[0].length) {
        if(d+weight[next[0]][next[1]] < distance[next[0]][next[1]]) {
          distance[next[0]][next[1]] = d+weight[next[0]][next[1]];
          parent[next[0]][next[1]] = curr[1];
          heap.insert(distance[next[0]][next[1]], next[0]*100+next[1], curr[1]*100+curr[2]);
        }
      }
    }
  }
  return [distance, parent, seq];
}



export default dijkstra;