import React from "react";
import ToDoItemsStyle from './toDoItems.module.css';
const ToDoItems=(props)=>
{
    let {id, name , Delete , index} = props;
    return (
        <li key={id} className={ToDoItemsStyle.li} >
            <div className={ToDoItemsStyle.id}>{id}</div>
            <div className={ToDoItemsStyle.name}>{name}</div>
            <button index={index} onClick={()=>Delete(index)} className={ToDoItemsStyle.btn} > Delete</button>
        </li>
      );
};

export default ToDoItems;
