import React from "react";
import "./Loader.scss";

type PropsType = {
  absolute?: boolean;
};

const className: string = "warasar-loader";

export default function Loader({ absolute }: PropsType) {
  return absolute ? (
    <div className={`${className}`}>
      <div className={`${className}-bg`} />
      <div className={`${className}-icon`} />
    </div>
  ) : (
    <div className={`${className}-icon`} />
  );
}
