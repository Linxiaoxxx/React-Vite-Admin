import { Button, Space } from "antd";
import "./index.less";

const SearchForm = (props: {
  children: JSX.Element;
  searchData: (e: Event) => void;
  reset: (e: Event) => void;
}) => {
  return (
    <div className="flex justify-between search-form">
      <div className="flex-1 search-body">{props.children}</div>
      <Space>
        <Button type="primary" onClick={() => props.searchData}>
          查询
        </Button>
        <Button onClick={() => props.reset}>重置</Button>
      </Space>
    </div>
  );
};

export default SearchForm;
