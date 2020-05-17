import React from 'react';

const Button = ({
  handleClick,
  disabled = false,
  label,
  ...rest
}) => {
  return (
    <button type="button" onClick={handleClick} disabled={disabled} {...rest}>
      {label}
    </button>
  );
};

export { Button };
