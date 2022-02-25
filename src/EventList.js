
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import moment from "moment";
function EventList() {
    const [toDoList, setToDoList] = useState([]);

    const addTask = (userInput) => {
        var List = [...toDoList, { id: toDoList.length + 1, Name: userInput.userName, StartDate: userInput.startDate, StopDate: userInput.endDate, complete: false }];

        localStorage.setItem("toDoList", JSON.stringify(List));
        setToDoList(JSON.parse(localStorage.getItem('toDoList')))
    }

    const DeleteEvent = (id) => {
        var newEventArr = toDoList.filter(event => event.id !== id);
        setToDoList(newEventArr)
        localStorage.setItem("toDoList", JSON.stringify(newEventArr));
    }

    useEffect(() => {
        if (localStorage.getItem('toDoList')) {
            setToDoList(JSON.parse(localStorage.getItem('toDoList')))
        }
    }, []);

    const [name, setName] = useState('');

    const [startDate, setStartDate] = useState("");
    const [stopDate, setStopDate] = useState("");
    const handleNameChange = (e) => {
        setName(e.currentTarget.value)
    }

    // var myDate = new Date();
    // today = today.split("-");
    // var newDate = new Date(today[0], today[1] - 1, today[2]);
    // console.log(newDate.getTime());

    // var currentDate = today.getDate() + "-" + parseInt(today.getMonth() + 1) + "-" + today.getFullYear();

    const today = new Date();
    const currentDate = moment(today).format("YYYY-MM-DD");
    const dateformat = (date) => {
        return moment(date).format("YYYY-MM-DD");
    }
    console.log(currentDate);

    const handleSubmit = (e) => {
        e.preventDefault();
        var data = {
            userName: name,
            startDate: startDate,
            endDate: stopDate,
        };
        addTask(data);
        setName("");
    }


    return (
        <div className="App">
            <div style={{ paddingTop: "20px", marginBottom: "40px" }}>
                <div className="row justify-content-md-center">
                    <div className="card">
                        <div className="card-header">Events</div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="row">
                                    <div className='col-md-12'>
                                        <label>Event Name</label>
                                        <input value={name} type="text" onChange={handleNameChange} placeholder="Enter Name..." style={{ width: "100%" }} />
                                    </div>
                                    <div className="col-md-6">
                                        <h6>From</h6>
                                        <input
                                            type="date"
                                            value={startDate}
                                            onChange={(e) => {
                                                console.log("input e", e.target.value);
                                                setStartDate(e.target.value)
                                            }}
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <h6>To</h6>
                                        <input
                                            type="date"
                                            value={stopDate}
                                            onChange={(e) => {
                                                console.log("input e", e.target.value);
                                                setStopDate(e.target.value)
                                            }}
                                        />
                                    </div>
                                </div>

                                <button className='btn btn-primary' style={{ marginTop: "20px" }}>Submit</button>
                            </form>
                        </div>
                    </div>

                </div>
            </div>

            {/* List Data */}
            <div>
                <table className="table table-bordered" style={{ width: " 60%", margin: "auto" }}>
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Event</th>
                            <th scope="col">Start Date</th>
                            <th scope="col">End Date</th>
                            <th scope="col">Action</th>
                            <th scope="col">Status</th>

                        </tr>
                    </thead>
                    <tbody>
                        {toDoList && toDoList.map((user) => (

                            <tr key={user.id}>

                                <th scope="row">{user.id}</th>
                                <td>{user.Name}</td>
                                <td>{user.StartDate}</td>
                                <td>{user.StopDate}</td>
                                <td> <Link to={`/edit/${user.id}`}><button className='btn btn-primary' style={{ marginRight: "10px" }}>Edit</button></Link><button className='btn btn-danger' onClick={() => DeleteEvent(user.id)}>Delete</button></td>
                                {/* <td>{
                                    dateformat(startDate) > currentDate ? "Upcoming Events" : (dateformat(startDate) < currentDate ? "onGoing Events" : 'Past Events')} </td> */}
                                <td>{dateformat(user.StartDate) > currentDate
                                    ? <h5 style={{ backgroundColor: "#ec4444", width: "170px", padding: "4px", color: "white" }}>Upcoming Events</h5>
                                    : dateformat(user.StartDate) == currentDate
                                        ? <h5 style={{ backgroundColor: "#3b9c3b", width: "170px", padding: "4px", color: "white" }}>On Going Events</h5>
                                        : <h5 style={{ backgroundColor: "#4899ec", width: "120px", padding: "4px", color: "white" }}>Past Events</h5>}</td>
                            </tr>
                        ))
                        }


                    </tbody>
                </table>

            </div>
        </div>
    );
}

export default EventList;






