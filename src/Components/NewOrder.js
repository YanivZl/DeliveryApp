import '../css/NewOrder.css';
import React, {Component} from 'react';


class NewOrder extends  Component{

  constructor(props){
    super(props);

    this.state =  {
      fullName: "",
      address: "",
      phoneNumber: "",
      adress: "",
      city: "",
      additionalPhoneNumber: "",
      floor: "",
      ta: "TA",
      delivery: "",
      apartment: ""
    };
    this.handleNameChange = this.handleNameChange.bind(this)
    this.handleAddressChange = this.handleAddressChange.bind(this)
    this.handlePhoneNumberChange = this.handlePhoneNumberChange.bind(this)
    this.handleCityChange = this.handleCityChange.bind(this)
    this.handleAdditionalPhoneNumberChange = this.handleAdditionalPhoneNumberChange.bind(this)
    this.handleFloorChange = this.handleFloorChange.bind(this)
    this.handleTAChange = this.handleTAChange.bind(this)
    this.handleDeliveryChange = this.handleDeliveryChange.bind(this)
    this.handleApartmentChange = this.handleApartmentChange.bind(this)
  }


  handleNameChange(event) {
    this.state.fullName = event.target.value;
    this.setState(this.state);
  }

  handleAddressChange(event) {
    this.state.address = event.target.value;
    this.setState(this.state);
  }

  handlePhoneNumberChange(event) {
    this.state.phoneNumber = event.target.value;
    this.setState(this.state);
  }

  handleCityChange(event) {
    this.state.city = event.target.value;
    this.setState(this.state);
  }

  handleAdditionalPhoneNumberChange(event) {
    this.state.additionalPhoneNumber = event.target.value;
    this.setState(this.state);
  }

  handleFloorChange(event) {
    this.state.floor = event.target.value;
    this.setState(this.state);
  }

  handleTAChange(event) {
    this.state.ta = "TA";
    this.state.delivery = "";
    this.setState(this.state);
  }

  handleDeliveryChange(event) {
    this.state.ta = "";
    this.state.delivery = "Delivery";
    this.setState(this.state);
  }

  handleApartmentChange(event) {
    this.state.apartment = event.target.value;
    this.setState(this.state);
  }


  render()
    {
      return (<main>
        <form>
        <div className="h5">Customer Details</div>
        <div className="row">
    <div className="col">
    <div className="form-group">
      <label htmlFor="NameInput">Full Name</label>
      <input type="text" className="form-control inp" id="NameInput" aria-describedby="NameHelp" placeholder=""  value={this.state.fullName} onChange={this.handleNameChange}/>
      <small id="NamelHelp" className="form-text text-muted"></small>
    </div>
    </div>
    <div className="col">
    <div className="form-group">
      <label htmlFor="AdressInput">Adress</label>
      <input type="text" className="form-control inp" id="AdressInput" aria-describedby="AdressHelp" placeholder="" value={this.state.address} onChange={this.handleAddressChange} disabled={(this.state.ta)? "TA" : ""}/>
      <small id="AdresslHelp" className="form-text text-muted"></small>
    </div>
    </div>
  </div>
  <div className="row">
<div className="col">
<div className="form-group">
<label htmlFor="PhoneInput">Phone Number</label>
<input type="text" className="form-control inp" id="PhoneInput" aria-describedby="PhoneHelp" placeholder="" value={this.state.phoneNumber} onChange={this.handlePhoneNumberChange}/>
<small id="PhoneHelp" className="form-text text-muted"></small>
</div>
</div>
<div className="col">
<div className="form-group">
<label htmlFor="cityInput">City</label>
<input type="text" className="form-control inp" id="CityInput" aria-describedby="CityHelp" placeholder="" value={this.state.city} onChange={this.handleCityChange} disabled={(this.state.ta)? "TA" : ""}/>
<small id="CityHelp" className="form-text text-muted"></small>
</div>
</div>
</div>
<div className="row">
<div className="col">
<div className="form-group">
<label htmlFor="AdditionalPhoneInput">Additional Phone Number</label>
<input type="text" className="form-control inp" id="AdditionalPhoneInput" aria-describedby="AdditionalPhoneHelp" placeholder="" value={this.state.additionalPhoneNumber} onChange={this.handleAdditionalPhoneNumberChange}/>
<small id="AdditionalPhoneHelp" className="form-text text-muted"></small>
</div>
</div>
<div className="col">
<div className="form-group">
<label htmlFor="FloorInput">Floor</label>
<input type="text" className="form-control" id="FloorInput" aria-describedby="FloorHelp" placeholder="" value={this.state.floor} onChange={this.handleFloorChange} disabled={(this.state.ta)? "TA" : ""}/>
<small id="FloorHelp" className="form-text text-muted"></small>
</div>
</div>
</div>
<div className="row">
<div className="col">
<div className="custom-control custom-radio custom-control-inline">
  <input type="radio" id="TARadio" name="customRadioInline1" className="custom-control-input" value={this.state.ta} onChange={this.handleTAChange} checked={this.state.ta === "TA"}/>
  <label className="custom-control-label" htmlFor="TARadio">TA</label>
</div>
<div class="custom-control custom-radio custom-control-inline">
  <input type="radio" id="DeliveryRadio" name="customRadioInline1" className="custom-control-input" value={this.state.delivery} onChange={this.handleDeliveryChange} checked={this.state.delivery === "Delivery"}/>
  <label className="custom-control-label" htmlFor="DeliveryRadio">Delivery</label>
</div>
</div>
<div className="col">
<div className="form-group">
<label htmlFor="FloorInput">Apartment</label>
<input type="text" className="form-control" id="ApartmentInput" aria-describedby="ApartmentHelp" placeholder="" value={this.state.apartment} onChange={this.handleApartmentChange} disabled={(this.state.ta)? "TA" : ""}/>
<small id="ApartmentHelp" className="form-text text-muted"></small>
</div>
</div>
</div>

        </form>
        <button className="btn btn-primary" id="ContinueButton" onClick={() => this.props.onClick("Continue Ordering", this.state)}>Continue</button>
        </main>
    )}
  }


export default NewOrder;
