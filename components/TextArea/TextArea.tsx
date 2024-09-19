import React from "react";
import "./TextArea.scss";

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
  autoFocus?: boolean;
  placeholder?: string;
  onClick?: (e: any) => void;
  onFocus?: (e: any) => void;
  minHeight?: string;
  backgroundColor?: string;
};

const className: string = `warasar-textarea`;

export default function TextArea({
  value,
  disabled,
  onValueChanged,
  onKeyDown,
  onBlur,
  size,
  noBorder,
  noBackground,
  borderRadius,
  autoFocus,
  placeholder,
  onClick,
  onFocus,
  minHeight,
  backgroundColor,
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
      <textarea
        style={{
          borderRadius: borderRadius ? borderRadius : "6px",
          minHeight: minHeight ? minHeight : "120px",
          backgroundColor: backgroundColor ? backgroundColor : "",
        }}
        disabled={disabled}
        className={getClassName()}
        value={value?.length ? value : ""}
        onChange={onValueChanged}
        onKeyDown={(e: any) => (onKeyDown ? onKeyDown(e) : null)}
        onBlur={(e: any) => (onBlur ? onBlur(e) : null)}
        autoFocus={autoFocus}
        placeholder={placeholder}
        onClick={(e: any) => (onClick ? onClick(e) : null)}
        onFocus={(e: any) => (onFocus ? onFocus(e) : null)}
      />
    </div>
  );
}
