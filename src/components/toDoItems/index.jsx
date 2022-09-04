import React, { axios, useState } from "react";
import ItemsStyle from './itemsStyle.module.css';
const ToDoItems = (props) => {
    let { id, name, Delete, index, items, completeItem, list, updateList } = props;
    const [edit, setEdit] = useState(true)
    const [nameInput, setNameInput] = useState('')
    const handleEdit = (id) => {
        const item = list.filter((ele) => ele.id == id);
        setNameInput(item[0].name)
        setEdit(false)
    }
    const handleUpdate = (id) => {
        const item = list.filter((ele) => ele.id == id);
        item[0].name = nameInput;
        setEdit(true)
        updateList(nameInput, items)
    }
    return (
        <li key={id} className={ItemsStyle.li} >
            <input
                style={{ opacity: items.isDone ? "0.3" : "1" }}
                type="checkbox"
                onChange={() => completeItem(items)}
                checked={items.isDone}
            />
            {
                !edit ?
                    (
                        <input onChange={event => { setNameInput(event.target.value) }} value={nameInput} style={{ opacity: items.isDone ? "0.3" : "1" }} type="text" placeholder="Add to do" />
                    )
                    :
                    (
                        <div style={{ opacity: items.isDone ? "0.3" : "1", textDecoration: items.isDone ? "line-through" : null }} className={ItemsStyle.name}>{name}</div>
                    )
            }
            {
                !edit ?
                    (
                        <div className={ItemsStyle.btn}>
                            <button id={id} onClick={() => handleUpdate(id)} className={ItemsStyle.btns} > Update</button>
                        </div>
                    )
                    :
                    (
                        <div className={ItemsStyle.btn}>
                            <button style={{ display: items.isDone ? "none" : "block" }} id={id} onClick={() => handleEdit(id)} className={ItemsStyle.btns}  > Edit</button>
                            <button id={id} onClick={() => Delete(id)} className={ItemsStyle.btns}  > Delete</button>
                        </div>
                    )
            }
        </li>
    );
};

export default ToDoItems;
