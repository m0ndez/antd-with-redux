import { Form, message } from "antd";
import { FC, ReactNode } from "react";
import { UserData } from "../../../../types";
import { v4 as uuidV4 } from "uuid";
import { useAppDispatch } from "../../../../redux/hooks";
import { useLocale } from "../../../../hooks";
import { addUser, editUser } from "../../../../redux/slices/user-slice";
import { userFormSchema } from "../../../../schemas";

type Props = {
  children: ReactNode;
};

export const UserAntdFormProvider: FC<Props> = (props) => {
  const { children } = props;

  const dispatch = useAppDispatch();

  const { t } = useLocale();

  const [messageApi, contextHolder] = message.useMessage();

  const [form] = Form.useForm<UserData>();

  const selectedUserId = Form.useWatch("key", { form, preserve: true });

  const transformData = (data: UserData) => {
    return userFormSchema.parse({
      ...data,
      key: selectedUserId || uuidV4(),
    });
  };

  const handleSubmit = (formData: UserData) => {
    if (selectedUserId) {
      dispatch(editUser(transformData(formData)));
      messageApi.success(t("feedback.edit"));
    } else {
      dispatch(addUser(transformData(formData)));
      messageApi.success(t("feedback.success"));
    }
    return form.resetFields();
  };

  return (
    <Form.Provider>
      <Form form={form} onFinish={handleSubmit} layout="vertical" noValidate>
        {children}
      </Form>
      {contextHolder}
    </Form.Provider>
  );
};
