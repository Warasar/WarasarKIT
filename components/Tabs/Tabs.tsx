import React from "react";
import "./Tabs.scss";

type PropsType = {
  data: any;
  value: any;
  onValueChanged: (e: any) => void;
  disabled?: boolean;
};

const className: string = "warasar-tabs";

export default function Tabs({
  data,
  value,
  disabled,
  onValueChanged,
}: PropsType) {
  return (
    <div
      className={`${className}` + (disabled ? ` ${className}-disabled` : "")}
    >
      {data.map((item: any) => {
        return (
          <div
            className={
              (disabled ? `${className}-item-disabled` : `${className}-item`) +
              (value === item.value && !disabled ? " tabs-item-active" : "")
            }
            onClick={() => (!disabled ? onValueChanged(item.value) : null)}
          >
            {item.name}
          </div>
        );
      })}
    </div>
  );
}
