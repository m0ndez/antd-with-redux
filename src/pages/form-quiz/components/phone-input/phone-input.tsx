import { Input, Select, Space } from "antd";
import { FC, useId } from "react";
import { PatternFormat } from "react-number-format";
import nationality from "../../../../mocks/nationality.json";
import { Controller, useFormState } from "react-hook-form";
import { UserData } from "../../../../types";
import { useLocale } from "../../../../hooks";

type Props = {
  countryCode?: string;
  name?: string;
  value?: string;
  onBlur?: () => void;
  onChange?: (params: { countryCode: string; value: string }) => void;
  placeHolder?: string;
  isError?: boolean;
  errorMessage?: string;
  required?: boolean;
  label?: string;
};

export const PhoneInput: FC<Props> = (props) => {
  const { placeHolder, label, required } = props;

  const { t } = useLocale();

  const elementId = useId();

  const phoneLocaleOptions = nationality.map((item) => ({
    value: item.dial_code,
    label: `${item.emoji}${item.dial_code}`,
    key: item.code,
  }));

  const { errors } = useFormState<UserData>();

  return (
    <div className="form-item">
      {label && (
        <label aria-required={required} htmlFor={elementId}>
          {label}:
        </label>
      )}
      <Space.Compact>
        <Controller<UserData>
          name="countryCode"
          render={({ field: { value, onChange, ...field } }) => {
            return (
              <Select
                options={phoneLocaleOptions}
                virtual={false}
                placeholder={
                  phoneLocaleOptions.find((item) => item.value === "+66")?.label
                }
                style={{ width: 150 }}
                showSearch
                onChange={(value) => {
                  onChange(value);
                }}
                value={value === "" ? undefined : value}
                {...field}
              />
            );
          }}
        />
        <Controller<UserData>
          name="phoneNumber"
          render={({ field: { value, onChange, ref, ...field } }) => {
            const formatPattern = value?.startsWith("0")
              ? "###-###-####"
              : "###-###-###";

            return (
              <PatternFormat
                id={elementId}
                getInputRef={ref}
                format={formatPattern}
                customInput={Input}
                placeholder={placeHolder}
                required={required}
                value={value}
                onValueChange={({ value }) => {
                  onChange(value);
                }}
                {...field}
              />
            );
          }}
        />
      </Space.Compact>
      {(!!errors?.phoneNumber || !!errors?.countryCode) && (
        <div className="error-message">
          {t(`form.mobile.errors.required`, "")}
        </div>
      )}
    </div>
  );
};
