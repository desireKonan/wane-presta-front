import React from "react";

export default function Selector(props) {
  const {
    label,
    placeholder,
    selectValue, // The currently selected value
    onChange, // Function to handle when a selection is made
    selectData, // Array of options to display
    defaultValue, // The default value for the selector
    errorMessage, // Error message to display in case of validation failure
    selectId, // Whether to use the _id field for value or not
    paginationOption, // Whether to show the placeholder or not
    id, // id for the select input
    labelShow = true, // Whether to show the label
  } = props;

  return (
    <div className={`inputData  flex-row justify-content-start text-start`}>
      {labelShow && (
        <label htmlFor={id} className="label-selector-custom">
          {label}
        </label>
      )}

      <select
        id={id}
        className="rounded-2"
        value={selectValue || ""} // Ensure fallback if no value is provided
        label={label}
        placeholder={placeholder}
        defaultValue={defaultValue || ""} // Provide fallback if no default value
        onChange={onChange} // Trigger the change function when an option is selected
        style={{ borderRadius: "12px" }}
      >
        {paginationOption !== false && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {selectData?.map((item, index) => {
          const displayValue = selectId
            ? item.fullName || item?.name // Use `fullName` or `name` if selectId is true
            : typeof item === "string"
            ? item.toLowerCase()
            : item;

          return (
            <option
              value={
                selectId
                  ? item._id // Use _id if selectId is true
                  : typeof item === "string"
                  ? item.toLowerCase() // Convert string values to lowercase
                  : item
              }
              key={index}
              className="py-2"
            >
              {displayValue}
            </option>
          );
        })}
      </select>

      {errorMessage && <p className="errorMessage">{errorMessage}</p>}
    </div>
  );
}
