import React, { useEffect, useRef, useState } from "react";
import "./Popover.scss";

type PropsType = {
  title: any;
  content: any;
  disabled?: boolean;
  id?: string;
  dontShowArrow?: boolean;
  dontShowBorder?: boolean;
  popoverWidth?: string;
  popoverMaxHeight?: string;
  borderRadius?: string;
  width?: string;
  closeAfterClick?: boolean;
};

const className = "warasar-popover";

export default function Popover({
  title,
  content,
  disabled,
  id,
  dontShowArrow,
  dontShowBorder,
  popoverWidth,
  popoverMaxHeight,
  borderRadius,
  width,
  closeAfterClick,
}: PropsType) {
  const [show, setShow] = useState<boolean>(false);

  const ref: any = useRef(null);

  //-------считывает клик наружу при видимости итема--------
  const useOutsideAlerter = (ref: any) => {
    useEffect(() => {
      function handleClickOutside(event: any) {
        if (
          ref.current &&
          !ref.current.contains(event.target) &&
          show &&
          !event.target.id.includes(`${className}${id}`) &&
          !event.target.id.includes(`${className}-input${id}`) &&
          !event.target.id.includes(`${className}-xIcon${id}`) &&
          !event.target.id.includes(`${className}-arrow${id}`) &&
          !event.target.id.includes(`${className}-arrow-icon${id}`)
        ) {
          setShow(!show);
        }
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ref, show]);
  };
  useOutsideAlerter(ref);

  //-------фокус на инпут при нажатии на стрелку--------
  useEffect(() => {
    if (show) {
      let obj: any = document.getElementById(`${className}-input` + id);
      if (obj) {
        obj.focus();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show]);

  return (
    <div style={{ position: "relative", width: width ? width : "100%" }}>
      <div
        className={
          `${className}` +
          (show ? ` ${className}-active` : "") +
          (disabled ? "-disabled" : "")
        }
        id={`${className}_${id}`}
        style={{
          border: dontShowBorder ? "none" : "1px solid #E2E8F0",
          borderRadius: borderRadius ? borderRadius : "6px",
          gridTemplateColumns: title ? "1fr auto auto" : "1fr auto",
        }}
      >
        <div
          className={`${className}-text`}
          onClick={() => (disabled ? null : setShow(!show))}
        >
          {title}
        </div>
        {!dontShowArrow ? (
          <div
            className={`${className}-arrow`}
            id={`${className}-arrow` + id}
            onClick={() => (disabled ? null : setShow(!show))}
          >
            <div
              className={`${className}-arrow-icon` + (show ? "_active" : "")}
              id={`${className}-arrow-icon` + id}
            />
          </div>
        ) : null}
      </div>
      {show ? (
        <div
          className={`${className}-popover`}
          ref={ref}
          style={{
            width: popoverWidth ? popoverWidth : "100%",
            maxHeight: popoverMaxHeight ? popoverMaxHeight : "auto",
          }}
          onClick={() => {
            if (closeAfterClick) {
              setShow(false);
            }
          }}
        >
          {content}
        </div>
      ) : null}
    </div>
  );
}
