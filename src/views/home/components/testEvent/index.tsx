import { useState } from "react";

const data = [
  {
    title: "0-0",
    key: "0-0",
    children: [
      {
        title: "0-0-1",
        key: "0-0-1",
        children: [
          {
            title: "0-0-1-1",
            key: "0-0-1-1",
          },
          {
            title: "0-0-1-2",
            key: "0-0-1-2",
          },
        ],
      },
      {
        title: "0-0-2",
        key: "0-0-2",
        children: [{ title: "0-0-2-1", key: "0-0-2-1" }],
      },
    ],
  },
];

const TestItem = (props: any) => {
  const { data, level, onCheck } = props;

  const indentArr = Array.from({ length: level }, (_, i) => i + 1);
  const [childChecks, setChildChecks] = useState<any[]>([]);

  const handleClick = (key: string, level: number) => {
    console.log("key", key);
    onCheck && onCheck(key, level);
  };

  const handleChildClick = (key: string, childLevel: number) => {
    console.log("key", key, data.children, childLevel - 1 === level);
    onCheck && onCheck(key);
    if (childLevel - 1 === level) {
      // 避免跨层级判断
      const cloneChildCheck = !childChecks.includes(key)
        ? [...childChecks, key]
        : childChecks.filter((k) => k !== key);
      console.log("cloneChildCheck", data.key, cloneChildCheck);
      setChildChecks(cloneChildCheck);
      if (cloneChildCheck.length === data.children.length) {
        onCheck && onCheck(data.key, level);
      }
    }
  };
  return (
    <>
      <div className="flex items-center">
        <div className="flex">
          {indentArr.map((_, index) => (
            <span key={index} className="w-2"></span>
          ))}
        </div>
        <span
          className="cursor-pointer"
          onClick={() => handleClick(data.key, level)}
        >
          {data.title}
        </span>
      </div>
      {data.children &&
        data.children.length > 0 &&
        data.children.map((child: any) => (
          <TestItem
            key={child.key}
            data={child}
            level={level + 1}
            onCheck={handleChildClick}
          />
        ))}
    </>
  );
};

export default function TestEvent() {
  const [checkKeys, setCheckKeys] = useState<any[]>([]);

  const handleCheck = (key: string) => {
    setCheckKeys((prev) => {
      return prev.includes(key)
        ? prev.filter((k) => k !== key)
        : [...prev, key];
    });
  };
  return (
    <div className="p-4">
      <div className="mb-2 text-[#ff8900]">已选中： {checkKeys.join(", ")}</div>
      {data.map((item: any) => (
        <TestItem key={item.key} data={item} level={0} onCheck={handleCheck} />
      ))}
    </div>
  );
}
