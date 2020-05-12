import React from 'react';

const Button = ({
  handleClick,
  disabled=false,
  label,
}) => {
  return (
    <button type="button" onClick={handleClick} disabled={disabled}>
      {label}
    </button>
  );
};

export { Button };
