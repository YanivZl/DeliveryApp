import '../css/NewOrder2.css';
import React, {Component} from 'react';
import axios from 'axios';
import $ from 'jquery';


// const Button = (props) => {
//   return (<button type="button" name="button" onClick={() => this.getSubClass(props.name)}>
//     <div>
//       {props.name}
//     </div>
//       <img src={props.pic} alt=""/>
//   </button>)
// }
//

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

const Total = (props) => {
  return (
    <span className="text-success font-weight-bold mt-8px right-align-30px">{props.total}</span>
  )
}

class ContinueOrdering extends Component{
  constructor(props)
  {
    super(props);
    console.log(props.info);

    this.state = {
      counter_for_order_list: 1,
      products: {} ,
      sub_list: [],
      products_list: [],
      order_list: [],
      totalPrice: 0,
      selectedRow: 0,
      toPass: {
        info: props.info,
        products: []
      }
    }
    axios.get('http://localhost:5000/products')
    .then((response) => {
      this.state.products = response.data
      this.setState(this.state)
    });
  }

  componentDidUpdate() {
    $(document).ready(() => {$("tr").click( () => {
      console.log("clicked");
      this.state.selectedRow = $(this);
      $(this).toggleClass("table-primary");
      $(this).hide();
    })})
  }



  chooseProduct = (p) => {
    this.state.order_list.push(<ListItem id={this.state.counter_for_order_list} name={this.state.products[p].Name} class={this.state.products[p].Class} amount={1} price={this.state.products[p].Price}/>
      )
    this.state.totalPrice += this.state.products[p].Price;
    this.state.toPass.products.push(this.state.products[p]);
    this.state.counter_for_order_list += 1;
    this.setState(this.state);

  }

  getProducts = (sc) => {
    let products = this.state.products;
    let prods = []
    let prods_pics = []
    let prods_id = []
    this.state.products_list = []
    for(var key in products){
      if(!prods.includes(products[key].Name) && products[key].Sub_Class === sc){
        prods.push(products[key].Name)
        prods_pics.push(products[key].pic)
        prods_id.push(key)
      }
    }
    for (let i = 0; i < prods.length; i++)
    {
      this.state.products_list.push(<button type="button" name="button" onClick={() => {this.chooseProduct(prods_id[i])}}>
        <div>
          {prods[i]}
        </div>
          <img src={prods_pics[i]} alt=""/>
      </button>)
    }
    this.setState(this.state);


  }

  getSubClass = (c) => {
    let products = this.state.products;
    let sub_classes = []
    let sub_pics = []
    this.state.sub_list = []
    for(var key in products){
      if(!sub_classes.includes(products[key].Sub_Class) && products[key].Class === c){
        sub_classes.push(products[key].Sub_Class)
        sub_pics.push(products[key].pic)
      }
    }
      for (let i = 0; i < sub_classes.length; i++)
      {
        this.state.sub_list.push(<button type="button" name="button" onClick={() => {this.getProducts(sub_classes[i])}}>
          <div>
            {sub_classes[i]}
          </div>
            <img src={sub_pics[i]} alt=""/>
        </button>)
      }
      this.setState(this.state);

    }

  getClasses = () => {

      let list = [];
      let products = this.state.products;
      let classes = []
      let pics = []
      for(var key in products){
        if(!classes.includes(products[key].Class)){
          classes.push(products[key].Class)
          pics.push(products[key].pic)
        }
      }
      for (let i = 0; i < classes.length; i++)
      {
        list.push(<button type="button" name="button" onClick={() => {this.getSubClass(classes[i])}}>
          <div>
            {classes[i]}
          </div>
            <img src={pics[i]} alt=""/>
        </button>)
      }
      return (<section>{list}</section>)
  }




render(){
  return (<main>
    <div className="row">
    <div className="col pad-0 ml-15px">
    <section className="classes">
    <div className="h5">Classes</div>
    {this.getClasses()}
    </section>
    <section className="classes">
    <div className="h5">Sub-Classes</div>
    <section>{this.state.sub_list}</section>
    </section>
    <section className="products">
    <div className="h5">Products</div>
    <section>{this.state.products_list}</section>
    </section>
    </div>
    <div className="col pad-0">
    <div className="order-list">
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
  {this.state.order_list}
  </tbody>
</table>
    </div>
    <div className="h-40px">
    <span className="font-weight-bold mt-8px right-align-90px">Total : </span><Total total={this.state.totalPrice}/>
    </div>
    <button type="button" name="button" className="btn btn-secondary btn-lg">Delete</button>
    <button type="button" name="button" className="btn btn-warning btn-lg">Note</button>
    <button type="button" name="button" className="btn btn-light btn-lg" id="PriceButton">Change Price</button>
    <button type="button" name="button" className="btn btn-light btn-lg">Subtract</button>
    <button type="button" name="button" className="btn btn-light btn-lg">Add</button>
    <button type="button" name="button" className="btn btn-success btn-lg btn-block" onClick={() => this.props.onClick("Finish Ordering", this.state.toPass)}>Continue</button>
    </div>
    </div>
    </main>)
}
}

export default ContinueOrdering;
