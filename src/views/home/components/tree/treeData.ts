import React from "react";

export interface TreeNodeItem {
  title: string;
  key: React.Key;
  disabled?: boolean;
  children?: TreeNodeItem[];
}

const data = [
  {
    title: "0-0",
    key: "0-0",
    disabled: false,
    children: [
      {
        title: "0-0-1",
        key: "0-0-1",
        children: [
          {
            title: "0-0-1-1",
            key: "0-0-0-1",
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
  {
    title: "0-1",
    key: "0-1",
  },
];

export default data;
