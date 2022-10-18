import React, { useState, useEffect } from 'react';
import './App.css';
import Form from './Components/Form';
import TodoList from './Components/TodoList';

function App() {

  // State 
  const [inputText, setInputText] = useState("");
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState("all");
  const [filteredTodos, setFilteredTodos] = useState([]);

  //Use Effect
  //Run Once
  useEffect(() => {
    getLocalTodos();
  }, [])

  useEffect(() => {
    filterHandler();
    saveLocalTodos();
  }, [todos, status])

  //Function
  const filterHandler = () => {
    switch (status) {
      case 'completed':
        setFilteredTodos(todos.filter(todo => todo.completed === true))
        break;
      case 'uncompleted':
        setFilteredTodos(todos.filter(todo => todo.completed === false))
        break;
      default:
        setFilteredTodos(todos);
        break;
    }
  };

  //Save to Local
  const saveLocalTodos = () => {
    localStorage.setItem('todos', JSON.stringify(todos));

  };

  const getLocalTodos = () => {
    if (localStorage.getItem('todos') === null) {
      localStorage.setItem('todos', JSON.stringify([]));
    } else {
      let todoLocal = JSON.parse(localStorage.getItem('todos', JSON.stringify(todos)));
      setTodos(todoLocal);
    }
  };


  return (
    <div className="App">
      <header>
        <h1>My TODO List</h1>

      </header>
      <Form inputText={ inputText } todos={ todos } setTodos={ setTodos } setInputText={ setInputText } setStatus={ setStatus } />
      <TodoList todos={ todos } setTodos={ setTodos } filteredTodos={ filteredTodos } />
    </div>
  );
}

export default App;
