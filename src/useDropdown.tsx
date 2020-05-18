import React, { useState, FunctionComponent, Dispatch } from "react";

function useDropdown(label: string, defaultValue: string, options: string[]) {
  const [state, setState] = useState(defaultValue);
  const id = `use-dropdown ${label.replace(" ", "").toLowerCase()}`;
  const dropdown: FunctionComponent = () => {
    return (
      <label htmlFor={id}>
        {label}
        <select
          id={id}
          value={state}
          onChange={(e) => setState(e.target.value)}
          onBlur={(e) => setState(e.target.value)}
          disabled={options.length === 0}
        >
          <option>{defaultValue}</option>
          {options.map((item: string, index: number) => (
            <option key={index} value={item}>
              {item}
            </option>
          ))}
        </select>
      </label>
    );
  };
  return [state, dropdown, setState] as [
    string,
    FunctionComponent,
    Dispatch<string>
  ];
}
export default useDropdown;
