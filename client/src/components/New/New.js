import React, {useEffect, useState} from 'react';
import './New.css';

function New() {
    const [task, setTask] = useState(null);

    useEffect(() => {
        async function addTask(){
            console.log("adding task!")
            // add task to task list
            let response = await fetch("http://localhost:9000/newTask", {
                method: "POST",
                body: JSON.stringify(task),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            });
            if(response.status === 200) console.log("Task added!")
            else console.log("Task could not be added!")
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
        console.log("Task set!")
    }

    return (
        <>
            <div class="back">
                <h1>New Task</h1>
                <form>
                    <div className="form__group field">
                        <input className="form__field" id="taskHeading" name="name" placeholder="Task" type="text" required/>
                        <label className="form__label">Name</label>
                    </div>
                    <input id="taskStartTime" type="time"/>
                    <input id="taskEndTime" type="time"/>
                    <input id="taskStartDate" type="date"/>
                    <input id="taskEndDate" type="date"/>
                    <div className="form__group field">
                        <textarea className="form__field" id="taskDescription" name="description" placeholder="Description"/>
                        <label className="form__label">Description</label>
                    </div>
                    <button type="submit" onClick={() => createTask()}>Add</button>
                </form>
            </div>
        </>
    );
}

export default New;