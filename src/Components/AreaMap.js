import '../css/AreaMap.css';
import React, {Component} from 'react';
import GoogleMapReact from 'google-map-react';
import MapContainer from './GoogleMap.js'
import {Geocoder} from 'google-map-react';



class AreaMap extends Component{
constructor(props){
  super(props)

  this.handleAddressInput = this.handleAddressInput.bind(this)
}
state = { input: "",
          mapContainer: <MapContainer />
}

handleAddressInput(e){
  this.state.input = e.target.value;
  this.setState(this.state);
}

handleButton = () => {
  this.state.mapContainer = <MapContainer input={this.state.input}/>;
  this.setState(this.state);
}
  render()
    {
      return (
        <div id="map-window">
        <div id="input" className="input-group">
          <input type="text" class="form-control" placeholder="Address" aria-label="Address" value={this.state.input} onChange={this.handleAddressInput}/>
            <div className="input-group-append">
              <button className="btn btn-outline-secondary" type="button" onClick={this.handleButton}><i class="fas fa-search"></i></button>
            </div>
        </div>
        {this.state.mapContainer}
         </div>);
    }
  }

export default AreaMap;
