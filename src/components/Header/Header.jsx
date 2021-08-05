import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Navbar from "./Navbar";
import PropTypes from "prop-types";

export default function Header(props) {
  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar>
        <Navbar
          handleSearchInput={props.handleSearchInput}
          favCount={props.favCount}
        />
      </AppBar>
      <Toolbar id="back-to-top-anchor" />
    </React.Fragment>
  );
}

Header.propTypes = {
  handleSearchInput: PropTypes.func.isRequired,
  favCount: PropTypes.number.isRequired,
};
