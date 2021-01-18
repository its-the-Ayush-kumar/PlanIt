import React from 'react';
import './App.css';
import Plan from './components/Plan/Plan.js';
import New from './components/New/New.js';

function App() {
  function toggleView(){
    let addTask = document.getElementById("addTask");
    let taskList = document.getElementById("taskList");
    taskList.style.display = (taskList.style.display === "" || taskList.style.display === "block") ? "none" : "block";
    addTask.style.display = (addTask.style.display === "" || addTask.style.display === "none") ? "block" : "none";
  }

  return (
    <div className="App">
      <div id="addTask"><New></New></div>
      <div id="taskList"><Plan></Plan></div>
      <img id="add" class="button" onClick={() => toggleView()} src={process.env.PUBLIC_URL + '/add.png'}/>
    </div>
  );
}

export default App;
