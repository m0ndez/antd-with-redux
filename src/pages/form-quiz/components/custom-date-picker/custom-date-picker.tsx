import { DatePicker, DatePickerProps } from "antd";
import dayjs from "dayjs";
import { FC } from "react";

interface CustomDatePickerProps extends DatePickerProps {}

export const CustomDatePicker: FC<CustomDatePickerProps> = (props) => {
  const { value, ...otherProps } = props;

  return (
    <DatePicker
      needConfirm={false}
      allowClear={false}
      value={!value ? undefined : dayjs(value)}
      disabledDate={(current) => current && current < dayjs().endOf("day")}
      {...otherProps}
    />
  );
};
