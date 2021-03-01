import React, {Component} from 'react';
import './css/App.css';
import NewOrder from './Components/NewOrder.js'
import Orders from './Components/Orders.js'
import AreaMap from './Components/AreaMap.js'
import Manager from './Components/Manager.js'
import Workers from './Components/Workers.js'
import Stock from './Components/Stock.js'
import Customers from './Components/Customers.js'
import Statistics from './Components/Statistics.js'
import ContinueOrdering from './Components/NewOrder2.js'
import FinishOrdering from './Components/NewOrder3.js'
import AskForPass from './Components/AskForPass.js'


class App extends Component{

  state = {displayedWindow: "null",
  components: {
    "New Order": <NewOrder onClick={(name, info) => this.handleOrder(name, info)}/>,
    "Orders": <Orders />,
    "Area Map": <AreaMap />,
    "Manager": <Manager />,
    "Workers": <Workers />,
    "Stock": <Stock />,
    "Customers": <Customers />,
    "Statistics": <Statistics />,
    "Manager Password" : <AskForPass />
  }
  }

  handleManagerPassword = (componentName) => {
    let temp = this.state.displayedWindow;
    this.state.components["Manager Password"] = <AskForPass type="Manager" onCorrect={() => this.showComponent(componentName)} clickExit={() => this.showComponent(temp)}/>
    this.showComponent("Manager Password");
  }

  handleOrder = (name, info) => {
    if (name === "Continue Ordering"){
      this.state.components[name] =  <ContinueOrdering info={info} onClick ={(name, info) => this.handleOrder(name, info)}/>;
      this.showComponent(name);
    }
    if (name === "Finish Ordering"){
      this.state.components[name] =  <FinishOrdering info={info} onClick={() => this.showComponent("Orders")}/>;
      this.showComponent(name);
    }

  };

  showComponent = (componentName) => {
  this.setState({displayedWindow: componentName});
};



  render() {
      return (
        <div className='App'>
            <menu className="top-menu">
            <img className="logo-img" src="img/Logo.png" alt=""/>
            <button id="order-now" type="button" name="button" onClick={() => {this.showComponent("New Order")}}>
              <div>
                New Order
              </div>
                <img src="img/new.png" alt=""/>
            </button>
            <button id="orders" type="button" name="button" onClick={() => {this.showComponent("Orders")}}>
              <div>
              Orders
            </div>
            <img src="img/shopping-list.png" alt=""/>
            </button>
            <button id="area-map" type="button" name="button" onClick={() => {this.showComponent("Area Map")}}>
              <div className="">
                Area Map
              </div>
              <img src="img/isobars.png" alt=""/>
            </button>
            </menu>
            <menu className="left-menu">
            <button id="manager" type="button" name="button" onClick={() => {this.handleManagerPassword("Manager")}}>
              <div>
              Manager
            </div>
              <img src="img/man.png" alt=""/>
            </button>
            <button id="workers" type="button" name="button" onClick={() => {this.handleManagerPassword("Workers")}}>
              <div className="">
                Workers
              </div>
              <img src="img/human.png" alt=""/>
            </button>
            <button id="stock" type="button" name="button" onClick={() => {this.handleManagerPassword("Stock")}}>
              <div className="">
                Stock
              </div>
              <img src="img/stock.png" alt=""/>
            </button>
            <button id="customers" type="button" name="button" onClick={() => {this.showComponent("Customers")}}>
              <div className="">
                Customers
              </div>
              <img src="img/customer.png" alt=""/>
            </button>
            <button id="statistics" type="button" name="button" onClick={() => {this.showComponent("Statistics")}}>
              <div className="">
                Statistics
              </div>
              <img src="img/statistics.png" alt=""/>
            </button>
            <button id="exit" type="button" name="button">
              <div className="">
                Exit
              </div>
              <img src="img/exit.png" alt=""/>
            </button>
            </menu>
              {this.state.components[this.state.displayedWindow]}
            </div>

      );
    }
}

export default App;
