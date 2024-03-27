import { ButtonProps, Modal } from "antd";
import { CSSProperties, FC, ReactNode, useEffect, useState } from "react";

/**
 * 封装通用弹窗
 */
interface BasicModalProps {
  show: boolean;
  title?: string | ReactNode;
  children: ReactNode;
  footer?: ReactNode | null;
  closable?: boolean;
  cancelButtonProps?: ButtonProps;
  okButtonProps?: ButtonProps;
  style?: CSSProperties;
  onClose: () => void;
  onOk: () => void;
}
export const BasicModal: FC<BasicModalProps> = (props) => {
  const {
    show,
    title,
    footer,
    children,
    closable = true,
    cancelButtonProps,
    okButtonProps,
    onClose,
    style,
    onOk,
  } = props;
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(show);
  }, [show]);

  return (
    <Modal
      title={title || "提示"}
      closable={closable}
      visible={visible}
      footer={footer}
      style={style}
      cancelButtonProps={cancelButtonProps}
      okButtonProps={okButtonProps}
      onCancel={onClose}
      onOk={onOk}
    >
      {children}
    </Modal>
  );
};
