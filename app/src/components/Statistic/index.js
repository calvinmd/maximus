import React from 'react';

const Statistic = ({
  label,
  value,
}) => {
  return (
    <div className="flex flex-col">
      <span className="text-xs font-bold">{label}</span>
      <span className="text-4xl">{value}</span>
    </div>
  );
};

export { Statistic };
