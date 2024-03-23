import { SelectProps, RefSelectProps, Select } from "antd";
import { forwardRef, useId } from "react";

type Props = SelectProps & {
  label?: string;
  required?: boolean;
  isError?: boolean;
  errorMessage?: string;
};

export const SelectInput = forwardRef<RefSelectProps, Props>((props, ref) => {
  const { required, label, isError, errorMessage, ...otherProps } = props;

  const elementId = useId();

  return (
    <div className="form-item">
      {label && (
        <label aria-required={required} htmlFor={elementId}>
          {label}:
        </label>
      )}
      <Select ref={ref} {...otherProps} id={elementId} />
      {isError && <div className="error-message">{errorMessage}</div>}
    </div>
  );
});
