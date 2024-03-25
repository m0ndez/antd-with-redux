import { FC } from "react";
import { Divider, Typography } from "antd";
import "../styles/styles.scss";
import { useLocale } from "../../../hooks";
import { UserAntdFormProvider, UserAntdFormView } from "../forms";
import { UserTable } from "../components";

const FormQuizPage: FC = () => {
  const { t } = useLocale();
  const { Title } = Typography;

  return (
    <div className="quiz-2-container">
      <Title level={1}>{t("quiz_options.2.description")}</Title>
      <UserAntdFormProvider>
        <UserAntdFormView />
        <Divider />
        <UserTable />
      </UserAntdFormProvider>

      {/* TODO: Old code Implement with React hook form */}
      {/* <UserFormProvider>
        <UserFormView />
        <Divider />
        <UserTable />
      </UserFormProvider> */}
    </div>
  );
};

export default FormQuizPage;
