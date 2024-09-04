import React from "react";
import "./Tabs.scss";

type PropsType = {
  data: any;
  value: any;
  onValueChanged: (e: any) => void;
  disabled?: boolean;
};

export default function Tabs({
  data,
  value,
  disabled,
  onValueChanged,
}: PropsType) {
  return (
    <div className={"tabs" + (disabled ? " tabs-disabled" : "")}>
      {data.map((item: any) => {
        return (
          <div
            className={
              (disabled ? "tabs-item-disabled" : "tabs-item") +
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
