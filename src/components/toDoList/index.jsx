import React from "react";
import ToDoItems from "../toDoItems/index";
import listStyle from "./listStyle.module.css"
const ToDoList = (props) => {
   const { list, Delete, completeItem, updateList } = props
   return (
      <div className={listStyle.container}>
         <div className={listStyle.header}>
            <div>Đã Xong</div>
            <div>Tên Công Việc</div>
            <div>Hành Động</div>
         </div>
         {
            list.length > 0 ?
               (
                  <ul >
                     {
                        list.map((items, index) => {
                           return (
                              <ToDoItems key={items.id} id={items.id} name={items.name} Delete={Delete} index={index} items={items} completeItem={completeItem} list={list} updateList={updateList} />
                           );
                        }
                        )
                     }
                  </ul>
               )
               :
               (
                  <div className={listStyle.no_job}>Hôm nay hơi nhàn rỗi nhỉ :v</div>
               )
         }
      </div>



   );



};
export default ToDoList;