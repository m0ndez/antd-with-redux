import { Button, Flex, TableColumnsType } from "antd";
import { useLocale } from "../../../../hooks";
import { UserData } from "../../../../types";
import nationality from "../../../../mocks/nationality.json";

type ColumnParams = {
  t: ReturnType<typeof useLocale>["t"];
  onClickAction: (type: "EDIT" | "DELETE", record: UserData) => void;
};

export const columns = (params: ColumnParams): TableColumnsType<UserData> => {
  const { t, onClickAction } = params;

  return [
    {
      dataIndex: "firstName",
      title: t("form.firstName.label"),
      sorter: (a, b) => a.firstName.localeCompare(b.firstName),
      render(_, record) {
        const { namePrefix, firstName, lastName } = record;
        return `${t(
          `form.namePrefix.options.${namePrefix}`,
          ""
        )} ${firstName} ${lastName}`;
      },
    },
    {
      dataIndex: "sex",
      sorter: (a, b) => a.sex.localeCompare(b.sex),
      title: t("form.sex.label"),
      render(value) {
        return t(`form.sex.options.${value}`, "");
      },
    },
    {
      dataIndex: "phoneNumber",
      sorter: (a, b) => a.phoneNumber.localeCompare(b.phoneNumber),
      title: t("form.phoneNumber.label"),
      render(_, record) {
        return `${record.countryCode}${record.phoneNumber}`;
      },
    },
    {
      dataIndex: "nationality",
      sorter: (a, b) => a.nationality.localeCompare(b.nationality),
      title: t("form.nationality.label"),
      render(value) {
        return nationality.find((item) => item.code === value)?.name || "";
      },
    },
    {
      title: t("action.manage"),
      render(_, record) {
        return (
          <Flex gap={8} vertical>
            <Button
              type="default"
              onClick={() => onClickAction("EDIT", record)}
            >
              {t("action.edit")}
            </Button>
            <Button
              danger
              type="primary"
              onClick={() => onClickAction("DELETE", record)}
            >
              {t("action.delete")}
            </Button>
          </Flex>
        );
      },
    },
  ];
};
