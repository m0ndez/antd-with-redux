import { FC, Key, useState } from "react";
import { useLocale } from "../../../../hooks";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { removeUser, selectUsers } from "../../../../redux/slices/user-slice";
import { useFormContext } from "react-hook-form";
import { TableRowSelection } from "antd/es/table/interface";
import { UserData } from "../../../../types";
import { Button, Flex, Table, message } from "antd";
import { columns } from "./columns";

export const UserTable: FC = () => {
  const { t } = useLocale();
  const userList = useAppSelector(selectUsers);

  const dispatch = useAppDispatch();

  const [messageApi, contextHolder] = message.useMessage();

  const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([]);

  const { reset } = useFormContext<UserData>();

  const onSelectChange: (typeof rowSelection)["onChange"] = (
    newSelectedRowKeys
  ) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection: TableRowSelection<UserData> = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const handleAction = (type: "EDIT" | "DELETE", record: UserData) => {
    if (type === "EDIT") {
      reset({ ...record });
      return;
    }

    if (type === "DELETE") {
      messageApi.success(t("feedback.delete"));
      return dispatch(removeUser({ key: record.key }));
    }
  };

  return (
    <Flex vertical gap={16}>
      <Flex gap={16} align="center">
        {t("selected_total_items", { total: selectedRowKeys?.length })}

        {!!selectedRowKeys?.length && (
          <Button>
            {t("action.delete")}
            {t("action.all")}
          </Button>
        )}
      </Flex>

      <Table
        columns={columns({ t, onClickAction: handleAction })}
        rowSelection={rowSelection}
        scroll={{ x: true }}
        pagination={{
          pageSize: 5,
          showTotal: (total) => t("total_items", { total }),
        }}
        dataSource={userList.data}
      />
      {contextHolder}
    </Flex>
  );
};
