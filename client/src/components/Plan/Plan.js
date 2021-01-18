import React, {useEffect, useState} from 'react';
import './Plan.css';

function Plan(){
    const [tTasks, setTTasks] = useState(null);
    const [mTasks, setMTasks] = useState(null);

    useEffect(() => {
        // get tasks on view load
        async function getMiscellaneousTasks(){
            let response = await fetch("http://localhost:9000/getMiscellaneousTasks");
            if(response.status === 200){
                response = await response.json();
                setMTasks(response.tasks);
            }
        }
        async function getTimedTasks(){
            let response = await fetch("http://localhost:9000/getTimedTasks");
            if(response.status === 200){
                response = await response.json();
                setTTasks(response.tasks);
            }
        }

        getMiscellaneousTasks();
        getTimedTasks();
    }, []);

    function appendTask(task, list, type){
        let newTask = document.createElement('div');
        let heading = document.createElement('h2');
        let description = document.createElement('h5');
        heading.innerHTML = task.heading;
        description.innerHTML = task.description;
        newTask.appendChild(heading);

        if(type === "T"){
            let time = document.createElement('h5');
            time.innerHTML = task.time;
            newTask.appendChild(time);
        }
        newTask.appendChild(description);

        newTask.classList.add((type === "T") ? "t-task" : "m-task");
        newTask.classList.add("task");

        list.appendChild(newTask);
    }

    useEffect(() => {
        // update timed tasks
        if(tTasks){
            let list = document.getElementById("timed-tasks");
            tTasks.forEach(task => appendTask(task, list, "T"));
        }
    }, [tTasks]);

    useEffect(() => {
        // update miscellaneous tasks
        if(mTasks){
            let list = document.getElementById("miscellaneous-tasks");
            mTasks.forEach(task => appendTask(task, list, "M"));
        }
    }, [mTasks]);

    function toggleView(){
        let tTask = document.getElementById("timed-tasks");
        let mTask = document.getElementById("miscellaneous-tasks");
        tTask.style.display = (tTask.style.display === "" || tTask.style.display === "block") ? "none" : "block";
        mTask.style.display = (mTask.style.display === "" || mTask.style.display === "none") ? "block" : "none";
    }

    return (
        <>
        <div class="back">
            <div id="timed-tasks" class="page"></div>
            <div id="miscellaneous-tasks" class="page"></div>
            <div id="buttons">
                <img id="miscTask" class="button" onClick={() => toggleView()} src={process.env.PUBLIC_URL + '/miscellaneous.png'}/>
            </div>
        </div>
        </>
    );
}
export default Plan;