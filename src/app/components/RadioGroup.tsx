import React, { useState } from "react";

interface RadioGroupProps {
  options: { label: string; value: string; color: string }[];
  name: string;
  selectedValue: string;
  onChange: (value: string) => void;
}

const RadioGroup: React.FC<RadioGroupProps> = ({
  options,
  name,
  selectedValue,
  onChange,
}) => {
  return (
    <div>
      {options.map((option) => (
        <label
          style={{ backgroundColor: "rgb(255 255 255 / 38%)" }}
          key={option.value}
          className="flex-row items-center mr-3  p-1 rounded-xl"
        >
          <input
            style={{ accentColor: option.color }}
            type="radio"
            name={name}
            value={option.value}
            checked={selectedValue === option.value}
            onChange={() => onChange(option.value)}
            className="mr-1"
          />
          <span style={{ color: `${option.color}` }}>{option.label}</span>
        </label>
      ))}
    </div>
  );
};

export default RadioGroup;
