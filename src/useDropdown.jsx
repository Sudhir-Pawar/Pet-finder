import React, { useState } from "react";

function useDropdown(label, defaultValue, options) {
  const [state, setState] = useState(defaultValue);
  const id = `use-dropdown ${label.replace(" ", "").toLowerCase()}`;
  const dropdown = () => {
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
          {options.map((item, index) => (
            <option key={index} value={item}>
              {item}
            </option>
          ))}
        </select>
      </label>
    );
  };
  return [state, dropdown, setState];
}
export default useDropdown;
