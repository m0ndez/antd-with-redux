import { FC, useState } from "react";
import "../styles/styles.scss";
import { Button, Col, Divider, Row, Typography } from "antd";

import { useLocale } from "../../../hooks/use-locale";
import { ShapeController } from "../components";

const LayoutQuizPage: FC = () => {
  const { t } = useLocale();
  const { Title } = Typography;

  const [shapeList, setShapeList] = useState([
    "square",
    "circle",
    "oval",
    "trapezoid",
    "rectangle",
    "parallelogram",
  ]);

  const handleMoveShape = (action: "forward" | "backward") => {
    const newShapeList = [...shapeList];
    if (action === "forward") {
      const lastShape = newShapeList.pop();
      newShapeList.unshift(lastShape as string);
    } else if (action === "backward") {
      const firstShape = newShapeList.shift();
      newShapeList.push(firstShape as string);
    }

    setShapeList(newShapeList);
  };

  const handleMovePosition = (action: "up" | "down") => {
    const newShapeList = [...shapeList];
    const pivotSize = Math.floor(newShapeList.length / 2);
    if (action === "up") {
      const upperShape = newShapeList.splice(0, pivotSize);
      newShapeList.push(...upperShape);
    } else if (action === "down") {
      const lowerShape = newShapeList.splice(pivotSize, pivotSize);
      newShapeList.unshift(...lowerShape);
    }

    setShapeList(newShapeList);
  };

  const handleShuffleShape = () => {
    const newShapeList = [...shapeList];
    newShapeList.sort(() => Math.random() - 0.5);

    setShapeList(newShapeList);
  };

  return (
    <div className="quiz-1-container">
      <Title level={1}>{t("quiz_options.1.description")}</Title>
      <ShapeController
        handleMovePosition={handleMovePosition}
        handleMoveShape={handleMoveShape}
      />
      <Divider />
      <Row gutter={[16, 16]} justify="center">
        {shapeList.map((shape) => (
          <Col span={24} md={8} key={shape}>
            <div className="controller-btn-container">
              <Button onClick={handleShuffleShape}>
                <div id={shape} />
              </Button>
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default LayoutQuizPage;
