import React from "react";
import { useState } from "react";
import ToDoItems from "../toDoItems/toDoItems";
import ToDoListStyle from './toDoList.module.css';
const ToDoList=()=> 
{

const obj= [
];
const [list, setList] = useState(obj);
const [crInput, setCrInput] = useState('');
let Delete = (index) => {
   const newList = list;
   newList.splice(index,1);
   setList([...newList]);
   console.log(newList);
 };
 let Add = () => {
   const newList = list;
   newList.push(
      {
         name : crInput,
      }
   );
   setCrInput("");
   setList([...newList]);
   console.log(newList);
 };
   return (
      
      <div>
         <div className={ToDoListStyle.add}>
            <div className={ToDoListStyle.ip}>
               <div className={ToDoListStyle.name}>TO DO</div>
               <input onChange={event => {setCrInput(event.target.value)}} className={ToDoListStyle.input} type="text" value={crInput} />
            </div>
            
            <button onClick={()=>Add()} className= {ToDoListStyle.btn}>Add</button>
         </div>
         <ul >
         {
            list.map((items,index) =>
            {
               return (
                  <ToDoItems id={index+1} name={items.name} Delete={Delete} index={index}/>
                );
            }
            )      
         }
         </ul>
      </div>
      
    );
    
         
     
};
export default ToDoList;