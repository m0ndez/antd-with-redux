import { Button, Col, Form, Input, Radio, Row, Select } from "antd";
import { FC } from "react";
import { UserData } from "../../../../types";
import { userFormSchema } from "../../../../schemas";
import { useLocale } from "../../../../hooks";
import {
  nationalityOptions,
  phoneLocaleOptions,
  prefixNameOptions,
  sexOptions,
} from "./constants";

import { CustomNumericFormat } from "../../components/custom-numeric-input";
import { CustomPatternFormat } from "../../components/custom-pattern-input";
import { CustomDatePicker } from "../../components/custom-date-picker";

export const UserAntdFormView: FC = () => {
  const { t } = useLocale();

  const handleValidateAntdForm = <T extends keyof UserData>(
    fieldName: T,
    value: UserData[typeof fieldName]
  ) => {
    const result = userFormSchema.shape[fieldName].safeParse(value);

    if (result.success) {
      return Promise.resolve();
    }

    const errorMessage = t(
      `form.${fieldName}.errors.${result.error.errors[0].message.toLowerCase()}`,
      ""
    );

    return Promise.reject(errorMessage);
  };

  const form = Form.useFormInstance();

  const watchCountryCode = Form.useWatch(["countryCode"], form);

  const watchPhoneNumber = Form.useWatch(["phoneNumber"], form);

  const formatPattern = watchPhoneNumber?.startsWith("0")
    ? "###-###-####"
    : "###-###-###";

  return (
    <div className="form-container">
      <Row gutter={[16, 16]}>
        <Col span={24} md={6} lg={4}>
          <Form.Item<UserData>
            colon={false}
            name="namePrefix"
            label={t("form.namePrefix.label")}
            required
            rules={[
              () => ({
                validator({}, value) {
                  return handleValidateAntdForm("namePrefix", value);
                },
              }),
            ]}
          >
            <Select
              placeholder={t("form.namePrefix.placeholder")}
              options={prefixNameOptions(t)}
            />
          </Form.Item>
        </Col>
        <Col span={24} md={9} lg={10}>
          <Form.Item<UserData>
            colon={false}
            name="firstName"
            label={t("form.firstName.label")}
            required
            rules={[
              () => ({
                validator({}, value) {
                  return handleValidateAntdForm("firstName", value);
                },
              }),
            ]}
          >
            <Input placeholder={t("form.firstName.placeholder")} />
          </Form.Item>
        </Col>

        <Col span={24} md={9} lg={10}>
          <Form.Item<UserData>
            colon={false}
            name="lastName"
            label={t("form.lastName.label")}
            required
            rules={[
              () => ({
                validator({}, value) {
                  return handleValidateAntdForm("lastName", value);
                },
              }),
            ]}
          >
            <Input placeholder={t("form.lastName.placeholder")} />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col span={24} md={6} lg={4}>
          <Form.Item<UserData>
            colon={false}
            name="dob"
            label={t("form.dob.label")}
            required
            normalize={(value) => value?.format("YYYY-MM-DD")}
            rules={[
              () => ({
                validator({}, value) {
                  return handleValidateAntdForm("dob", value);
                },
              }),
            ]}
          >
            <CustomDatePicker
              placeholder={t("form.dob.placeholder")}
              style={{
                width: "100%",
              }}
            />
          </Form.Item>
        </Col>
        <Col span={24} md={10} lg={8}>
          <Form.Item<UserData>
            colon={false}
            name="nationality"
            label={t("form.nationality.label")}
            required
            rules={[
              () => ({
                validator({}, value) {
                  return handleValidateAntdForm("nationality", value);
                },
              }),
            ]}
          >
            <Select
              showSearch
              options={nationalityOptions}
              placeholder={t("form.nationality.placeholder")}
            />
          </Form.Item>
        </Col>
        <Col span={24} md={8} lg={8}>
          <Form.Item<UserData>
            colon={false}
            name="citizenId"
            label={t("form.citizenId.label")}
            required
            rules={[
              () => ({
                validator({}, value) {
                  return handleValidateAntdForm("citizenId", value);
                },
              }),
            ]}
          >
            <CustomPatternFormat
              format="#-####-#####-###"
              type="tel"
              placeholder={t("form.citizenId.placeholder")}
              customInput={Input}
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col>
          <Form.Item<UserData>
            colon={false}
            name="sex"
            label={t("form.sex.label")}
            required
            rules={[
              () => ({
                validator({}, value) {
                  return handleValidateAntdForm("sex", value);
                },
              }),
            ]}
          >
            <Radio.Group>
              {sexOptions(t).map((option) => (
                <Radio key={option.label} value={option.value}>
                  {option.label}
                </Radio>
              ))}
            </Radio.Group>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col span={24} md={10} lg={10}>
          <Form.Item<UserData>
            colon={false}
            name="phoneNumber"
            label={t("form.phoneNumber.label")}
            required
            normalize={(value) =>
              value.startsWith("0") ? value.substring(1) : value
            }
            rules={[
              () => ({
                validator({}, value) {
                  if (!watchCountryCode) {
                    return Promise.reject(
                      t("form.phoneNumber.errors.required", "")
                    );
                  }

                  return handleValidateAntdForm("phoneNumber", value);
                },
              }),
            ]}
          >
            <CustomPatternFormat
              format={formatPattern}
              placeholder={t("form.phoneNumber.placeholder", "")}
              customInput={Input}
              addonBefore={
                <Form.Item<UserData> noStyle name="countryCode">
                  <Select
                    options={phoneLocaleOptions}
                    virtual={false}
                    placeholder={
                      phoneLocaleOptions.find((item) => item.value === "+66")
                        ?.label
                    }
                    style={{ width: 150 }}
                    showSearch
                  />
                </Form.Item>
              }
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col span={24} md={10} lg={10}>
          <Form.Item<UserData>
            colon={false}
            name="passportNumber"
            label={t("form.passportNumber.label")}
          >
            <Input placeholder={t("form.passportNumber.placeholder")} />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col span={24} md={10} lg={10}>
          <Form.Item<UserData>
            colon={false}
            name="expectedSalary"
            label={t("form.expectedSalary.label")}
            required
            rules={[
              () => ({
                validator({}, value) {
                  return handleValidateAntdForm("expectedSalary", value);
                },
              }),
            ]}
          >
            <CustomNumericFormat
              placeholder={t("form.expectedSalary.placeholder")}
            />
          </Form.Item>
        </Col>
        <Col span={24} md={14}>
          <div className="action-container">
            <Button htmlType="button" onClick={() => form.resetFields()}>
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
