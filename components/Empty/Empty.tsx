import React from "react";
import "./Empty.scss";

type PropsType = {
  text: string;
};

const className = "warasar-empty";

export default function Empty({ text }: PropsType) {
  return <div className={className}>{text}</div>;
}
