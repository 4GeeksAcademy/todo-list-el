import React, { useEffect, useState } from "react";
//async 
//then
let urlBase = "https://playground.4geeks.com/apis/fake/todos/user/elobaton"
//create your first component
const Home = () => {
    const [taskList, setTaskList] = useState([])
    const [task, setTask] = useState({
        label: "",
        done: false
    })
    // async await
    const getAllTask = async () => {
        try {
            //itntenta resolver esto
            let response = await fetch(urlBase)
            //traducir de api a json
            let data = await response.json()
            if (response.ok) {
                setTaskList(data)
            }
            if (response.status == 404) {
                createUser()
            }
        } catch (error) {
            //si tenemos errores entra aquí
            console.log(error)
        }
    }
    //then
    // const getAllTask = () => {
    //  fetch(urlBase)
    //      .then((response) => response.json())
    //      .then((data) => setTaskList(data))
    //      .catch((err) => console.log(err))
    // }
    const createUser = async () => {
        try {
            let response = await fetch(urlBase, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify([])
            })
            if (response.ok) {
                getAllTask()
            } else {
                console.log("Administrador de sistema")
            }
        } catch (error) {
            console.log(error)
        }
    }
    const handleChange = (event) => {
        setTask({
            ...task,
            [event.target.name]: event.target.value
        })
    }
    const saveTask = async (event) => {
        if (event.key == "Enter") {
            try {
                let response = await fetch(urlBase, {
                    method: "PUT",
                    headers: {
                        "Content-type": "application/json"
                    },
                    body: JSON.stringify([...taskList, task])
                })
                if (response.ok) {
                    getAllTask()
                }
            } catch (error) {
                console.log(error)
            }
        }
    }
    const deleteTask = async (id) => {
        let newTask = taskList.filter((item, index) => id != index)
        try {
            let response = await fetch(urlBase, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newTask)
            })
            if (response.ok) {
                getAllTask()
            }
        } catch (error) {
        }
    }
    useEffect(() => {
        getAllTask()
        console.log("hola")
    }, [])
    return (
        <>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-12 col-md-6">
                        <h2 className="text-center">Todo list</h2>
                        <input
                            className="text-center"
                            type="text"
                            placeholder="Ingresa las tareas"
                            name="label"
                            value={task.label}
                            onChange={handleChange}
                            onKeyDown={saveTask}
                        />
                        <ul>
                            {
                                taskList.map((item, index) => {
                                    return (
                                        <li key={index} onClick={() => deleteTask(index)}>{item.label}</li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
};
export default Home;
