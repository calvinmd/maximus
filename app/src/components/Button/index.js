import React from 'react';

const Button = ({
  type = "button",
  handleClick,
  disabled = false,
  label,
  ...rest
}) => {
  return (
    <button type={type} onClick={handleClick} disabled={disabled} {...rest}>
      {label}
    </button>
  );
};

export { Button };
