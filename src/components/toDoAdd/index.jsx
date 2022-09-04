import React from "react";
import { useState } from "react";
import addStyle from "./addStyle.module.css"
const ToDoAdd = (props) => {
      const [crInput, setCrInput] = useState('');
      const handleSubmit = (e) => {
            e.preventDefault();
            props.Add(crInput);
            setCrInput("");
      };
      return (
            <div className={addStyle.add}>
                  <span className={addStyle.name}>TO DO</span>
                  <input onChange={event => { setCrInput(event.target.value) }} className={addStyle.input} type="text" value={crInput} placeholder="Add to do" />
                  <button className={addStyle.btn} onClick={handleSubmit} >Add</button>
            </div>

      );



};
export default ToDoAdd;