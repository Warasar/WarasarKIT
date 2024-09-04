import React from "react";

type Props = {
  dataField: string;
  caption: string;
  width?: string;
  alignment?: any;
  renderCell?: (row: any) => void;
};

export default function Column({
  dataField,
  caption,
  width,
  alignment,
}: Props) {
  return (
    <div
      className="dataGrid-header-item"
      id={`dataGrid_header_${dataField}`}
      title={caption}
      style={width ? { width: `calc(${width} - 10px)` } : {}}
    >
      <div
        className="dataGrid-header-item-text"
        style={{
          textAlign: alignment ? alignment : "start",
        }}
      >
        {caption}
      </div>
    </div>
  );
}
