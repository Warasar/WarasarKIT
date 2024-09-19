import "./Message.scss";
import imageSuccess from "../../images/success-circle.svg";
import imageWarn from "../../images/warn-circle.svg";
import imageInfo from "../../images/info-circle.svg";
import imageError from "../../images/error-circle.svg";

const { v4: uuidv4 } = require("uuid");
const className: string = "warasar-message";

export const message: any = (text: string, type: string) => {
  let uniqueCode: string = uuidv4();
  let elem = document.createElement("div");
  elem.innerHTML = `${text}`;
  elem.className = className;
  elem.id = `message_${uniqueCode}`;

  var icon = document.createElement("img");
  if (type === "success") {
    icon.setAttribute("src", imageSuccess);
  } else if (type === "info") {
    icon.setAttribute("src", imageInfo);
  } else if (type === "warn" || type === "warning") {
    icon.setAttribute("src", imageWarn);
  } else if (type === "err" || type === "error") {
    icon.setAttribute("src", imageError);
  }
  icon.setAttribute("height", "24");
  icon.setAttribute("width", "24");

  elem.insertBefore(icon, elem.firstChild);

  document.body.appendChild(elem);

  elem.style.left = `calc(50% - ${elem.offsetWidth / 2}px)`;

  setTimeout(() => animElem("1", uniqueCode), 200);
  setTimeout(() => animElem("0", uniqueCode), 3200);
};

const animElem = (val: string, uniqueCode: string) => {
  const child = document.getElementById(`message_${uniqueCode}`);
  if (child) {
    child.style.opacity = val;
    if (val === "0") setTimeout(() => delElem(uniqueCode), 200);
  }
};
const delElem = (uniqueCode: string) => {
  const child = document.getElementById(`message_${uniqueCode}`);
  if (child) {
    document.body.removeChild(child);
  }
};
