import { Button, Col, Flex, Row, Select, Typography } from "antd";
import "./App.scss";
import { useLocale } from "./hooks/use-locale";
import { useState } from "react";

import LayoutQuizPage from "./pages/layout-quiz/pages/layout-quiz-page";
import FormQuizPage from "./pages/form-quiz/pages/form-quiz-page";

function App() {
  const { t, i18n } = useLocale();
  const [activeSection, setActiveSection] = useState(0);

  const { Title, Text } = Typography;

  const quizList = [
    {
      name: t("quiz_options.1.title"),
      description: t("quiz_options.1.description"),
      onClick: () => setActiveSection(1),
    },
    {
      name: t("quiz_options.2.title"),
      description: t("quiz_options.2.description"),
      onClick: () => setActiveSection(2),
    },
  ];

  const options = [
    { value: "en", label: t("language_options.en") },
    { value: "th", label: t("language_options.th") },
  ];

  return (
    <div className="container">
      <div className="nav-container">
        <div className="nav-wrapper">
          <Select
            className="lang-select-wrapper"
            value={i18n.language}
            onChange={(value) => {
              i18n.changeLanguage(value);
            }}
            options={options}
          />
          {!!activeSection && (
            <Button onClick={() => setActiveSection(0)}>
              {t("action.go_back")}
            </Button>
          )}
        </div>
      </div>

      {activeSection === 0 && (
        <div className="btn-container">
          <Row gutter={[16, 16]} className="btn-row">
            {quizList.map((quiz) => (
              <Col span={24} md={12} key={quiz.name}>
                <Button size="large" onClick={quiz.onClick}>
                  <Flex vertical gap="large">
                    <Title level={4}>{quiz.name}</Title>
                    <Text>{quiz.description}</Text>
                  </Flex>
                </Button>
              </Col>
            ))}
          </Row>
        </div>
      )}

      {activeSection === 1 && <LayoutQuizPage />}
      {activeSection === 2 && <FormQuizPage />}
    </div>
  );
}

export default App;
