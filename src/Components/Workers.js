import '../css/Workers.css';
import React, {Component, useState} from 'react';
import AskForPass from './AskForPass.js';
import axios from 'axios';


const NewWorkerWindow = (props) => {

        const [remountCount, setRemountCount] = useState(0);
        const refresh = () => setRemountCount(remountCount + 1);

        const handlefirstNameChange = (e) => {
          props.worker["firstName"] = e.target.value;
          refresh();
        };

        const handleLastNameChange = (e) => {
          props.worker["lastName"] = e.target.value;
          refresh();
        };

        const handleIDChange = (e) => {
          props.worker["id"] = e.target.value;
          refresh();
        };

        const handlePhoneNumberChange = (e) => {
          props.worker["phone"] = e.target.value;
          refresh();
        };

        const handleRoleChange = (e) => {
          props.worker["role"] = e.target.value;
          refresh();
        };

        const handleSalaryChange = (e) => {
          props.worker["salary"] = e.target.value;
          refresh();
        };

        const handlePasswordChange = (e) => {
          props.worker["password"] = e.target.value;
          refresh();
        };

        const handleOkClick = async () => {
          console.log(props.message);
          console.log(props.worker);
          if(props.worker.firstName === ""){
            console.log("firstName error");
            props.message.message = "*New Worker Must Have a First Name"
            refresh();
          }
          else if(props.worker.password === ""){
            console.log("Password error");
            props.message.message = "*New Worker Must Have a Password."
            refresh();
          }
          else{
            await axios.post('http://localhost:5000/workers/new',{
              firstName: props.worker["firstName"],
              lastName: props.worker["lastName"],
              id: props.worker["id"],
              phone: props.worker["phone"],
              role: props.worker["role"],
              salary: props.worker["salary"],
              password: props.worker["password"]
            })
            .then((response) => {
              console.log(response.data);
              if (response.data === "Pass Exception"){
                props.message.message = "*Password in Use. Try Another."
                refresh();
              }
              if(response.data === "OK"){
                props.clickExit();
              }
            });
          }
          }

  return(<div className="new-worker-window">
          <div className="h4">New Worker Details</div>
          <div className="container">
          <div className="row">
            <div className="col"><span className= "h5">First Name:</span></div>
            <div className="col"><input type="text" value={props.worker["firstName"]} onChange={handlefirstNameChange}/></div>
          </div>
          <div className="row">
            <div className="col"><span className= "h5">Last Name:</span></div>
            <div className="col"><input type="text" value={props.worker["lastName"]} onChange={handleLastNameChange}/></div>
          </div>
          <div className="row">
            <div className="col"><span className= "h5">ID:</span></div>
            <div className="col"><input type="text" value={props.worker["id"]} onChange={handleIDChange}/></div>
          </div>
          <div className="row">
            <div className="col"><span className= "h5">Phone Number:</span></div>
            <div className="col"><input type="text" value={props.worker["phone"]} onChange={handlePhoneNumberChange}/></div></div>
          <div className="row"><div className="col"><span className= "h5">Role:</span></div><div className="col"><select name="role" value={props.worker["role"]} onChange={handleRoleChange}>
          <option value="Worker">Worker</option>
          <option value="Courier">Courier</option>
          <option value="Chef">Chef</option>
          <option value="Manager">Manager</option>
          </select></div></div>
          <div className="row"><div className="col"><span className= "h5">Salary:</span></div><div className="col"><input type="text" value={props.worker["salary"]} onChange={handleSalaryChange}/></div></div>
          <div className="row"><div className="col"><span className= "h5">Password:</span></div><div className="col"><input type="text" maxlength="6" value={props.worker["password"]} onChange={handlePasswordChange}/></div></div>
          </div>
          <small className="text-danger font-weight-bold">{props.message.message}</small>
          <div>
          <button className="btn btn-danger btn-lg" onClick={() => props.clickExit()}>Cancel</button>
          <button className="btn btn-success btn-lg" onClick={handleOkClick}>Finish</button>
          </div>
          </div>)
}

const AttendanceWindow = (props) => {

  const [remountCount, setRemountCount] = useState(0);
  const refresh = () => setRemountCount(remountCount + 1);

  console.log(props.worker);
  var hours = props.worker["Active"].split(" ")[1].split(":")[0];
  var minutes = props.worker["Active"].split(" ")[1].split(":")[1];

  const handleMinutesChange = (e) => {
    props.worker["Active"] = props.worker["Active"].split(" ")[0] + " " + props.worker["Active"].split(" ")[1].split(":")[0] + ":" + e.target.value;
    refresh();
  };

  const handleHoursChange = (e) => {
    props.worker["Active"] = props.worker["Active"].split(" ")[0] + " " + e.target.value + ":" +  props.worker["Active"].split(" ")[1].split(":")[1];
    refresh();
  };

  const handleOkClick = async () => {
    await axios({
      method: 'post',
      url:'http://localhost:5000/workers/updateHours',
      data: {
        pass: props.worker["Password"],
        active: props.worker["Active"]
      }
    });
      props.clickOk();
  };

  return(<div className="attendanceWindow"><div className="h5">Update Shift Attendance</div><div>{props.worker["First Name"] + " " + props.worker["Last Name"]}</div><section><div>Entry Time:</div><object><input type="number" min="0" max ="23" maxlength="2" value={hours} onChange={handleHoursChange}/><span>:</span><input type="number" min="0" max="59" value={minutes} onChange={handleMinutesChange}/></object></section><button className="btn btn-success" onClick={handleOkClick}>OK</button></div>)
}

const ActiveWorker = (props) =>{
  let img = ""
  if(props.worker.Role === "Manager"){
    img = "img/manager2.png"
  }
  if(props.worker.Role === "Worker"){
    img = "img/employee.png"
  }
  if(props.worker.Role === "Courier"){
    img = "img/messenger.png"
  }
  if(props.worker.Role === "Chef"){
    img = "img/chef.png"
  }

  let time = props.worker["Active"].split(" ")[1].split(":")[0] + ":" + props.worker["Active"].split(" ")[1].split(":")[1];

  const name = props.worker["First Name"] + " " + props.worker["Last Name"]


  return(<button className="active-worker" onClick={() => props.handleClick(props.worker)}><div className="time-in">{time}</div><div>{name}</div><img src={img}/></button>)
}



class Workers extends  Component{
  constructor(props){
    super(props)

    this.getActiveWorkers();
  }

  state = {workerButtons: [], lastClicked: "", passWindow: null}

  async getActiveWorkers(){
    await axios.get('http://localhost:5000/workers/active')
    .then((response) => {
      this.state.activeWorkers = response.data
      this.state.workerButtons = []
      for(var i in this.state.activeWorkers){
        this.state.workerButtons.push(<ActiveWorker worker={this.state.activeWorkers[i]} handleClick={(pass) => this.handleWorkerButton(pass)}/>)
      }
      this.setState(this.state)
    });
  }

  handleExitButton = () => {
    console.log("lastClicked = Exit");
    this.state.lastClicked = "Exit"
    this.setState(this.state)
  }

  handleEntryButton = () => {
    console.log("Entry Pushed");
    this.state.lastClicked = ""
    this.state.window = <AskForPass type="Worker" onCorrect={() => {this.state.window = null; this.getActiveWorkers(); this.setState(this.state);}}  clickExit={() => {this.state.window = null; this.setState(this.state);}}/>;
    this.setState(this.state)

  }

  handleAttendanceButton = () => {
    this.state.lastClicked = "Attendance"
  }

  handleNewButton = () => {
    this.state.lastClicked = ""
    this.state.window = <NewWorkerWindow message={{message: ""}} worker={{firstName: "", lastName: "", id: "", phone: "", role: "", salary: "", password: ""}} clickExit={() => {this.state.window = null; this.setState(this.state);}}/>
    this.setState(this.state)
  }

  handleUpdateButton = () => {
    this.state.lastClicked = ""
  }

  async handleWorkerButton(worker){
    console.log(worker);
    if(this.state.lastClicked === "Exit"){
      await axios.get('http://localhost:5000/workers/active/exit', {params: {pass: worker["Password"]}})
      .then((response) => {
        this.state.res = response.data
    });
    }

    if(this.state.lastClicked === "Attendance"){
      this.state.window = <AttendanceWindow worker={worker} clickOk={() => {this.state.window = null; this.getActiveWorkers(); this.setState(this.state);}}/>
    }
    this.state.lastClicked = "";
    this.setState(this.state);
    this.getActiveWorkers()

}





  render()
    {
      return (<main>
        <div className="workers-header h4">
        Active Workers
        </div>
        <div className="padding-left">
        {this.state.workerButtons}
         </div>
        <footer className="footer-nav-workers">
        <div className="first-group">
        <button className="workers-button" onClick={() => this.handleEntryButton()}><div>Entry</div><img src="img/log-in.png" alt=""/></button>
        <button className="workers-button" onClick={() => this.handleExitButton()}><div>Exit</div><img src="img/logout.png" alt=""/></button>
        <button className="workers-button" onClick={() => this.handleAttendanceButton()}><div>Attendance</div><img src="img/update.png" alt=""/></button>
        </div>
        <div className="second-group">
        <button className="workers-button" onClick={() => this.handleNewButton()}><div>New</div><img src="img/plus.png" alt=""/></button>
        <button className="workers-button"><div>Update</div><img src="img/exchange.png" alt=""/></button>
        </div>
        </footer>
        {this.state.window}
         </main>
     );
    }
  }

export default Workers;
