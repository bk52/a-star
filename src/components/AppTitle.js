import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import GitHubIcon from "@material-ui/icons/GitHub";
import useStyles from "../styles";

const AppTitle = () => {
  const classes = useStyles();
  return (
    <AppBar position="static" className={classes.appBar}>
      <Toolbar className={classes.toolbar}>
        <Typography variant="h6" className={classes.title}>
          A* Algorithm
        </Typography>
        <Typography variant="button">Source code</Typography>
        <a target="_blank" href="https://github.com/bk52/a-star">
          <IconButton aria-label="github">
            <GitHubIcon className={classes.icon} />
          </IconButton>
        </a>
      </Toolbar>
    </AppBar>
  );
};

export default AppTitle;
