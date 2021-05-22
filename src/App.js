import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import useStyles from "./styles";
import AppTitle from "./components/AppTitle";
import SettingsForm from "./components/Settings";
import GridMap from "./components/Map";
import AStar from "./components/AStar";
import Examples from "./components/Examples";
import Footer from "./components/Footer";

export let setMapCell = (row, col, val) => {};
export let notifyMessage = (type, text) => {};
export let onSettingsChanged = (name, value) => {};
const searchRegExp = /1|2|3|4/g;
const replaceWith = "_";

const App = () => {
  const classes = useStyles();
  const [grid, setGrid] = useState([]);
  const [settings, setSettings] = useState({
    rowCount: 15,
    colCount: 25,
    cellSize: 50,
    selectedItem: "S",
    example: -1,
    animating: false,
    retry: false,
    startPoint: { row: -1, col: -1 },
    targetPoint: { row: -1, col: -1 },
  });
  const [message, setMessage] = useState({
    type: "",
    text: "",
  });

  const createMap = () => {
    setGrid(
      new Array(settings.rowCount).fill(
        new Array(settings.colCount).fill("_").join("")
      )
    );
  };

  useEffect(() => {
    createMap();
  }, []);

  setMapCell = (row, col, val) => {
    let _map = [...grid];
    _map[row] =
      _map[row].substring(0, col) + val + _map[row].substring(col + 1);
    setGrid(_map);
  };

  notifyMessage = (type, text) => {
    setMessage({ type, text });
  };

  onSettingsChanged = (name, value) => {
    if (name == "mapSize") {
      setSettings((prevState) => ({ ...prevState, ...value }));
    } else setSettings((prevState) => ({ ...prevState, [name]: value }));
  };

  const onExampleSelected = (id) => {
    if (id && id > 0) {
      let _example = Examples.filter((item) => item.id == id);
      if (_example && _example.length > 0) {
        setSettings((prevState) => ({
          ...prevState,
          example: id,
          startPoint: _example[0].startPoint,
          targetPoint: _example[0].targetPoint,
        }));
        setGrid(_example[0]._map);
      }
    }
  };

  const ResetMap = () => {
    let _map = [...grid];
    for (let i = 0; i < _map.length; i++) {
      _map[i] = _map[i].replace(searchRegExp, replaceWith);
    }
    {
      const { row, col } = settings.targetPoint;
      _map[row] =
        _map[row].substring(0, col) + "T" + _map[row].substring(col + 1);
    }
    {
      const { row, col } = settings.startPoint;
      _map[row] =
        _map[row].substring(0, col) + "S" + _map[row].substring(col + 1);
    }
    setGrid(_map);
  };

  const onCellClick = (row, col) => {
    let newCh = settings.selectedItem;
    const ch = grid[row][col];
    if (newCh == "S" || newCh == "T") {
      let pointName = newCh == "S" ? "startPoint" : "targetPoint";
      if (newCh == ch) {
        setSettings((prev) => ({ ...prev, [pointName]: { row: -1, col: -1 } }));
      } else {
        if (settings[pointName].row >= 0) return;
        setSettings((prev) => ({ ...prev, [pointName]: { row, col } }));
      }
      newCh = newCh == ch ? "_" : newCh;
      setMapCell(row, col, newCh);
    } else if (!(ch == "S" || ch == "T")) {
      newCh = newCh == ch ? "_" : newCh;
      setMapCell(row, col, newCh);
    }
  };

  const onStartClick = () => {
    if (settings.startPoint.row < 0) {
      notifyMessage("warning", "Select a cell for start point");
    } else if (settings.targetPoint.row < 0) {
      notifyMessage("warning", "Select a cell for target point");
    } else {
      onSettingsChanged("animating", true);
      notifyMessage("info", "Calculating...");
      AStar(
        grid,
        { row: settings.rowCount, col: settings.colCount },
        settings.startPoint
      );
    }
  };

  const onRetryClick = () => {
    ResetMap();
    setSettings((prevState) => ({
      ...prevState,
      retry: false,
      animating: false,
    }));
  };

  return (
    <div className={classes.root}>
      <AppTitle />
      <div className={classes.main}>
        <Grid container spacing={2} className={classes.gridMain}>
          <Grid item xs={12} md={8}>
            <Paper className={classes.mapPaper}>
              <GridMap
                settings={settings}
                grid={grid}
                onCellClick={onCellClick}
              />
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper className={classes.settingsPaper}>
              <SettingsForm
                onChanged={onSettingsChanged}
                settings={settings}
                onStartClick={onStartClick}
                onRetryClick={onRetryClick}
                onExampleSelected={onExampleSelected}
                message={message}
              />
            </Paper>
          </Grid>
        </Grid>
      </div>
      <div
        style={{
          backgroundColor: "yellow",
          position: "absolute",
          bottom: 0,
          width: "100%",
          heigth: 50,
        }}
      >
        <Footer />
      </div>
    </div>
  );
};

export default App;
