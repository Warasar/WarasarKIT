import React from "react";
import "./Divider.scss";

type PropsType = {
  text: any;
};

export default function Divider({ text }: PropsType) {
  return (
    <div className="divider">
      <div className="divider-border" />
      <div className="divider-text">{text}</div>
      <div className="divider-border" />
    </div>
  );
}
