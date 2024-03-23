import { FC, ReactNode } from "react";

type Props = {
  children: ReactNode;
  buttonName?: string;
};

export const ShapeButton: FC<Props> = (props) => {
  const { children, buttonName } = props;
  return (
    <div className="controller-btn-container">
      {children}
      {buttonName && (
        <div className="badge-container">
          <div className="badge-wrapper">{buttonName}</div>
        </div>
      )}
    </div>
  );
};
