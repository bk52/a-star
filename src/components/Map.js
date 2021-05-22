import React, { useState } from "react";
import TargetPosIcon from "@material-ui/icons/GpsFixed";
import CurrentPosIcon from "@material-ui/icons/GpsNotFixed";
import WallIcon from "@material-ui/icons/Texture";

const CellIcon = (settings, grid, row, col) => {
  if (row == settings.startPoint.row && col == settings.startPoint.col) {
    return <CurrentPosIcon style={{ fontSize: 30 }} />;
  } else if (
    row == settings.targetPoint.row &&
    col == settings.targetPoint.col
  ) {
    return <TargetPosIcon style={{ fontSize: 30 }} />;
  } else if (grid[row][col] == "X") {
    return <WallIcon style={{ fontSize: 50 }} />;
  } else {
    return null;
  }
};

const CellColor = (cellValue) => {
  switch (cellValue) {
    case "1":
      return "#62B1F6"; // active node
    case "2":
      return "#f0ad4e"; // adjacent
    case "3":
      return "#d9534f"; // error
    case "4":
      return "#5cb85c"; // success
    default:
      return "#e5e5e5";
  }
};

const GridMap = ({ settings, grid, onCellClick }) => {
  return (
    <>
      {grid.map((row, rowIndex) => {
        return row.split("").map((col, colIndex) => (
          <div
            key={`cell${rowIndex}${colIndex}`}
            onClick={() => onCellClick(rowIndex, colIndex)}
            style={{
              backgroundColor: CellColor(grid[rowIndex][colIndex]),
              position: "absolute",
              border: "1px solid rgba(255, 255, 255, 1)",
              cursor: "crosshair",
              transition: "all 0.5s ease",
              WebkitTransition: "all 0.5s ease",
              MozTransition: "all 0.5s ease",
              textAlign: "center",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: settings.cellSize,
              width: settings.cellSize,
              top: rowIndex * settings.cellSize,
              left: colIndex * settings.cellSize,
            }}
          >
            {CellIcon(settings, grid, rowIndex, colIndex)}
          </div>
        ));
      })}
    </>
  );
};

const GridMapMemoized = React.memo(GridMap);
export default GridMapMemoized;
