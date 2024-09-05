import React, { useEffect, useRef, useState } from "react";
import "./Modal.scss";

type PropsType = {
  open: boolean;
  onCancel: () => void;
  onSave?: () => void;
  title?: any;
  children?: any;
  footer?: any;
  width?: string;
};

const className: string = "warasar-modal";

export default function Modal({
  open,
  onCancel,
  onSave,
  title,
  children,
  footer,
  width,
}: PropsType) {
  const [show, setShow] = useState<boolean>(false);
  const ref: any = useRef(null);

  useEffect(() => {
    if (open) {
      setShow(true);
    }
  }, [open]);

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
          <div />
          <div
            className={`${className}-footer-save${
              footer.saveDisabled ? "-disabled" : ""
            }`}
            onClick={() => (onSave && !footer.saveDisabled ? onSave() : null)}
          >
            {footer.save}
          </div>
          <div className={`${className}-footer-decline`} onClick={onCancel}>
            {footer.decline}
          </div>
        </div>
      ) : (
        footer
      )
    ) : null;
  };

  return show ? (
    <div className={`${open ? className : `${className}-hidden`}`}>
      <div className={`${className}-bg`} />
      <div
        className={`${className}-container`}
        ref={ref}
        style={{ width: width ? width : "auto" }}
      >
        {renderTitle(title)}
        <div className={`${className}-children`}>
          {children ? children : "Нет данных"}
        </div>
        {renderFooter(footer)}
      </div>
    </div>
  ) : null;
}
