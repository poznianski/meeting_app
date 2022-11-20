import React from "react";

export const Quality = ({ color, name }) => {
  return (
    <span className={"badge m-1 bg-" + color}>
            {name}
        </span>
  );
};
