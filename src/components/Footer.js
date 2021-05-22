import React from "react";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import BKLogo from "../assets/BK.png";

const Footer = () => {
  return (
    <Paper
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography>Created by</Typography>
      <a target="_blank" href="https://github.com/bk52">
        <img
          src={BKLogo}
          style={{ height: 40, width: "auto", paddingLeft: 8 }}
        ></img>
      </a>
    </Paper>
  );
};

export default Footer;
