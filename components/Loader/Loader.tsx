import React from "react";
import "./Loader.scss";

type PropsType = {
  absolute?: boolean;
};

export default function Loader({ absolute }: PropsType) {
  return absolute ? (
    <div className="loader">
      <div className="loader-bg" />
      <div className="loader-icon" />
    </div>
  ) : (
    <div className="loader-icon" />
  );
}
