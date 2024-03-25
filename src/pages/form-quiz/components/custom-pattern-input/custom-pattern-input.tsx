import { Input, InputProps } from "antd";
import { ChangeEvent, FC } from "react";
import {
  PatternFormat,
  PatternFormatProps,
  usePatternFormat,
} from "react-number-format";

interface CustomPatternProps
  extends Omit<PatternFormatProps<InputProps>, "format"> {
  format?: string;
}

export const CustomPatternFormat: FC<CustomPatternProps> = (props) => {
  const {
    placeholder,
    onChange,
    format = "###-###-###",
    ...otherProps
  } = props;

  const { removeFormatting } = usePatternFormat({
    format,
  });

  const handlePatternChange = (event: ChangeEvent<HTMLInputElement>) => {
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
    <PatternFormat
      format={format}
      placeholder={placeholder}
      onChange={handlePatternChange}
      customInput={Input}
      {...otherProps}
    />
  );
};
