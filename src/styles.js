import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  "@global": {
    "*::-webkit-scrollbar": {
      width: "0.4em",
      height: "0.4em",
    },
    "*::-webkit-scrollbar-track": {
      "-webkit-box-shadow": "inset 0 0 6px rgba(0,0,0,0.00)",
    },
    "*::-webkit-scrollbar-thumb": {
      backgroundColor: "rgba(0,0,0,.2)",
      outline: "1px solid slategrey",
    },
  },
  root: {
    flexGrow: 1,
  },
  main: {
    position: "absolute",
    width: "100%",
    height: "calc(100% - 64px)",
    backgroundColor: "#F5F5F5",
  },
  gridMain: {
    width: "100%",
    minHeight: "calc(100% - 100px)",
    paddingTop: 16,
    paddingLeft: 16,
  },
  appBar: {
    height: 64,
  },
  toolbar: {
    minHeight: 64,
  },
  title: {
    flexGrow: 1,
  },
  icon: {
    color: "white",
  },
  settingsPaper: {
    height: "100%",
    paddingLeft: 16,
  },
  iconButtons: {
    height: 80,
  },
  mapPaper: {
    height: "100%",
    overflow: "scroll",
    position: "relative",
  },
}));

export default useStyles;
