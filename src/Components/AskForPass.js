import React, {Component} from 'react';
import './../css/App.css';
import axios from 'axios';


class AskForPass extends Component{
  constructor(props){
    super(props);

    this.state = {pass: "", res: ""};

    this.handleButtonPush = this.handleButtonPush.bind(this)

    if(props.type === "Manager"){
      this.state.message = "Manager Password Required"
    }
    else{
      this.state.message = "Insert Worker Password"
    }
  }

  async CheckIfPassExists(pass){
    if(this.props.type === "Manager"){
      await axios.get('http://localhost:5000/workers/managers', {params: {pass}})
      .then((response) => {
        this.state.res = response.data
        this.setState(this.state)
    });
  }
    if(this.props.type === "Worker"){
      await axios.get('http://localhost:5000/workers/active/entry', {params: {pass}})
      .then((response) => {
        this.state.res = response.data
    });
  }
}

  async handleButtonPush(e){
    this.state.pass += e.target.value;
    if(this.state.pass.length === 6)
    {
      await this.CheckIfPassExists(this.state.pass);
      if (this.state.res != "")
      {
        console.log("Password Correct");
        this.props.onCorrect();
      }
      else{
        console.log("Incorrect");
        this.state.pass = "";
      }
    }
    this.setState(this.state);
  }

  handleInput = (e) => {
    this.state.pass = e.target.value;
    if(this.state.pass.length === 6)
    {
      this.CheckIfPassExists(this.state.pass);
    }
    this.setState(this.state);
  }

render(){
  return(
  <div className="pass-div">
  <div className="h3 mt-20px pass-div-header">{this.state.message}</div>
  <input className="mt-20px pass-div-input" type="password" id="pwd" name="pwd" value={this.state.pass} onChange={this.handleInput}/>
  <div className="div-buttons">
  <button className="pass-div-button" value="1" onClick={this.handleButtonPush}>1</button>
  <button className="pass-div-button" value="2" onClick={this.handleButtonPush}>2</button>
  <button className="pass-div-button" value="3" onClick={this.handleButtonPush}>3</button>
  <button className="pass-div-button" value="4" onClick={this.handleButtonPush}>4</button>
  <button className="pass-div-button" value="5" onClick={this.handleButtonPush}>5</button>
  <button className="pass-div-button" value="6" onClick={this.handleButtonPush}>6</button>
  <button className="pass-div-button" value="7" onClick={this.handleButtonPush}>7</button>
  <button className="pass-div-button" value="8" onClick={this.handleButtonPush}>8</button>
  <button className="pass-div-button" value="9" onClick={this.handleButtonPush}>9</button>
  <button className="pass-div-button" value="*" onClick={this.handleButtonPush}>*</button>
  <button className="pass-div-button" value="0" onClick={this.handleButtonPush}>0</button>
  <button className="pass-div-button" value="#" onClick={() => this.props.clickExit()}><i class="fas fa-times"></i></button>
  </div>

  </div>);
}
}

export default AskForPass;
