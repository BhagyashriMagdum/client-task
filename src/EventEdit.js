import { useParams, useHistory } from "react-router-dom";
import React, { useState } from 'react';


const EventEdit = () => {

    const history = useHistory();
    const param = useParams();

    const Event = JSON.parse(localStorage.getItem("toDoList"));
    var updateEvent = Event.filter(event => event.id == param.eventid);

    const [name, setName] = useState(updateEvent[0].Name);
    const [startDate, setStartDate] = useState(updateEvent[0].StartDate);
    const [stopDate, setStopDate] = useState(updateEvent[0].StopDate);
    const handleNameChange = (e) => {
        setName(e.currentTarget.value)
    }


    const handleSubmit = (e) => {
        e.preventDefault();

        var data = {
            userName: name,
            startDate: startDate,
            endDate: stopDate,
        };

        var updatedList = Event.filter(event => event.id != param.eventid);
        var updatedData = [...updatedList, { id: param.eventid, Name: data.userName, StartDate: data.startDate, StopDate: data.endDate, complete: false }];
        localStorage.setItem("toDoList", JSON.stringify(updatedData));
        history.push('/');

    }

    return (

        <div>
            <div className="App">
                <div style={{ paddingTop: "20px" }}>
                    <div className="row justify-content-md-center">
                        <div className="card">
                            <div className="card-header">Edit Event</div>
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


            </div>


        </div>

    )

}
export default EventEdit;