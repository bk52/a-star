import React, { useState } from "react";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import useStyles from "../styles";
import TargetPosIcon from "@material-ui/icons/GpsFixed";
import CurrentPosIcon from "@material-ui/icons/GpsNotFixed";
import WallIcon from "@material-ui/icons/Texture";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import RefreshIcon from "@material-ui/icons/Refresh";
import Notify from "./Notify";
import Examples from "./Examples";

const Settings = ({
  onChanged,
  settings,
  onStartClick,
  onRetryClick,
  onExampleSelected,
  message,
}) => {
  const classes = useStyles();
  return (
    <Grid container xs={12} spacing={2} style={{ marginTop: 0 }}>
      <Grid item xs={12}>
        <Typography variant="subtitle1">
          About{" "}
          <a
            target="_blank"
            href="https://en.wikipedia.org/wiki/Pathfinding#A*_algorithm"
          >
            {" "}
            A* Algorithm
          </a>
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h6">Examples</Typography>
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          disabled={settings.animating}
          id="standard-select-example"
          select
          label="Select an example (optional)"
          onChange={(e) => {
            onExampleSelected(e.target.value);
          }}
        >
          {Examples.map((example) => (
            <MenuItem key={example.id} value={example.id}>
              {example.title}
            </MenuItem>
          ))}
        </TextField>
      </Grid>
      <Grid item xs={4}>
        <Button
          disabled={settings.animating}
          fullWidth
          variant="contained"
          startIcon={<CurrentPosIcon />}
          className={classes.iconButtons}
          color={settings.selectedItem == "S" ? "primary" : ""}
          onClick={() => {
            onChanged("selectedItem", "S");
          }}
        >
          START POINT
        </Button>
      </Grid>
      <Grid item xs={4}>
        <Button
          disabled={settings.animating}
          fullWidth
          variant="contained"
          startIcon={<TargetPosIcon />}
          className={classes.iconButtons}
          color={settings.selectedItem == "T" ? "primary" : ""}
          onClick={() => {
            onChanged("selectedItem", "T");
          }}
        >
          TARGET POINT
        </Button>
      </Grid>
      <Grid item xs={4}>
        <Button
          disabled={settings.animating}
          fullWidth
          variant="contained"
          startIcon={<WallIcon />}
          className={classes.iconButtons}
          color={settings.selectedItem == "X" ? "primary" : ""}
          onClick={() => {
            onChanged("selectedItem", "X");
          }}
        >
          WALL
        </Button>
      </Grid>
      <Grid item xs={12}>
        {settings.retry ? (
          <Button
            disabled={!settings.retry}
            fullWidth
            variant="contained"
            startIcon={<RefreshIcon />}
            // style={{ backgroundColor: "#5cb85c", color: "white" }}
            onClick={onRetryClick}
          >
            RETRY
          </Button>
        ) : (
          <Button
            disabled={settings.animating}
            fullWidth
            variant="contained"
            startIcon={<PlayArrowIcon />}
            style={{ backgroundColor: "#5cb85c", color: "white" }}
            onClick={onStartClick}
          >
            ANIMATE
          </Button>
        )}
      </Grid>
      {message.text != "" && (
        <Grid item xs={12}>
          <Notify type={message.type} text={message.text} />
        </Grid>
      )}
    </Grid>
  );
};

export default Settings;
