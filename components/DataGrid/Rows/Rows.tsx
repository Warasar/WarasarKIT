import React from "react";
import TableRow from "./Row";

type Props = {
  columns: any;
  filteredData: any;
  gridCols: any;
  className: string;
};

export let changedCells: any = [];
export const setChangedCells = (cells: any) => {
  changedCells = cells;
};

export default function Rows({
  columns,
  filteredData,
  gridCols,
  className,
}: Props) {
  //----------создание строк от даты--------------------------
  const renderRows = () => {
    return filteredData.map((row: any, index: number) => {
      return (
        <TableRow
          row={row}
          gridCols={gridCols}
          columns={columns}
          key={`row_${index}`}
          className={className}
        />
      );
    });
  };

  return <div className={`${className}-rows`}>{renderRows()}</div>;
}
