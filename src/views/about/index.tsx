import { FC, useCallback, useEffect, useMemo, useState } from "react";
import TrendChart from "./components/TrendChart";
import AboutChild from "./components/AboutChild";
import { Button, Space } from "antd";
import { getAttackDetail } from "@/request/apis/alarm";

const About = () => {
  const [count1, setCount1] = useState(0);
  const count2 = 10;
  const [name, setName] = useState("lin");

  const total = useMemo(() => {
    // 类似vue computed 属性,依赖 count1 的变化而变化
    return count1 + count2;
  }, [count1]);

  const handleClick = useCallback(() => {
    setCount1((count) => count + 1);
  }, [count1]);

  return (
    <>
      <h2>ABOUT</h2>
      <Space>
        <Button onClick={() => setName((name) => `${name}${count1}`)}>
          change name
        </Button>
        <Button onClick={handleClick}>change count</Button>
      </Space>
      <hr />
      <div>
        <AboutChild count={total} />
      </div>
      <div className="w-full h-14 bg-gradient-to-r from-cyan-500 to-blue-500"></div>

      <hr />
      <div className="flex mt-4">
        <div className="w-1/2 h-240px bg-white">{/* <TrendChart /> */}</div>
      </div>
    </>
  );
};

export default About;
