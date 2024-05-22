import React from "react";
import ReactDOM from "react-dom";
import MyBrowser from "./MyBrowser";

const expandedFolders = ["/Common7", "/Common7/IDE", "/DIA SDK/bin/amd64"]; // Example paths to expand by default

ReactDOM.render(
  <MyBrowser expandedFolders={expandedFolders} />,
  document.getElementById("root")
);
