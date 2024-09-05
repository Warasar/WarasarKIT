import React from "react";
import "./Divider.scss";

type PropsType = {
  text: any;
};

const className: string = "warasar-divider";

export default function Divider({ text }: PropsType) {
  return (
    <div className={`${className}`}>
      <div className={`${className}-border`} />
      <div className={`${className}-text`}>{text}</div>
      <div className={`${className}-border`} />
    </div>
  );
}
