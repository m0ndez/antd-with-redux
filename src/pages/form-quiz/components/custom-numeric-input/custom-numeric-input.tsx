import { Input, InputProps } from "antd";
import { ChangeEvent, FC } from "react";
import {
  NumericFormat,
  NumericFormatProps,
  useNumericFormat,
} from "react-number-format";

interface CustomNumericProps extends NumericFormatProps<InputProps> {
  value?: string | number;
}

export const CustomNumericFormat: FC<CustomNumericProps> = ({
  placeholder,
  onChange,
  value,
  ...otherProps
}) => {
  const { removeFormatting } = useNumericFormat({});

  const handleNumberChange = (event: ChangeEvent<HTMLInputElement>) => {
    const formattedValue = removeFormatting?.(event.target.value);

    onChange?.({
      ...event,
      target: {
        ...event.target,
        value: formattedValue ?? "",
      },
    });
  };

  return (
    <NumericFormat
      placeholder={placeholder}
      thousandSeparator
      value={value}
      maxLength={10}
      allowNegative={false}
      allowLeadingZeros={false}
      decimalScale={2}
      onChange={handleNumberChange}
      customInput={Input}
      {...otherProps}
    />
  );
};
