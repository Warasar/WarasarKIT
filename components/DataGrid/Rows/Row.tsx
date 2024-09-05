import React from "react";

type Props = {
  row: any;
  gridCols: string;
  columns: any;
  className: string;
};

export default function Row({ row, gridCols, columns, className }: Props) {
  //----------создание ячеек----------------------------------
  const renderCells = (col: any) => {
    return (
      <div
        className={
          `${className}-row-cell ${className}-disabled` +
          (row.db_state === "delete" ? ` ${className}-delete` : "")
        }
        title={row[col.dataField]}
        style={{
          alignItems: "center",
          justifyContent: col.alignment ? col.alignment : "start",
        }}
      >
        {col.renderCell ? (
          col.renderCell(row)
        ) : (
          <div className={`${className}-row-cell-text`}>
            {row[col.dataField]}
          </div>
        )}
      </div>
    );
  };

  return (
    <div
      className={`${className}-row`}
      style={{ gridTemplateColumns: gridCols }}
    >
      {columns.map((col: any) => renderCells(col.props))}
    </div>
  );
}
