import { Radio, RadioGroupProps } from "antd";
import { forwardRef, useId } from "react";

type Props = RadioGroupProps & {
  radioOptions: { value: string; label: string }[];
  label?: string;
  required?: boolean;
  isError?: boolean;
  errorMessage?: string;
};

export const RadioInput = forwardRef<HTMLDivElement, Props>((props, ref) => {
  const {
    radioOptions,
    label,
    required,
    isError,
    errorMessage,
    ...otherProps
  } = props;

  const elementId = useId();

  return (
    <div className="form-item">
      {label && (
        <label aria-required={required} htmlFor={elementId}>
          {label}:
        </label>
      )}
      <Radio.Group ref={ref} {...otherProps} id={elementId}>
        {radioOptions.map((option) => (
          <Radio key={option.label} value={option.value}>
            {option.label}
          </Radio>
        ))}
      </Radio.Group>
      {isError && <div className="error-message">{errorMessage}</div>}
    </div>
  );
});
