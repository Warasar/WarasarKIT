import React from "react";
import "./Switch.scss";

type PropsType = {
  checked: boolean;
  onChange: (e: boolean) => void;
  disabled?: boolean;
};

const className: string = "warasar-switch";

export default function Switch({ checked, onChange, disabled }: PropsType) {
  return (
    <div
      className={
        disabled
          ? `${className}-disabled`
          : checked
          ? `${className}-active`
          : `${className}`
      }
      onClick={() => (disabled ? null : onChange(!checked))}
      title={disabled ? "Не активно" : ""}
    >
      <div
        className={`${className}-circle`}
        style={{
          marginLeft: checked ? "24px" : "0px",
          marginRight: checked ? "0px" : "24px",
        }}
      />
    </div>
  );
}
