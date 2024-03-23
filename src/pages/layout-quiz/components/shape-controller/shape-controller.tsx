import { Button, Col, Flex, Row } from "antd";
import { FC } from "react";
import { useLocale } from "../../../../hooks/use-locale";
import { ShapeButton } from "..";

type Props = {
  handleMoveShape: (action: "forward" | "backward") => void;
  handleMovePosition: (action: "up" | "down") => void;
};

export const ShapeController: FC<Props> = (props) => {
  const { t } = useLocale();
  const { handleMovePosition, handleMoveShape } = props;

  return (
    <Row gutter={[16, 16]}>
      <Col span={24} md={6}>
        <ShapeButton buttonName={t("action.move_shape")}>
          <Button onClick={() => handleMoveShape("backward")}>
            <div id="triangle-left" />
          </Button>
        </ShapeButton>
      </Col>
      <Col span={24} md={12}>
        <ShapeButton buttonName={t("action.move_position")}>
          <Flex>
            <Button onClick={() => handleMovePosition("up")}>
              <div id="triangle-up" />
            </Button>
            <Button onClick={() => handleMovePosition("down")}>
              <div id="triangle-down" />
            </Button>
          </Flex>
        </ShapeButton>
      </Col>
      <Col span={24} md={6}>
        <ShapeButton buttonName={t("action.move_shape")}>
          <Button onClick={() => handleMoveShape("forward")}>
            <div id="triangle-right" />
          </Button>
        </ShapeButton>
      </Col>
    </Row>
  );
};
