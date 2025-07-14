import { Select, Tag } from "antd";
import "../styles/Filter.css";
import type { SelectProps } from "antd";
type TagRender = SelectProps["tagRender"];



export default function FilterZhanr(props) {
    const { selectedGenres, onChange, options } = props;
    
  const tagRender: TagRender = (tagProps) => {
    const { label, closable, onClose } = tagProps;
    const onPreventMouseDown = (event: React.MouseEvent<HTMLSpanElement>) => {
      event.preventDefault();
      event.stopPropagation();
    };

    return (
      <Tag
        className="filter-genres"
        onMouseDown={onPreventMouseDown}
        closable={closable}
        onClose={onClose}
        style={{ marginInlineEnd: 4 }}
      >
        {label}
      </Tag>
    );
  };

  return (
    <div className="select-choise">
       <Select
                mode="multiple"
                tagRender={tagRender}
                style={{ minWidth: "180px" }}
                options={options}
                value={selectedGenres}
                placeholder={props.placeholder}
                className="filter-select"
                onChange={onChange}
            />
    </div>
  );
}
