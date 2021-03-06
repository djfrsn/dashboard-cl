import React, { PropTypes } from 'react';
import classNames from 'classnames';


const Button = ({children, className, onClick, type = 'button'}) => {
  return (
    <button className={className} onClick={onClick} type={type}>
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  onClick: PropTypes.func,
  type: PropTypes.oneOf(['button', 'reset', 'submit'])
};

export default Button;
