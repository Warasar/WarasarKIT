import React from "react";
import TableRow from "./Row";

type Props = {
  columns: any;
  filteredData: any;
  gridCols: any;
};

export let changedCells: any = [];
export const setChangedCells = (cells: any) => {
  changedCells = cells;
};

export default function Rows({ columns, filteredData, gridCols }: Props) {
  //----------создание строк от даты--------------------------
  const renderRows = () => {
    return filteredData.map((row: any, index: number) => {
      return (
        <TableRow
          row={row}
          gridCols={gridCols}
          columns={columns}
          key={`row_${index}`}
        />
      );
    });
  };

  return <div className="dataGrid-rows">{renderRows()}</div>;
}
