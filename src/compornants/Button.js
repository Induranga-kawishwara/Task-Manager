import PropTypes from "prop-types";

const Button = ({ color, text, onClick }) => {
  return (
    <button
      onClick={onClick}
      style={{ backgroundColor: color }}
      className="btn"
    >
      {text}
    </button>
  );
};
Button.defaultProps = {
  color: "red",
};
Button.propTypes = {
  color: PropTypes.string,
  text: PropTypes.string.isRequired,
};

export default Button;
