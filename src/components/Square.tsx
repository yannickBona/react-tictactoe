import React from "react";

interface Props {
  value: string;
  onClick: any;
}

const Square: React.FC<Props> = ({ value, onClick }) => {
  return (
    <div className="square" onClick={onClick}>
      {value}
    </div>
  );
};

export default Square;
