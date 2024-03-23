import { FC, ReactNode } from "react";
import { v4 as uuidV4 } from "uuid";
import { useAppDispatch } from "../../../../redux/hooks";
import { FormProvider, useForm } from "react-hook-form";
import { UserData } from "../../../../types/user";
import { defaultValues } from "./constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { addUser, editUser } from "../../../../redux/slices/user-slice";
import { message } from "antd";
import { useLocale } from "../../../../hooks";
import { userFormSchema } from "../../../../schemas";
type Props = {
  children: ReactNode;
};

export const UserFormProvider: FC<Props> = (props) => {
  const { children } = props;

  const dispatch = useAppDispatch();

  const { t } = useLocale();

  const [messageApi, contextHolder] = message.useMessage();

  const key = uuidV4();

  const methods = useForm<UserData>({
    defaultValues,
    resolver: zodResolver(userFormSchema),
  });

  const handleSubmit = (formData: UserData) => {
    if (formData.key) {
      dispatch(editUser(formData));
      messageApi.success(t("feedback.edit"));
    } else {
      dispatch(addUser({ ...formData, key }));
      messageApi.success(t("feedback.success"));
    }
    return methods.reset({ ...defaultValues });
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(handleSubmit)} noValidate>
        {children}
      </form>
      {contextHolder}
    </FormProvider>
  );
};
