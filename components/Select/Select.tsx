import React, { useEffect, useRef, useState } from "react";
import "./Select.scss";
import Empty from "../Empty/Empty";
import Input from "../Input/Input";

type PropsType = {
  data: any;
  value: any;
  onValueChanged: (e: any) => void;
  disabled?: boolean;
  valueFld?: string;
  displayFld?: string;
  id?: string;
  placeholder?: string;
  dontShowClear?: boolean;
  dontShowArrow?: boolean;
  dontShowBorder?: boolean;
  popoverWidth?: string;
  popoverMaxHeight?: string;
  borderRadius?: string;
};

const className = "warasar-select";

export default function Select({
  data,
  value,
  onValueChanged,
  disabled,
  valueFld,
  displayFld,
  id,
  placeholder,
  dontShowClear,
  dontShowArrow,
  dontShowBorder,
  popoverWidth,
  popoverMaxHeight,
  borderRadius,
}: PropsType) {
  const [show, setShow] = useState<boolean>(false);
  const [showData, setShowData] = useState<any>([]);
  const [constShowData, setConstShowData] = useState<any>([]);
  const [searchValue, setSearchValue] = useState<any>(null);
  const [searchActive, setSearchActive] = useState<boolean>(false);

  const ref: any = useRef(null);
  const nameExpr = displayFld ? displayFld : "name";
  const valueExpr = valueFld ? valueFld : "code";

  useEffect(() => {
    if (data && data.length > 0) {
      setConstShowData(data);
      setShowData(data);
    }
  }, [data]);

  useEffect(() => {
    if (searchValue && searchValue.length > 0) {
      let newData: any = [...constShowData];
      newData = newData.filter(
        (item: any) =>
          item[nameExpr] &&
          item[nameExpr].toLowerCase().includes(searchValue.toLowerCase())
      );
      setShowData(newData);
    } else if (constShowData.length > 0) {
      setShowData(constShowData);
    } else {
      setShowData(data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchValue]);

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
      setSearchActive(false);
      setSearchValue(null);
      let obj: any = document.getElementById(`${className}-input` + id);
      if (obj) {
        obj.focus();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show]);

  return (
    <div style={{ position: "relative", height: "calc(100% - 1px)" }}>
      <div
        className={
          `${className}` +
          (show ? ` ${className}-active` : "") +
          (disabled ? "-disabled" : "")
        }
        id={`${className}_${id}`}
        style={{
          border: dontShowBorder ? "none" : "1px solid #E2E8F0",
          borderRadius: borderRadius
            ? borderRadius
            : dontShowBorder
            ? "0px"
            : "6px",
          gridTemplateColumns: value ? "1fr auto auto" : "1fr auto",
        }}
      >
        <Input
          key={`${className}-input_` + id}
          disabled={disabled}
          value={
            searchActive
              ? searchValue
              : value?.[nameExpr]
              ? value?.[nameExpr]
              : ""
          }
          onValueChanged={(e: any) => {
            setSearchActive(true);
            setSearchValue(e.target.value);
          }}
          textAlign={"start"}
          placeholder={placeholder ? placeholder : ""}
          onClick={() => (disabled ? null : setShow(!show))}
          onFocus={() => {
            return show ? true : false;
          }}
          noBorder
          size={"small"}
        />
        {value && !dontShowClear ? (
          <div
            className={`${className}-xIcon`}
            id={`${className}-xIcon` + id}
            onClick={() => {
              let obj: any = document.getElementById(`${className}-input` + id);
              if (obj) {
                obj.value = null;
              }
              setSearchActive(false);
              setSearchValue(null);
              onValueChanged(null);
            }}
          />
        ) : null}
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
        >
          <div className={`${className}-items`}>
            {showData.length === 0 ? (
              <Empty text="Нет данных для отображения" />
            ) : (
              showData.map((item: any) => {
                return (
                  <div
                    className={
                      `${className}-item` +
                      (value?.[valueExpr] === item?.[valueExpr]
                        ? "-active"
                        : "")
                    }
                    onClick={() => {
                      value?.[valueExpr] === item?.[valueExpr] && !searchActive
                        ? onValueChanged(null)
                        : onValueChanged(item);
                      setShow(false);
                      setSearchActive(false);
                      setSearchValue(null);
                    }}
                  >
                    {item?.[nameExpr]}
                  </div>
                );
              })
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
}
