import { setMapCell, notifyMessage, onSettingsChanged } from "../App";

let coordS = {};
let allVisited = [];
let visited = [];
let _path = [];
let pathFound = false;
let iteration = 0;
const MAX_ITERATION = 1700;
const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
const nodeVal = {
  active: "1",
  adjacent: "2",
  error: "3",
  success: "4",
};

const isVisited = (row, col) => {
  const _visited =
    visited.filter((item) => item.row == row && item.col == col).length > 0
      ? true
      : false;
  return _visited;
};

const FindAdjacent = (_map, MAP_SIZE, row, col, iter) => {
  let _adjents = [];
  if (row - 1 >= 0 && _map[row - 1][col] !== "X" && !isVisited(row - 1, col)) {
    _adjents.push({ row: row - 1, col: col, cost: iter });
  }
  if (
    row + 1 < MAP_SIZE.row &&
    _map[row + 1][col] !== "X" &&
    !isVisited(row + 1, col)
  ) {
    _adjents.push({ row: row + 1, col: col, cost: iter });
  }
  if (col - 1 >= 0 && _map[row][col - 1] !== "X" && !isVisited(row, col - 1)) {
    _adjents.push({ row: row, col: col - 1, cost: iter });
  }
  if (
    col + 1 < MAP_SIZE.col &&
    _map[row][col + 1] !== "X" &&
    !isVisited(row, col + 1)
  ) {
    _adjents.push({ row: row, col: col + 1, cost: iter });
  }
  return _adjents;
};

const FindPath = (row, col, iter) => {
  let prevCoord = visited.filter(
    (item) =>
      item.cost == iter - 1 &&
      ((Math.abs(item.row - row) <= 1 && item.col == col) ||
        (Math.abs(item.col - col) <= 1 && item.row == row))
  )[0];
  if (prevCoord) {
    _path.push(prevCoord);
    return FindPath(prevCoord.row, prevCoord.col, prevCoord.cost);
  }
};

const AStar = async (_map, MAP_SIZE, coordO) => {
  coordS = {};
  allVisited = [];
  visited = [];
  _path = [];
  pathFound = false;
  iteration = 0;
  allVisited.push({ row: coordO.row, col: coordO.col, cost: 0 });
  visited.push({ row: coordO.row, col: coordO.col, cost: 0 });

  while (!pathFound) {
    iteration += 1;
    if (iteration > MAX_ITERATION) {
      notifyMessage("error", "Max iteration reached! Target not found.");
      onSettingsChanged("retry", true);
      break;
    }
    let newSearch = visited.filter((item) => item.cost == iteration - 1);
    for (let j = 0; j < newSearch.length; j++) {
      if (pathFound) break;
      let _adjents = FindAdjacent(
        _map,
        MAP_SIZE,
        newSearch[j].row,
        newSearch[j].col,
        iteration
      );
      if (_adjents.length > 0) {
        for (let i = 0; i < _adjents.length; i++) {
          const _adj = _adjents[i];
          allVisited.push(_adj);
          visited.push(_adj);
          if (_map[_adj.row][_adj.col] == "T") {
            coordS = { row: _adj.row, col: _adj.col, cost: _adj.cost };
            notifyMessage("success", "Target found!");
            pathFound = true;
            break;
          }
        }
      } else {
        visited = visited.filter(
          (visit) =>
            !(
              visit.row == newSearch[j].row &&
              visit.col == newSearch[j].col &&
              visit.cost == newSearch[j].cost
            )
        );
      }
    }
  }

  for (let i = 0; i < allVisited.length; i++) {
    await sleep(50);
    setMapCell(allVisited[i].row, allVisited[i].col, nodeVal.adjacent);
  }

  if (pathFound) {
    _path.push(coordS);
    FindPath(coordS.row, coordS.col, coordS.cost);
    notifyMessage("success", `Target found! Path Length: ${_path.length}`);
    for (let i = 0; i < _path.length; i++) {
      await sleep(50);
      setMapCell(_path[i].row, _path[i].col, nodeVal.success);
    }
    onSettingsChanged("retry", true);
  }
};

export default AStar;
