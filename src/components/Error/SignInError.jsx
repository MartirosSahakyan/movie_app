import PropTypes from "prop-types";
import Alert from "@material-ui/lab/Alert";

export default function SignInError({ message }) {
  return <Alert severity="error">{message}</Alert>;
}

SignInError.propTypes = {
  message: PropTypes.string.isRequired,
};
