import React from "react";
import { Select, Tag } from "antd";
import type { SelectProps } from "antd";

// type TagRender = SelectProps['tagRender'];
const TagRender = (props: { label: string; color: string }) => {
  const { label, color } = props;
  const onPreventMouseDown = (event: React.MouseEvent<HTMLSpanElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };
  return (
    <Tag
      color={color}
      onMouseDown={onPreventMouseDown}
      closable={false}
      style={{ marginInlineEnd: 4 }}
    >
      {label}
    </Tag>
  );
};

export const options: SelectProps["options"] = [
  { value: "Pending", label: <TagRender label="Pending" color="lightgray" /> },
  { value: "Working", label: <TagRender label="Working" color="blue" /> },
  { value: "Reviewing", label: <TagRender label="Reviewing" color="pink" /> },
  { value: "Done", label: <TagRender label="Done" color="green" /> },
];

const StatusSelection: React.FC<{value: string, onChange: (value: string) => void, loading?: boolean, disabled?: boolean}> = ({value, onChange, loading, disabled}) => {
  return (
    <Select
      loading={loading}
      value={value}
      disabled={disabled}
      onChange={onChange}
      style={{ minWidth: "120px" }}
      options={options}
    />
  );
};

export default StatusSelection;
