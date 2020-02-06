import React from "react";

function ThemedReactSelect({ disabled, hasErrors, id, instanceId, ...props }) {
  // See TODO in propTypes definition
  // eslint-disable-next-line react/destructuring-assignment
  const isTouched = Array.isArray(props.isTouched) ? true : props.isTouched; // coerce to boolean

  const getOuterColor = () => {
    if (hasErrors) {
      return errorDeep;
    }

    return successDeep;
  };

  return (
    <ReactSelect
      {...props}
      instanceId={instanceId || id}
      disabled={disabled}
      styles={{
        control: base => {
          return {
            ...base,
            borderColor: isTouched
              ? getOuterColor()
              : `rgba(${rgbValuesSecondary}, 0.5)`,
            boxShadow: isTouched ? `0 0 1px 1px ${getOuterColor()}` : "none",
            fontSize: "1.125rem",
            marginTop: "0.25rem",
            marginBottom: "1rem",
            minWidth: "250px",
            padding: "0.25rem",
            opacity: disabled ? "0.5" : "1",
            outline: "none",
            "&:hover": {
              cursor: disabled ? "not-allowed" : "text"
            }
          };
        },
        clearIndicator: base => {
          return {
            ...base,
            "&:hover": {
              cursor: disabled ? "not-allowed" : "pointer"
            }
          };
        },
        dropdownIndicator: base => {
          return {
            ...base,
            "&:hover": {
              cursor: disabled ? "not-allowed" : "pointer"
            }
          };
        },
        multiValueRemove: base => {
          return {
            ...base,
            "&:hover": {
              cursor: disabled ? "not-allowed" : "pointer"
            }
          };
        }
      }}
      theme={theme => {
        return {
          ...theme,
          borderRadius: 3,
          colors: {
            ...theme.colors,
            primary,
            primary75: `rgba(${rgbValuesPrimary}, 0.75)`,
            primary50: `rgba(${rgbValuesPrimary}, 0.50)`,
            primary25: `rgba(${rgbValuesPrimary}, 0.25)`
          }
        };
      }}
    />
  );
}

export default ThemedReactSelect;
