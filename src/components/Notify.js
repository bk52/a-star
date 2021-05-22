import React from "react";
import Typography from "@material-ui/core/Typography";
import WarningIcon from "@material-ui/icons/Warning";
import InfoIcon from "@material-ui/icons/Info";
import ErrorIcon from "@material-ui/icons/Cancel";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
const iconStyle = { color: "white", paddingLeft: 8 };
const NotifyIcon = (type) => {
  switch (type) {
    case "success":
      return <CheckCircleIcon style={iconStyle} />;
    case "error":
      return <ErrorIcon style={iconStyle} />;
    case "info":
      return <InfoIcon style={iconStyle} />;
    case "warning":
      return <WarningIcon style={iconStyle} />;
    default:
      return <InfoIcon style={iconStyle} />;
  }
};

const NotifyColor = (type) => {
  switch (type) {
    case "success":
      return "#5cb85c";
    case "error":
      return "#d9534f";
    case "info":
      return "#62B1F6";
    case "warning":
      return "#f0ad4e";
    default:
      return "#62B1F6";
  }
};

const Notify = ({ type, text }) => {
  return (
    <div
      style={{
        backgroundColor: NotifyColor(type),
        display: "flex",
        alignItems: "center",
        borderRadius: 4,
        height: 40,
      }}
    >
      {NotifyIcon(type)}
      <Typography variant="caption" style={{ color: "white", paddingLeft: 8 }}>
        {text}
      </Typography>
    </div>
  );
};

export default Notify;
