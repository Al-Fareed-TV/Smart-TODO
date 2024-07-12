import React from "react";

const input = (props: any) => {
  const { className, placeholder, value, setText, ...rest } = props;
  return (
    <input
      placeholder={placeholder}
      value={value}
      onChange={(e) => setText(e.target.value)}
      className={className}
      {...rest}
    />
  );
};

export default input;
