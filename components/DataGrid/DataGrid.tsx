import React, { useEffect, useMemo, useState } from "react";
import Rows from "./Rows/Rows";
import "./DataGrid.scss";

type Props = {
  children: any;
  dataSource: any;
  maxHeight?: string;
};

const className: string = "warasar-dataGrid";

function DataGrid({ children, dataSource, maxHeight }: Props) {
  const [defaultData, setDefaultData] = useState<any>(null);
  const [filteredData, setFilteredData] = useState<any>(null);

  useEffect(() => {
    if (dataSource && dataSource.length > 0) {
      setDefaultData(dataSource);
    }
  }, [dataSource]);
  useEffect(() => {
    if (defaultData && defaultData.length > 0) {
      setFilteredData(defaultData);
    }
  }, [defaultData]);
  //----------колонки----------------------------------------
  const headerElems: any = useMemo(() => {
    const newCols: any = children.filter(
      (elem: any) => elem.type.name === "Column"
    );
    return newCols;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  //----------отдельные доп элементы-------------------------
  const showedElem: any = useMemo(() => {
    const newElems: any = children.filter(
      (elem: any) => elem.type.name !== "Column"
    );
    return newElems;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataSource]);
  //----------создает грид таблицы от колонок для шапки------
  const gridColsHeader: string = useMemo(() => {
    let grid: string = "";
    //------- паддинг итемов слева и справа--------

    headerElems.forEach((col: any) => {
      if (col.props.width) {
        grid += `${grid.length === 0 ? "" : " "}${col.props.width}`;
      } else {
        grid += `${grid.length === 0 ? "" : " "}1fr`;
      }
    });

    return grid;
  }, [headerElems]);
  //----------создает грид таблицы от колонок для шапки------
  const gridColsRows: string = useMemo(() => {
    let grid: string = "";
    //------- паддинг итемов слева и справа--------

    headerElems.forEach((col: any) => {
      if (col.props.width) {
        grid += `${grid.length === 0 ? "" : " "}${col.props.width}`;
      } else {
        grid += `${grid.length === 0 ? "" : " "}1fr`;
      }
    });

    return grid;
  }, [headerElems]);

  return (
    <div
      className={`${className}`}
      style={{
        height: "auto",
        width: "auto",
        maxHeight: maxHeight ? maxHeight : "60vh",
      }}
    >
      <div className={`${className}-head`}>
        <div
          className={`${className}-header`}
          style={{ gridTemplateColumns: gridColsHeader }}
        >
          {headerElems}
        </div>
      </div>
      {filteredData && filteredData.length > 0 ? (
        <Rows
          columns={headerElems}
          filteredData={filteredData}
          gridCols={gridColsRows}
          className={className}
        />
      ) : (
        <div
          className={`${className}-empty`}
          style={{ width: "calc(100% - 24px)" }}
        >
          Нет данных
        </div>
      )}
      {showedElem}
    </div>
  );
}

export default DataGrid;
