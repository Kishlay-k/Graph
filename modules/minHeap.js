class MinHeap {
  constructor() {
    //
    let heap = [null];
    this.print = function () {
      console.log(heap);
    };
    this.insert = function (dist, toNode, fromNode) {
      heap.push([dist, toNode, fromNode]);
      if (heap.length > 2) {
        let idx = heap.length - 1;
        while (heap[idx][0] < heap[Math.floor(idx / 2)][0]) {
          if (idx >= 1) {
            [heap[Math.floor(idx / 2)], heap[idx]] = [
              heap[idx],
              heap[Math.floor(idx / 2)],
            ];
            if (Math.floor(idx / 2) > 1) {
              idx = Math.floor(idx / 2);
            } else {
              break;
            }
          }
        }
      }
    };

    this.remove = function () {
      let smallest = heap[1];
      if (heap.length > 2) {
        heap[1] = heap[heap.length - 1];
        heap.splice(heap.length - 1);
        if (heap.length == 3) {
          if (heap[1][0] > heap[2][0]) {
            [heap[1], heap[2]] = [heap[2], heap[1]];
          }
          return smallest;
        }
        let i = 1;
        let left = 2 * i;
        let right = 2 * i + 1;
        while (
          (heap[left] || heap[right]) &&
          (heap[i][0] >= heap[left][0] || heap[i][0] >= heap[right][0])
        ) {
          if (heap[left][0] < heap[right][0]) {
            [heap[i], heap[left]] = [heap[left], heap[i]];
            i = 2 * i;
          } else {
            [heap[i], heap[right]] = [heap[right], heap[i]];
            i = 2 * i + 1;
          }
          left = 2 * i;
          right = 2 * i + 1;
          if (heap[left] == undefined || heap[right] == undefined) {
            break;
          }
        }
      } else if (heap.length == 2) {
        heap.splice(1, 1);
      } else {
        return null;
      }
      return smallest;
    };

    this.sort = function () {
      let result = new Array();
      while (heap.length > 1) {
        result.push(this.remove());
      }
      return result;
    };

    this.isEmpty = function () {
      return heap.length == 1;
    };

    this.isNotEmpty = function () {
      return heap.length > 1;
    };
  }
}

export default MinHeap;
