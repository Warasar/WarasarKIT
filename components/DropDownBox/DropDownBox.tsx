import React, { Fragment, useEffect, useRef, useState } from "react";
import "./DropDownBox.scss";
import _ from "lodash";
import Empty from "../Empty/Empty";
import Input from "../Input/Input";

type PropsType = {
  data: any;
  value: any;
  onValueChanged: (e: any) => void;
  nameField?: string;
  valueField?: string;
  parentField?: string;
};

const className: string = "warasar-dropdown";

export default function DropDownBox({
  data,
  value,
  onValueChanged,
  nameField,
  valueField,
  parentField,
}: PropsType) {
  const [show, setShow] = useState<boolean>(false);
  const [tree, setTree] = useState<any>([]);
  const [constTree, setConstTree] = useState<any>([]);
  const [search, setSearch] = useState<string>("");
  const [firstParent, setFirstParent] = useState<string | null>(null);

  const ref: any = useRef(null);
  const nameFld = nameField ? nameField : "name";
  const valueFld = valueField ? valueField : "code";
  const parentFld = parentField ? parentField : null;

  useEffect(() => {
    if (data && data.length > 0) {
      getTree();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const getTree = () => {
    data.forEach((f: any) => {
      if (f.collapse !== true || f.collapse !== false) {
        f.collapse = false;
      }
    });

    if (parentFld) {
      let a: any = data.find(
        (f: any) => !data.some((s: any) => s[valueFld] === f[parentFld])
      );
      setFirstParent(a[parentFld]);
    }

    setConstTree(data);
    setTree(data);
  };

  const renderTree = (
    treeData: any,
    parent_code: string | null,
    padding: number,
    lvl: number
  ) => {
    let jsx: any = [];
    const visionTree: any = parentFld
      ? treeData.filter((f: any) => f[parentFld] === parent_code)
      : treeData;

    visionTree.forEach((item: any) => {
      jsx.push(
        <Fragment>
          <div
            className={`${className}-item`}
            onDoubleClick={() =>
              !parentFld ||
              (parentFld &&
                !treeData.some((f: any) => f[parentFld] === item[valueFld]))
                ? value?.[valueFld] === item[valueFld]
                  ? onValueChanged(null)
                  : onValueChanged(item)
                : collapseChange(item)
            }
            style={{ marginLeft: `${padding * lvl}px` }}
            key={item[valueFld]}
          >
            {!parentFld ||
            (parentFld &&
              !treeData.some((f: any) => f[parentFld] === item[valueFld])) ? (
              <div
                className={`${className}-item-checkbox${
                  value?.[valueFld] === item[valueFld] ? "-active" : ""
                }`}
                onClick={() =>
                  value?.[valueFld] === item[valueFld]
                    ? onValueChanged(null)
                    : onValueChanged(item)
                }
              />
            ) : (
              <div
                className={`${className}-item-arrow${
                  item.collapse ? "-active" : ""
                }`}
                onClick={() => collapseChange(item)}
              />
            )}
            <div className={`${className}-item-text`}>{item[nameFld]}</div>
          </div>

          {item.collapse &&
          parentFld &&
          treeData.some((f: any) => f[parentFld] === item[valueFld])
            ? renderTree(treeData, item[valueFld], padding, lvl + 1)
            : null}
        </Fragment>
      );
    });

    return jsx;
  };

  const collapseChange = (item: any) => {
    const newTree: any = _.cloneDeep(tree);
    newTree.find((f: any) => f[valueFld] === item[valueFld]).collapse =
      !item.collapse;
    setTree(newTree);

    const newConstTree: any = _.cloneDeep(constTree);
    newConstTree.find((f: any) => f[valueFld] === item[valueFld]).collapse =
      !item.collapse;
    setConstTree(newConstTree);
  };

  const useOutsideAlerter = (ref: any) => {
    useEffect(() => {
      function handleClickOutside(event: any) {
        if (ref.current && !ref.current.contains(event.target) && show) {
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

  const handleKeyDown = (e: any) => {
    if (e.key === "Enter") {
      searchFunc();
    }
  };
  useEffect(() => {
    if (search?.length === 0) {
      searchFunc();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);
  const searchFunc = () => {
    if (search && search.length > 0) {
      let newTree: any = [...constTree];

      newTree = newTree.filter(
        (item: any) =>
          item[nameFld] &&
          item[nameFld].toLowerCase().includes(search.toLowerCase())
      );

      if (parentFld) {
        //----------в дереве------------
        newTree.forEach((item: any) => {
          if (item[valueFld]) {
            newTree = getChilds(constTree, item[valueFld], newTree);
          }
        });
        newTree.forEach((item: any) => {
          if (item[parentFld]) {
            newTree = getParents(constTree, item[parentFld], newTree);
          }
        });
      }

      newTree.forEach((f: any) => {
        f.collapse = true;
      });

      setTree(newTree);
    } else {
      setTree(constTree);
    }
  };

  const getChilds = (defaultTree: any, id: string, newTree: any) => {
    defaultTree.forEach((item: any) => {
      if (
        item[parentFld!] === id &&
        !newTree.some((f: any) => f[valueFld] === item[valueFld])
      ) {
        newTree.push(item);

        if (item[valueFld]) {
          newTree = getChilds(defaultTree, item[valueFld], newTree);
        }
      }
    });

    return newTree;
  };
  const getParents = (defaultTree: any, id_parent: string, newTree: any) => {
    defaultTree.forEach((item: any) => {
      if (
        item[valueFld] === id_parent &&
        !newTree.some((f: any) => f[valueFld] === id_parent)
      ) {
        newTree.push(item);

        if (item[parentFld!]) {
          newTree = getParents(defaultTree, item[parentFld!], newTree);
        }
      }
    });

    return newTree;
  };

  return (
    <div style={{ position: "relative" }}>
      <div className={`${className}`} onClick={() => setShow(!show)}>
        <div className={`${className}-text`}>{value?.[nameFld]}</div>
        <div className={`${className}-arrow`}>
          <div
            className={`${className}-arrow-icon` + (show ? "_active" : "")}
          />
        </div>
      </div>
      {show ? (
        <div className={`${className}-popover`} ref={ref}>
          <div className={`${className}-search`}>
            <Input
              value={value}
              onValueChanged={setSearch}
              onKeyDown={(e: any) => handleKeyDown(e)}
              textAlign={"start"}
              placeholder="Поиск"
            />
            <div
              className={`${className}-search-absolute`}
              onClick={() => searchFunc()}
              title="Поиск"
            >
              <div className={`${className}-search-absolute-icon`} />
            </div>
          </div>
          <div className={`${className}-items`}>
            {tree.length === 0 ? (
              <Empty text="Нет данных для отображения" />
            ) : (
              renderTree(tree, firstParent, 20, 0)
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
}
