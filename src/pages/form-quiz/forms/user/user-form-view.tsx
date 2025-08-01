import { FC } from "react";
import nationality from "../../../../mocks/nationality.json";
import { Controller, useFormContext } from "react-hook-form";
import { useLocale } from "../../../../hooks";
import { UserData } from "../../../../types";
import { Button, Col, Row } from "antd";
import dayjs from "dayjs";
import { NumericFormat, PatternFormat } from "react-number-format";
import {
  DatePickerInput,
  PhoneInput,
  RadioInput,
  SelectInput,
  TextInput,
} from "../../components";
import { defaultValues } from "./constants";

export const UserFormView: FC = () => {
  const { t } = useLocale();

  const prefixNameOptions = [
    {
      value: "mr",
      label: t("form.namePrefix.options.mr"),
    },
    {
      value: "mrs",
      label: t("form.namePrefix.options.mrs"),
    },
    {
      value: "miss",
      label: t("form.namePrefix.options.miss"),
    },
  ];

  const sexOptions = [
    {
      value: "male",
      label: t("form.sex.options.male"),
    },
    {
      value: "female",
      label: t("form.sex.options.female"),
    },
    {
      value: "other",
      label: t("form.sex.options.other"),
    },
  ];

  const nationalityOptions = nationality.map((item) => ({
    value: item.code,
    label: item.name,
  }));

  const { reset } = useFormContext<UserData>();

  return (
    <div className="form-container">
      <Row gutter={[16, 16]}>
        <Col span={24} md={6} lg={4}>
          <Controller<UserData>
            name="namePrefix"
            render={({
              field: { value, ...field },
              fieldState: { error, invalid },
            }) => (
              <SelectInput
                required
                label={t("form.namePrefix.label")}
                placeholder={t("form.namePrefix.placeholder")}
                options={prefixNameOptions}
                isError={invalid}
                errorMessage={t(`form.namePrefix.errors.${error?.message}`, "")}
                value={value === "" ? null : value}
                {...field}
              />
            )}
          />
        </Col>
        <Col span={24} md={9} lg={10}>
          <Controller<UserData>
            name="firstName"
            render={({ field, fieldState: { invalid, error } }) => (
              <TextInput
                required
                label={t("form.firstName.label")}
                placeholder={t("form.firstName.placeholder")}
                isError={invalid}
                errorMessage={t(`form.firstName.errors.${error?.message}`, "")}
                {...field}
              />
            )}
          />
        </Col>
        <Col span={24} md={9} lg={10}>
          <Controller<UserData>
            name="lastName"
            render={({ field, fieldState: { invalid, error } }) => (
              <TextInput
                required
                label={t("form.lastName.label")}
                placeholder={t("form.lastName.placeholder")}
                isError={invalid}
                errorMessage={t(`form.lastName.errors.${error?.message}`, "")}
                {...field}
              />
            )}
          />
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col span={24} md={6} lg={4}>
          <Controller<UserData>
            name="dob"
            render={({
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              field: { onChange, value, ref, ...field },
              fieldState: { invalid, error },
            }) => (
              <DatePickerInput
                label={t("form.dob.label")}
                placeholder={t("form.dob.placeholder")}
                required
                value={value === "" ? undefined : dayjs(value)}
                onChange={(_, dateStr) => {
                  onChange(dateStr);
                }}
                isError={invalid}
                errorMessage={t(`form.dob.errors.${error?.message}`, "")}
                {...field}
              />
            )}
          />
        </Col>
        <Col span={24} md={10} lg={8}>
          <Controller<UserData>
            name="nationality"
            render={({
              field: { value, ...field },
              fieldState: { invalid, error },
            }) => (
              <SelectInput
                label={t("form.nationality.label")}
                options={nationalityOptions}
                placeholder={t("form.nationality.placeholder")}
                value={value === "" ? null : value}
                required
                isError={invalid}
                errorMessage={t(
                  `form.nationality.errors.${error?.message}`,
                  ""
                )}
                {...field}
              />
            )}
          />
        </Col>
        <Col span={24} md={8} lg={8}>
          <Controller<UserData>
            name="citizenId"
            render={({
              field: { ref, onChange, ...field },
              fieldState: { invalid, error },
            }) => (
              <PatternFormat
                format="#-####-#####-###"
                customInput={TextInput}
                getInputRef={ref}
                required
                label={t("form.citizenId.label")}
                placeholder={t("form.citizenId.placeholder")}
                onValueChange={({ value }) => {
                  onChange(value);
                }}
                isError={invalid}
                errorMessage={
                  t(`form.citizenId.errors.${error?.message}`, "") as string
                }
                {...field}
              />
            )}
          />
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col>
          <Controller<UserData>
            name="sex"
            render={({ field, fieldState: { invalid, error } }) => (
              <RadioInput
                label={t("form.sex.label")}
                isError={invalid}
                errorMessage={t(`form.sex.errors.${error?.message}`, "")}
                required
                radioOptions={sexOptions}
                {...field}
              />
            )}
          />
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col span={24} md={10} lg={10}>
          <PhoneInput
            label={t("form.phoneNumber.label")}
            placeHolder={t("form.phoneNumber.placeholder")}
            required
          />
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col span={24} md={10} lg={10}>
          <Controller<UserData>
            name="passportNumber"
            render={({ field }) => (
              <TextInput
                label={t("form.passportNumber.label")}
                placeholder={t("form.passportNumber.placeholder")}
                {...field}
              />
            )}
          />
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col span={24} md={10} lg={10}>
          <Controller<UserData>
            name="expectedSalary"
            render={({
              field: { ref, ...field },
              fieldState: { invalid, error },
            }) => (
              <NumericFormat
                required
                getInputRef={ref}
                label={t("form.expectedSalary.label")}
                customInput={TextInput}
                thousandSeparator
                maxLength={10}
                allowNegative={false}
                allowLeadingZeros={false}
                placeholder={t("form.expectedSalary.placeholder")}
                isError={invalid}
                errorMessage={
                  t(
                    `form.expectedSalary.errors.${error?.message}`,
                    ""
                  ) as string
                }
                {...field}
              />
            )}
          />
        </Col>
        <Col span={24} md={14}>
          <div className="action-container">
            <Button htmlType="reset" onClick={() => reset(defaultValues)}>
              {t("action.clear")}
            </Button>
            <Button htmlType="submit" type="primary">
              {t("action.submit")}
            </Button>
          </div>
        </Col>
      </Row>
    </div>
  );
};
