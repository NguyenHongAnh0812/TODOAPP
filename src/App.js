import { useEffect, useState, axios } from 'react';
import ToDoAdd from './components/toDoAdd';
import ToDoList from './components/toDoList/index';
import Login from './components/login/index';
import Register from './components/register/index';
import { Route, Routes,useNavigate } from "react-router-dom";
import "./App.css"
function App() {
  const navigate = useNavigate();
  const obj = [];
  const axios = require('axios').default;
  useEffect(() => {
    axios.get('https://6312bc98b466aa9b038d6e93.mockapi.io/users')
      .then(function (response) {
        setList(response.data)
      })
      .catch(function (error) {

        console.log(error);
      })
  }, []);
  useEffect(() => {
    axios.get('https://6312bc98b466aa9b038d6e93.mockapi.io/accout')
      .then(function (response) {
        setAccout(response.data)
      })
      .catch(function (error) {

        console.log(error);
      })
  }, []);
  const [accout, setAccout] = useState(obj);
  const [list, setList] = useState(obj);
  const [crInput, setCrInput] = useState('');
  let Delete = (id) => {
    axios.delete(`https://6312bc98b466aa9b038d6e93.mockapi.io/users/${id}`)
    setList((list) => list.filter((ele) => ele.id !== id));
  };
  let Add = (name) => {
    if (name != "") {
      axios.post('https://6312bc98b466aa9b038d6e93.mockapi.io/users',
        {
          name: name,
          isDone: false
        }
      )
      const newList = list;
      newList.push(
        {
          name: name,
        }
      );
      setCrInput("");
      setList([...newList]);
    }
  };
  const completeItem = (it) => {
    setList((items) =>
      items.map((ele) =>
        ele.id === it.id ? { ...ele, isDone: !ele.isDone } : ele
      )
    );
    axios.put(`https://6312bc98b466aa9b038d6e93.mockapi.io/users/${it.id}`,
      {
        isDone: !it.isDone
      }
    )

  }
  const updateList = (newName, it) => {
    setList((items) =>
      items.map((ele) =>
        ele.id === it.id ? { ...ele, name: newName } : ele
      )
    );
    axios.put(`https://6312bc98b466aa9b038d6e93.mockapi.io/users/${it.id}`,
      {
        name: newName
      }
    )

  }
  const handleSubmit1 = (e) => {
    navigate('/')
};
  return (
    <>
       <Routes >
        <Route path ="/" element = {<Login accout={accout} />} />
        <Route path ="/register" element = {<Register />} />
        <Route path ="/homeAdmin" element = { 
        <div className='app'>
          <ToDoAdd key={list.id} Add={Add} />
          <ToDoList key={list.id} list={list} Delete={Delete} completeItem={completeItem} updateList={updateList} />
        </div>} />
        <Route path ="/homeUser" element = { 
        <div className='app1'>
          <p className='title'>Bạn đăng đăng nhập với tư cách là User</p>
          <button className='btn1' onClick={handleSubmit1} >Logout</button>
          <ToDoList key={list.id} list={list} Delete={Delete} completeItem={completeItem} updateList={updateList} />
        </div>} />
      </Routes>  
    </>

  );
}

export default App;
