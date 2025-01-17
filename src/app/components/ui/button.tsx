import React from "react";

const Button = (props: any) => {
  const {className , children,...rest } =
    props;

  return (
      <button
      className={className}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
