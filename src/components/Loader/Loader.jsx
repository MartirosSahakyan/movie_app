import PropTypes from "prop-types";
import CircularProgress from "@material-ui/core/CircularProgress";

export default function Loader({ size }) {
  return <CircularProgress size={size} />;
}

Loader.propTypes = {
  size: PropTypes.number,
};
