import React from "react";

type Props = {
  row: any;
  gridCols: string;
  columns: any;
};

export default function Row({ row, gridCols, columns }: Props) {
  //----------создание ячеек----------------------------------
  const renderCells = (col: any) => {
    return (
      <div
        className={
          "dataGrid-row-cell disabled" +
          (row.db_state === "delete" ? " delete" : "")
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
          <div className="dataGrid-row-cell-text">{row[col.dataField]}</div>
        )}
      </div>
    );
  };

  return (
    <div className="dataGrid-row" style={{ gridTemplateColumns: gridCols }}>
      {columns.map((col: any) => renderCells(col.props))}
    </div>
  );
}
