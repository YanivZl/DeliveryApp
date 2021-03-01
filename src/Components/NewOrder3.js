import '../css/NewOrder3.css';
import React, {Component} from 'react';
import axios from 'axios';

const ListItem = (props) => {
  return (
    <tr>
      <th scope="row">{props.id}</th>
      <td>{props.name}</td>
      <td>{props.class}</td>
      <td>{props.amount}</td>
      <td>{props.price}</td>
    </tr>
  )
}


const postOrder = (props) => {

  let method, address, payment;
  console.log(props);
  if (props.info.ta === "TA")
  {
    method = "TA";
    address = "";
  }
  else{
    method = "Delievry";
    address = [props.info.address, props.info.city, props.info.floor, props.info.apartment];
  }

  if(props.cash == "Cash"){
    payment = "Cash";
  }

  else{
    payment = [props.creditNumber, props.creditDate, props.cvv, props.id];
  }

  axios({
    method: 'post',
    url:'http://localhost:5000/orders',
    data: {
      method: method,
      fullName: props.info.fullName,
      phoneNumber: props.info.phoneNumber,
      additionalPhoneNumber: props.info.additionalPhoneNumber,
      address: address,
      payment: payment,
      total: props.totalPrice,
      prod_list: props.order,
    }
  });

}

const FinishMessage = (props) => {

  return (<div className="finish-background">
  <div className="finish-message">
  <div className="h2 margin-0auto mt-30px w-71">Order Complete!</div>
  <button type="button" name="button" className="btn btn-success btn-lg margin-0auto d-block mt-50px"onClick={() => props.click.onClick()}> Continue </button>
  </div>
  </div>)
}

class FinishOrdering extends  Component{

  constructor(props){
    super(props);
    this.state =  {
      counter_for_prod_list: 1,
      prod_list: [],
      totalPrice: 0,
      cash: "Cash",
      credit: "",
      creditNumber: "",
      creditDate: "",
      cvv: "",
      id: "",
      order: props.info.products,
      info: props.info.info,
      finishMessage: null
    };

    this.handleCashChange = this.handleCashChange.bind(this)
    this.handleCreditChange = this.handleCreditChange.bind(this)
    this.handleCreditNumberChange = this.handleCreditNumberChange.bind(this)
    this.handleCreditDateChange = this.handleCreditDateChange.bind(this)
    this.handleCreditCVVChange = this.handleCreditCVVChange.bind(this)
    this.handleIDNumberChange = this.handleIDNumberChange.bind(this)

  }

  clickOnPay = () => {
    postOrder(this.state)
    this.state.finishMessage = <FinishMessage click={this.props}/>;

    this.setState(this.state);
  }

  printProductList = () => {
    this.state.counter_for_prod_list = 1;
    this.state.totalPrice = 0;
    console.log(this.props.info.products);
    let list = [];
    for(var i in this.props.info.products)
    {
      list.push(<ListItem id={this.state.counter_for_prod_list} name={this.props.info.products[i].Name} class={this.props.info.products[i].Class} amount={1} price={this.props.info.products[i].Price}/>);
      this.state.counter_for_prod_list += 1;
      this.state.totalPrice += this.props.info.products[i].Price;
    }
    return list;
  }

  handleCashChange(event) {
    this.state.cash = "Cash";
    this.state.credit = "";
    this.setState(this.state);
  }

  handleCreditChange(event) {
    this.state.cash = "";
    this.state.credit = "Credit Card";
    this.setState(this.state);
  }

  handleCreditNumberChange(event) {
    this.state.creditNumber = event.target.value;
    this.setState(this.state);
  }

  handleCreditDateChange(event) {
    this.state.creditDate = event.target.value;
    this.setState(this.state);
  }

  handleCreditCVVChange(event) {
    this.state.cvv = event.target.value;
    this.setState(this.state);
  }

  handleIDNumberChange(event) {
    this.state.id = event.target.value;
    this.setState(this.state);
  }



    render() {
      return(<main>
        <div className="row">
        <div className="col pad-0 ml-15px right-border">
        <div className="h5 h-gray">Payment Details</div>
        <form className="payment">
        <div className="margin-0auto">
        <div className="custom-control custom-radio custom-control-inline mt-20px">
          <input type="radio" id="CashRadio" name="customRadioInline1" className="custom-control-input" value={this.state.cash} onChange={this.handleCashChange} checked={this.state.cash === "Cash"}/>
          <label className="custom-control-label" htmlFor="CashRadio">Cash</label>
        </div>
        <div class="custom-control custom-radio custom-control-inline mt-20px">
          <input type="radio" id="CreditRadio" name="customRadioInline1" className="custom-control-input" value={this.state.credit} onChange={this.handleCreditChange} checked={this.state.credit === "Credit Card"}/>
          <label className="custom-control-label" htmlFor="CreditRadio">Credit Card</label>
          </div>
          <div className="form-group mt-20px ml-75px">
            <label htmlFor="CerditNumberInput">Card Number : </label>
            <input type="text" className="form-control inp" id="NameInput" aria-describedby="CreditNumberHelp" placeholder=""  value={this.state.creditNumber} onChange={this.handleCreditNumberChange} disabled={(this.state.cash)? "Cash" : ""}/>
            <small id="CreditNumberlHelp" className="form-text text-muted"></small>
          </div>
          <div className="form-group mt-20px ml-75px">
            <label htmlFor="DateInput">Date : </label>
            <input type="text" className="form-control inp" id="DateInput" aria-describedby="DateHelp" placeholder=""  value={this.state.creditDate} onChange={this.handleCreditDateChange} disabled={(this.state.cash)? "Cash" : ""}/>
            <small id="DatelHelp" className="form-text text-muted"></small>
          </div>
          <div className="form-group mt-20px ml-75px">
            <label htmlFor="CVVInput">CVV : </label>
            <input type="text" className="form-control inp" id="CVVInput" aria-describedby="CVVHelp" placeholder=""  value={this.state.cvv} onChange={this.handleCreditCVVChange} disabled={(this.state.cash)? "Cash" : ""}/>
            <small id="CVVlHelp" className="form-text text-muted"></small>
          </div>
          <div className="form-group mt-20px ml-75px">
            <label htmlFor="IDNumberInput">ID Number : </label>
            <input type="text" className="form-control inp" id="IDNumberInput" aria-describedby="IDNumberHelp" placeholder=""  value={this.state.id} onChange={this.handleIDNumberChange} disabled={(this.state.cash)? "Cash" : ""}/>
            <small id="IDNumberlHelp" className="form-text text-muted"></small>
          </div>
        </div>
        </form>
        </div>
        <div className="col pad-0">
        <div className="order-list h-483px">
        <div className="h5">Order List</div>
        <table class="table table-sm">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Product</th>
          <th scope="col">Class</th>
          <th scope="col">Amount</th>
          <th scope="col">Price</th>
        </tr>
      </thead>
      <tbody>
      {this.printProductList()}
      </tbody>
    </table>
        </div>
        </div>
        </div>
        <div className="mt-30px margin-0auto w-35">
        <span className="h1">Total : </span>
        <span className="h1">{this.state.totalPrice} &#8362;</span>
        <button type="button" name="button" className="btn btn-success btn-lg ml-50px mt--13px" onClick={() => this.clickOnPay()}> Pay </button>
        </div>
        {this.state.finishMessage}
        </main>)
    }
}

export default FinishOrdering;
