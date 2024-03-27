import { Button, Result } from "antd";
import { FC } from "react";
import { useNavigate } from "react-router";

const NoAuth: FC = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col justify-center items-center">
      <Result status="403" subTitle="403"></Result>
      <Button
        type="primary"
        style={{ width: "96px" }}
        onClick={() => {
          // navigate(defaultRoute);
        }}
      >
        返回首页
      </Button>
    </div>
  );
};

export default NoAuth;