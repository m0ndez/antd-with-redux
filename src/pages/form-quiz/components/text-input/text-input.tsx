import { Input, InputProps, InputRef } from "antd";
import { forwardRef, useId } from "react";

type Props = InputProps & {
  label?: string;
  isError?: boolean;
  errorMessage?: string;
};

export const TextInput = forwardRef<InputRef, Props>((props, ref) => {
  const { isError, errorMessage, label, required, ...otherProps } = props;
  const elementId = useId();

  return (
    <div className="form-item">
      {label && (
        <label aria-required={required} htmlFor={elementId}>
          {label}:
        </label>
      )}
      <Input {...otherProps} id={elementId} ref={ref} />
      {isError && <div className="error-message">{errorMessage}</div>}
    </div>
  );
});
