import React, { useEffect, useRef } from "react";
import "./Modal.scss";

type PropsType = {
  open: boolean;
  onCancel: () => void;
  title?: any;
  children?: any;
  footer?: any;
};

const className: string = "warasar-modal";

export default function Modal({
  open,
  onCancel,
  title,
  children,
  footer,
}: PropsType) {
  const ref: any = useRef(null);

  const useOutsideAlerter = (ref: any) => {
    useEffect(() => {
      function handleClickOutside(event: any) {
        if (ref.current && !ref.current.contains(event.target) && open) {
          onCancel();
        }
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ref, open]);
  };
  useOutsideAlerter(ref);

  const renderTitle = (title: string | undefined) => {
    return title ? (
      <div className={`${className}-title`}>
        {typeof title === "string" ? (
          <div className={`${className}-title-text`}>{title}</div>
        ) : (
          title
        )}
        <div className={`${className}-title-iconClose`} onClick={onCancel} />
      </div>
    ) : null;
  };

  const renderFooter = (footer: any) => {
    return footer ? (
      footer.save && footer.decline ? (
        <div className={`${className}-footer`}>
          <div className={`${className}-footer-save`}>{footer.save}</div>
          <div className={`${className}-footer-decline`}>{footer.decline}</div>
        </div>
      ) : (
        footer
      )
    ) : null;
  };

  /* {modalCode ? ( */
  return (
    <div className={`${className}`} style={{ display: open ? "flex" : "none" }}>
      <div className={`${className}-bg`} />
      <div className={`${className}-container`} ref={ref} style={{}}>
        {renderTitle(title)}
        <div className={`${className}-children`}>
          {children ? children : "Нет данных"}
        </div>
        {renderFooter(footer)}
      </div>
    </div>
  );
}
/* ) : null} */
