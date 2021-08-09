import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Navbar from "./Navbar";

export default function Header(props) {
  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar>
        <Navbar />
      </AppBar>
      <Toolbar id="back-to-top-anchor" />
    </React.Fragment>
  );
}

