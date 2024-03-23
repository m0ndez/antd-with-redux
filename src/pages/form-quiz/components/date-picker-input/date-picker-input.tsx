import { DatePicker, DatePickerProps } from "antd";
import dayjs from "dayjs";
import { FC, useId } from "react";

type Props = DatePickerProps & {
  label?: string;
  required?: boolean;
  isError?: boolean;
  errorMessage?: string;
};

export const DatePickerInput: FC<Props> = (props) => {
  const { label, required, isError, errorMessage, ...otherProps } = props;

  const elementId = useId();

  return (
    <div className="form-item">
      {label && (
        <label aria-required={required} htmlFor={elementId}>
          {label}:
        </label>
      )}
      <DatePicker
        needConfirm={false}
        allowClear={false}
        disabledDate={(current) => current && current < dayjs().endOf("day")}
        {...otherProps}
      />
      {isError && <div className="error-message">{errorMessage}</div>}
    </div>
  );
};
