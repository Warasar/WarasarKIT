import React from "react";
import "./InputNumber.scss";

type PropsType = {
  value: any;
  onValueChanged: (e: any) => void;
  disabled?: boolean;
  min?: number;
  max?: number;
};

const className: string = "warasar-inputNumber";

export default function InputNumber({
  value,
  disabled,
  onValueChanged,
  min,
  max,
}: PropsType) {
  return (
    <div className={`${className}`}>
      <input
        disabled={disabled}
        type="number"
        className={disabled ? `${className}-disabled` : ""}
        onChange={(e: any) => {
          if (e.target.value.length > 0) {
            if (max && Number(e.target.value) > max) {
              onValueChanged(max);
            } else if ((min || min === 0) && Number(e.target.value) < min) {
              onValueChanged(min);
            } else {
              onValueChanged(Number(e.target.value));
            }
          } else {
            onValueChanged(undefined);
          }
        }}
        min={min ? min : "auto"}
        max={max ? max : "auto"}
        value={value === undefined ? "" : value}
      />
    </div>
  );
}
