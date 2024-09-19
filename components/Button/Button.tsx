import React from "react";
import "./Button.scss";

type PropsType = {
  text: string;
  onClick: (e?: any) => void;
  disabled?: boolean;
  type?: string;
  size?: string;
  id?: string;
  icon?: any;
  iconPosition?: "left" | "right";
};

const className: string = "warasar-button";

export default function Button({
  text,
  disabled,
  onClick,
  type,
  size,
  id,
  icon,
  iconPosition,
}: PropsType) {
  return (
    <div
      className={
        disabled ? `${className}-disabled` : `${className} ${className}-${type}`
      }
      onClick={onClick}
      style={size === "small" ? { fontSize: "12px" } : {}}
      id={id ? id : `${className}${text}`}
    >
      {icon && (!iconPosition || iconPosition === "left") ? (
        <div className={`${className}-icon`}>{icon}</div>
      ) : null}
      {text}
      {icon && iconPosition === "right" ? (
        <div className={`${className}-icon`}>{icon}</div>
      ) : null}
    </div>
  );
}
