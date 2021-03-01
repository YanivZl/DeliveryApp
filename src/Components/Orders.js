import '../css/orders.css';
import React, {Component} from 'react';
import axios from 'axios';

const ListItem = (props) => {

  let address_ta = "";
  if (props.order.method === "TA"){
    address_ta = "TA";
  }
  else{
    address_ta += props.order.address[0] + ", ";
    address_ta += props.order.address[1];
  }
  return (<tr>
    <th scope="row" onClick={() => props.click(props.order)}>{props.order.id}</th>
    <td onClick={() => props.click(props.order, )}>{address_ta}</td>
    <td onClick={() => props.click(props.order)}>{props.order.fullName}</td>
    <td onClick={() => props.click(props.order)}>{props.order.Date}</td>
    <td onClick={() => props.click(props.order)}>{(props.order.Time).split('.')[0]}</td>
    <td onClick={() => props.click(props.order)}>{props.order.total} &#8362;</td>
    <td onClick={() => props.click(props.order)}>{props.order.Courier}</td>
    <td onClick={() => props.click(props.order)}>{props.order.Status}</td>
  </tr>)
}

const Courier = (props) => {
  var status = props.courier["Status"]
  status = status.substr(status.indexOf("'") + 1, status.length)
  status = status.substr(0, status.indexOf("'"))

  return (<tr><th scope="row">{props.num}</th>
  <td>{props.courier["First Name"] + " " + props.courier["Last Name"]}</td>
  <td>{status}</td></tr>)
}

class Orders extends  Component{

  constructor(props){
    super(props)

  this.state = {
    couriers: 0,
    order_list: [],
    courier_list: [],
    last_order_clicked: 0,

  }



  axios.get('http://localhost:5000/workers/couriers/online')
  .then((response) => {
    console.log(response.data);
    this.state.couriers = response.data
    this.setState(this.state)
  });

  this.getTodayOrders();
  this.getCouriers = this.getCouriers.bind(this);
  }


  async getTodayOrders(){
    let orders = 0
    await axios.get('http://localhost:5000/orders')
    .then((response) => {
      orders = response.data
    });
  this.state.order_list = []
  for(var i in orders){
    this.state.order_list.push(<ListItem order={orders[i]} click={ (order) => this.handleOrderClick(order)} />)
  }
  console.log(this.state.order_list);
  this.setState(this.state)
  }

  getCouriers = () => {
    let list = [];
    var counter = 1;
    for(var i in this.state.couriers){
      list.push(<Courier num={counter} courier={this.state.couriers[i]} />)
      counter++
    }
    return list;
  }

  handleOrderClick = (order) => {
    console.log(order);
    this.state.last_order_clicked = order;
    this.setState(this.state)
  }

  async handleReadyPush() {
    if (this.state.last_order_clicked != 0){
      await axios.post('http://localhost:5000/orders/setready', this.state.last_order_clicked)
      this.getTodayOrders()
    }
  }

  render()
    {
    return (
        <div className="Orders">
          <section>
            <span className="h5">Filter : </span>
            <div>
              <div className="input-group">
                <div className="input-group-prepend">
                  <label className="input-group-text" for="inputGroupSelect01">ID</label>
                </div>
                <input type="text" class="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default"/>
              </div>
              <div className="input-group">
                <div className="input-group-prepend">
                  <label className="input-group-text" for="inputGroupSelect01">Date</label>
                </div>
                <input type="date" class="form-control"/>
              </div>
              <div className="input-group">
                <div className="input-group-prepend">
                  <label className="input-group-text" for="inputGroupSelect01">City</label>
                </div>
                <select className="custom-select" id="inputGroupSelect01">
                  <option selected></option>
                  <option value="1">Tel Aviv-Yafo</option>
                  <option value="2">Ramat Gan</option>
                  <option value="3">Givataim</option>
                </select>
              </div>

              <button type="button" name="button" className="btn btn-info">Filter</button>

            </div>
          </section>
          <div id="table-wrapper-orders">
            <div id="table-scroll">
          <table className="table table-bordered overflow-auto table-hover">
            <thead>
             <tr className="table-info">
               <th scope="col">#</th>
               <th scope="col">Adress/TA</th>
               <th scope="col">Customer</th>
               <th scope="col">Date</th>
               <th scope="col">Time</th>
               <th scope="col">Price</th>
               <th scope="col">Courier</th>
               <th scope="col">Status</th>
             </tr>
           </thead>
           <tbody>
             {this.state.order_list}
           </tbody>
          </table>
        </div>

      </div>
      <div id="table-wrapper-couriers">
        <div id="table-scroll">
      <table className="table table-bordered overflow-auto">
        <thead>
         <tr className="table-danger">
           <th scope="col">#</th>
           <th scope="col">Name</th>
           <th scope="col">Status</th>
         </tr>
       </thead>
       <tbody>
         {this.getCouriers()}
       </tbody>
      </table>
    </div>

  </div>
  <div>
          <button className="h4 bg-success" type="button" name="button" onClick={() => this.handleReadyPush()}>Mark Ready</button>
          <button className="h4 bg-warning" type="button" name="button">Show Order</button>
  </div>
    </div>
    );
}
}

export default Orders;
