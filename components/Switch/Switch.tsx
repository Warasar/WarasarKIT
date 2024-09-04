import React from "react";
import "./Switch.scss";

type PropsType = {
  checked: boolean;
  onChange: (e: boolean) => void;
  disabled?: boolean;
};

export default function Switch({ checked, onChange, disabled }: PropsType) {
  return (
    <div
      className={
        disabled ? "switch-disabled" : checked ? "switch-active" : "switch"
      }
      onClick={() => (disabled ? null : onChange(!checked))}
      title={disabled ? "Не активно" : ""}
    >
      <div
        className="switch-circle"
        style={{
          marginLeft: checked ? "24px" : "0px",
          marginRight: checked ? "0px" : "24px",
        }}
      />
    </div>
  );
}
