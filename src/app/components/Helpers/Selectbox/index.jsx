import { useState } from "react";
import "./style.css";

export default function Selectbox({ datas = [], className, action, children }) {
  const [item, setItem] = useState(datas[0]);
  const [toggle, setToggle] = useState(false);
  const handler = (e, value) => {
    if (action) {
      action(value);
    }
    setItem(value);
    setToggle(!toggle);
  };
  return (
    <>
      {datas.length > 0 && (
        <div className={`my-select-box ${className || ""}`}>
          <button
            onClick={() => setToggle(!toggle)}
            type="button"
            className="my-select-box-btn "
          >
            {children ? children({ item }) : <span>{item === 'az' || item === 'en' || item === 'ru' ? <img src={`assets/images/${item}.png`} alt="" className=" w-6 h-4" /> : item} </span>}
          </button>
          {toggle && (
            <div
              className="click-away"
              onClick={() => setToggle(!toggle)}
            ></div>
          )}
          <div className={`my-select-box-section ${toggle ? "open" : ""}`}>
            <ul className="list w-full ">
              {datas.map((value) => (
                <li
                  className={item === value ? "selected" : "bg-white"}
                  key={Math.random() + value}
                  onClick={(e) => handler(e, value)}
                >
                  {value.toUpperCase()}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}
