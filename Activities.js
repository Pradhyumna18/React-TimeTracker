import React, { Component } from "react";
import Report from './Report'
import DatePicker from "react-datepicker"
import 'react-datepicker/dist/react-datepicker.css';
import { TimePickerComponent } from '@syncfusion/ej2-react-calendars';
class Activities extends Component {
    state = {
        userDetails: [{
            userName: "",
            password: "",
            activities: [{ date: "", duration: "", activity: "" }]
        }],
        date: "",
        activity: "",
        startingTime: "",
        endingTime: 24,
temp:0
    }
        
    handleActivity = (e) => {
        this.setState({ activity: e.target.value })
    }
    handleStarting = (e) => {
        this.setState({ startingTime: e.target.value })
    }
    handleEnding = (e) => {

        this.setState({ endingTime: e.target.value })

    }
    handleDate = (date) => {
        this.setState({ date: date })
    }
    handleActivities = () => {
       let data=[];
        if (localStorage.getItem('document')) {
            data = JSON.parse(localStorage.getItem('document'))
        }

        let flag = 0;
        if (data != null) {
            for (let i = 0; i < data.length; i++) {
                if (data[i].password === this.props.password && data[i].userName === this.props.name) {
                    flag = 1;
                   // this.state.temp = i;
                    this.setState({temp:i})
                    break;
                }
                else {
                    flag = 0;
                //    this.state.temp = data.length
                this.setState({temp:data.length})
                }
            }
        }
        else {
            flag = 0;
           this.setState({temp:0})
        }
        if (flag === 1) {
            let newArray = data;
            const obj = {
                date: this.state.date,
                duration: this.state.endingTime - this.state.startingTime,
                activity: this.state.activity

            }
            newArray[this.state.temp].activities.push(obj);
            this.setState({ userDetails: newArray })
            // localStorage.setItem('document', JSON.stringify())
            localStorage.setItem('document', JSON.stringify(newArray))

        }
        else {
            let newArray = data;
            
            const obj = {
                userName: this.props.name,
                password: this.props.password,
                activities: [{
                    date: this.state.date,
                    duration: this.state.endingTime - this.state.startingTime,
                    activity: this.state.activity
                }]

            }
          newArray.push(obj)
            this.setState({ userDetails: newArray })
            localStorage.setItem('document', JSON.stringify(newArray))

        }
       
       
      
    }

    render() {
        let report=JSON.parse(localStorage.getItem('document'))

        return (
            <div>
                <h1>Activities</h1>
                Activity: <input type="text" onChange={this.handleActivity}></input> <br></br><br></br>
               startingTime: <TimePickerComponent placeholder="Select a Time" onChange={this.handleStartTime} /><br /><br />
                End Time:<TimePickerComponent placeholder="Select a Time" onChange={this.handleEndTime} /><br /><br />
                date:  <DatePicker
                    selected={this.state.date}
                    onChange={this.handleDate}
                /> <br></br><br></br>
                <button onClick={this.handleActivities}>submit</button><br></br><br></br>
                 
                {/* <ul>
                    {
                        report[this.state.temp].activities.map((act => {
                        return <li>{act.activity}    {act.date}  { act.duration}</li>
                        }))
                    }
                </ul> */}
             <table>
                    <th>activity</th>
                    <th>duration</th>
                    <th>date</th>
                    {
                        report[this.state.temp].activities.map((activity) => {
                            return (<Report obj={activity}></Report>)
                        }
                        )
                    }
                </table>  



            </div>
        )
    }

}
export default Activities;