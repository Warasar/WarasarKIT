import React from "react";
import "./Button.scss";

type PropsType = {
  text: string;
  onClick: (e?: any) => void;
  disabled?: boolean;
  type?: string;
  size?: string;
  id?: string;
};

const className: string = "warasar-button";

export default function Button({
  text,
  disabled,
  onClick,
  type,
  size,
  id,
}: PropsType) {
  return (
    <div
      className={
        disabled ? `${className}-disabled` : `${className} ${className}-${type}`
      }
      onClick={disabled ? () => {} : onClick}
      style={size === "small" ? { fontSize: "12px" } : {}}
      id={id ? id : `${className}${text}`}
    >
      {text}
    </div>
  );
}
