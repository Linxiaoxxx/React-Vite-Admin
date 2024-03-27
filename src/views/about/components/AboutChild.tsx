import { Button } from "antd";
import { memo, useEffect } from "react";

//*  验证父组件传入的 props 变化，子组件是否会重新渲染
interface AboutChildProps {
  count: number;
  changeValue?: () => void;
}

const AboutChild = ({ count, changeValue }: AboutChildProps) => {
  console.log("I'm render");

  return (
    <div>
      <h3>I'm About child</h3>
      <h3>this is props.count --- {count}</h3>
      <Button type="primary" onClick={changeValue}>
        change value
      </Button>
    </div>
  );
};

export default memo(AboutChild);
