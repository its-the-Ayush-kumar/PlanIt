import React, {useEffect, useState} from 'react';
import './New.css';

function New() {
    const [task, setTask] = useState(null);

    useEffect(() => {
        async function addTask(){
            // add task to task list
            let response = await fetch("http://localhost:9000/newTask", {
                method: "POST",
                body: JSON.stringify(task),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            });
            if(response.status === 200) alert("Task added!");
            else alert("Task could not be added!");
        }

        if(task) addTask();
    }, [task]);

    function createTask(){
        setTask({
            heading: document.getElementById('taskHeading').value,
            startTime: document.getElementById('taskStartTime').value,
            startDate: document.getElementById('taskStartDate').value,
            endTime: document.getElementById('taskEndTime').value,
            endDate: document.getElementById('taskEndDate').value,
            description: document.getElementById('taskDescription').value
        });
    }

    return (
        <>
            <h1>New Task</h1>
            <form>
                <div class="form__group field">
                    <input class="form__field" id="taskHeading" name="name" placeholder="Task" type="text" required/>
                    <label class="form__label">Name</label>
                </div>
                <input id="taskStartTime" type="time"/>
                <input id="taskEndTime" type="time"/>
                <input id="taskStartDate" type="date"/>
                <input id="taskEndDate" type="date"/>
                <div class="form__group field">
                    <textarea class="form__field" id="taskDescription" name="description" placeholder="Description"/>
                    <label class="form__label">Description</label>
                </div>
                <button type="submit" onClick={() => createTask()}>Add</button>
            </form>
        </>
    );
}

export default New;