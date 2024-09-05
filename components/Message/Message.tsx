import "./Message.scss";
import imageSuccess from "../../images/success-circle.svg";
import imageWarn from "../../images/warn-circle.svg";
import imageInfo from "../../images/info-circle.svg";
import imageError from "../../images/error-circle.svg";

const className: string = "warasar-message";

export const message: any = (text: string, type: string) => {
  let elem = document.createElement("div");
  elem.innerHTML = `${text}`;
  elem.className = className;
  elem.id = "message";

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

  setTimeout(() => animElem("1"), 200);
  setTimeout(() => animElem("0"), 3200);
};

const animElem = (val: string) => {
  const child = document.getElementById("message");
  if (child) {
    child.style.opacity = val;
    if (val === "0") setTimeout(delElem, 200);
  }
};
const delElem = () => {
  const child = document.getElementById("message");
  if (child) {
    document.body.removeChild(child);
  }
};
