import React from "react";
import "./Input.scss";

type TextAlign = "start" | "end" | "center";

type PropsType = {
  value: any;
  onValueChanged: (e: any) => void;
  onKeyDown?: (e: any) => void;
  onBlur?: (e: any) => void;
  disabled?: boolean;
  size?: string;
  noBorder?: boolean;
  noBackground?: boolean;
  borderRadius?: string;
  type?: string;
  step?: number;
  autoFocus?: boolean;
  textAlign?: TextAlign | undefined;
  placeholder?: string;
  onClick?: (e: any) => void;
  onFocus?: (e: any) => void;
};

const className: string = `warasar-input`;

export default function Input({
  value,
  disabled,
  onValueChanged,
  onKeyDown,
  onBlur,
  size,
  noBorder,
  noBackground,
  borderRadius,
  type,
  step,
  autoFocus,
  textAlign,
  placeholder,
  onClick,
  onFocus,
}: PropsType) {
  const getClassName = () => {
    let classname: string = "";

    if (disabled) {
      classname += ` ${className}-disabled`;
    }

    if (noBorder) {
      classname += ` ${className}-noBorder`;
    }

    if (noBackground) {
      classname += ` ${className}-noBackground`;
    }

    return classname;
  };

  return (
    <div className={`${className}${size ? `-${size}` : "-medium"}`}>
      <input
        style={{
          borderRadius: borderRadius ? borderRadius : "6px",
          textAlign: textAlign ? textAlign : "start",
        }}
        disabled={disabled}
        type={type ? type : "string"}
        className={getClassName()}
        value={value}
        onChange={onValueChanged}
        onKeyDown={(e: any) => (onKeyDown ? onKeyDown(e) : null)}
        onBlur={(e: any) => (onBlur ? onBlur(e) : null)}
        step={type === "number" ? (step ? step : 1) : ""}
        autoFocus={autoFocus}
        placeholder={placeholder}
        onClick={(e: any) => (onClick ? onClick(e) : null)}
        onFocus={(e: any) => (onFocus ? onFocus(e) : null)}
      />
    </div>
  );
}
