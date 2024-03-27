import "./index.less";
import { CaretDownOutlined, CaretRightOutlined } from "@ant-design/icons";
import { Checkbox } from "antd";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { OnCheckFun, TreeContext } from ".";
import { is } from "@/utils/is";
import TreeData, { TreeNodeItem } from "./treeData";

interface TreeNodeProps {
  data: TreeNodeItem;
  level: number;
  onCheck: OnCheckFun;
}

const TreeNode = (props: TreeNodeProps) => {
  const { data, level, onCheck } = props;

  // 缩进单位
  const indentArr = Array.from({ length: level }, (_, i) => i + 1);
  const { checkable, checkedKeys, defaultExpandAll } = useContext(TreeContext);
  const [isOpen, setIsOpen] = useState(defaultExpandAll);
  const [isChecked, setIsChecked] = useState(
    checkedKeys?.includes(data.key) ?? false
  );
  const [childCheckedKeys, setChildCheckedKeys] = useState<React.Key[]>([]);

  const handleChange = (e: CheckboxChangeEvent) => {
    setIsChecked(e.target.checked);
    // 通知祖先组件
    onCheck({ key: data.key, checked: e.target.checked, level });
    // 父节点全选或全不选中，更新子节点选中状态
    updateChildNodes(data.children, e.target.checked, level + 1);
  };

  const updateChildNodes = (
    children: TreeNodeItem[] | undefined,
    checked: boolean,
    childLevel: number
  ) => {
    if (children) {
      const childCheckedKeysArr: React.Key[] = [];
      children.forEach((child) => {
        onCheck({ key: child.key, checked, level: childLevel });
        checked && childCheckedKeysArr.push(child.key);
        if (child.children) {
          updateChildNodes(child.children, checked, childLevel + 1);
        }
      });
      setChildCheckedKeys(childCheckedKeysArr);
    }
  };

  const handleChildCheck: OnCheckFun = (checkData) => {
    // 监听子节点选中
    const {
      key: childKey,
      checked: childChecked,
      level: childLevel,
    } = checkData;
    onCheck(checkData);
    if (childLevel && childLevel - 1 === level) {
      // 避免跨层级判断
      const cloneChildCheck = childChecked
        ? !childCheckedKeys.includes(childKey)
          ? [...childCheckedKeys, childKey]
          : childCheckedKeys
        : childCheckedKeys.filter((k) => k !== childKey);
      setChildCheckedKeys(cloneChildCheck);
      if (cloneChildCheck.length === data.children?.length) {
        setIsChecked(true);
        onCheck({ key: data.key, checked: true, level });
      } else if (cloneChildCheck.length === 0) {
        setIsChecked(false);
        onCheck({ key: data.key, checked: false, level });
      } else {
        setIsChecked(false);
        onCheck({ key: data.key, checked: false, level });
      }
    }
  };

  useEffect(() => {
    setIsChecked(checkedKeys?.includes(data.key) ?? false);
  }, [checkedKeys]);

  return (
    <>
      <div
        key={data.key}
        className="treenode"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="tree-indent">
          {indentArr.map((_, index) => (
            <span key={index} className="tree-indent-unit"></span>
          ))}
        </div>
        <span className="tree-switcher">
          {data.children &&
            data.children.length > 0 &&
            (isOpen ? (
              <CaretDownOutlined className="tree-switcher-icon" />
            ) : (
              <CaretRightOutlined className="tree-switcher-icon" />
            ))}
        </span>
        <div className="tree-title">
          {checkable && (
            <Checkbox
              checked={isChecked}
              disabled={data?.disabled ?? false}
              className="tree-checkbox"
              onChange={handleChange}
              onClick={(e) => e.stopPropagation()}
            />
          )}
          {data.title}
        </div>
      </div>
      {data.children && data.children.length > 0 && isOpen && (
        <div className="tree-children">
          {data.children.map((child: any) => (
            <TreeNode
              key={child.key}
              data={child}
              level={level + 1}
              onCheck={handleChildCheck}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default TreeNode;
