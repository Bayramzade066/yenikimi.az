import { useState } from "react";
import "./style.css";
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

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
        <div  onClick={() => setToggle(!toggle)} className={`flex  my-select-box ${className || ""}`}>
        
          <button
            type="button"
          >
            {children ? children({ item }) : <span>{item === 'az' || item === 'en' || item === 'ru' ? <img src={`assets/images/${item}.png`} alt="" className=" w-6 h-4" /> : item} </span>}
          </button>
          <ArrowDropDownIcon className="fill-current qblack cursor-pointer" />
          {toggle && (
            <div
              className="click-away"
              onClick={() => setToggle(!toggle)}
            ></div>
          )}
          <div className={`my-select-box-section ${toggle ? "open" : ""}`}>
            <ul className="list w-full">
              {datas.map((value) => (
                <li
                  className={item === value ? "selected !pl-4" : "bg-white !pl-4"}
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
