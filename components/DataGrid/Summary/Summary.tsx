import React, { useEffect, useState } from "react";

type Props = {
  dataSource: any;
  column: string;
  summaryType: string;
  customizeText?: (e: any) => any;
};

function Summary({ dataSource, column, summaryType, customizeText }: Props) {
  const [value, setValue] = useState<any>(null);

  useEffect(() => {
    if (dataSource?.length > 0) {
      if (summaryType === "sum") {
        let sum: any = 0;
        dataSource.forEach((item: any) => {
          sum += item[column];
        });
        setValue(sum);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataSource]);

  return (
    <div className="dataGrid-summary" id={`dataGrid_summary_${column}`}>
      <div />
      <div className="dataGrid-summary-text">
        {customizeText ? customizeText(value) : "wd"}
      </div>
    </div>
  );
}

export default Summary;
