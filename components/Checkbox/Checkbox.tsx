import React from "react";
import "./Checkbox.scss";

type Props = {
  checked: boolean | null;
  onChange?: (e: boolean) => void;
  disabled?: boolean;
};

const className = "warasar-checkbox";

export default function Checkbox({ checked, onChange, disabled }: Props) {
  return (
    <div
      className={
        disabled
          ? checked
            ? `${className}-disabled-active`
            : `${className}-disabled`
          : checked
          ? `${className}-active`
          : `${className}`
      }
      onClick={() => (onChange ? onChange(!checked) : null)}
    />
  );
}
