import React from "react";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import addStyle from "./addStyle.module.css"
const ToDoAdd = (props) => {
      const navigate = useNavigate();
      const [crInput, setCrInput] = useState('');
      const handleSubmit = (e) => {
            e.preventDefault();
            props.Add(crInput);
            setCrInput("");
      };
      const handleSubmit1 = (e) => {
            navigate('/')
      };
      return (
            <>
            <p className={addStyle.title}>Bạn đăng đăng nhập với tư cách là Admin</p>
            <div className={addStyle.add}>
                  <span className={addStyle.name}>TO DO</span>
                  <input onChange={event => { setCrInput(event.target.value) }} className={addStyle.input} type="text" value={crInput} placeholder="Add to do" />
                  <button className={addStyle.btn} onClick={handleSubmit} >Add</button>
            </div>
            <button className={addStyle.btn1} onClick={handleSubmit1} >Logout</button>
            </>
      );



};
export default ToDoAdd;