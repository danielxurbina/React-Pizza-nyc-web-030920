import React, { Component, Fragment } from 'react';
import Header from './components/Header'
import PizzaForm from './components/PizzaForm'
import PizzaList from './containers/PizzaList'

const ENDPOINT = "http://localhost:3000/pizzas"
const header = {
  "accept": "application/json",
  "Content-Type": 'application/json'
}

class App extends Component {
  state = {
    pizzas: [],
    id: "",
    topping: "",
    size: "",
    vegetarian: null
  }

  componentDidMount(){
    fetch(ENDPOINT)
    .then(response => response.json())
    .then(data => this.setState({pizzas: data}))
  }

  pizzaHandler = (id, topping, size, vegetarian) => {
    this.setState({id: id})
    this.setState({topping: topping})
    this.setState({ size: size})
    this.setState({vegetarian: vegetarian})
  }

  editPizza = (event) => {
    this.setState({editPizza: event.target.value})
  }

  toppingHandler = (value) => {
    this.setState({topping: value})
  }

  sizeHandler = (value) => {
    this.setState({size: value})
  }

  vegetarianHandler = (value) => {
    this.setState({vegetarian: value})
  }

  submitPizza = (id) => {
    fetch(`${ENDPOINT}/${id}`, {
      method: "PATCH",
      headers: header,
      body: JSON.stringify({
        topping: this.state.topping,
        size: this.state.size,
        vegetarian: this.state.vegetarian
      })
    })
    .then(response => response.json())
    .then(updatedPizza => this.setState({pizzas: this.state.pizzas.map(pizza => pizza.id !== id ? pizza : updatedPizza)}))
  }

  render() {
    console.log(this.state)
    return (
      <Fragment>
        <Header/>
        <PizzaForm 
        pizza={this.state.editPizza} 
        topping={this.state.topping} 
        size={this.state.size} 
        vegetarian={this.state.vegetarian}
        toppingHandler={this.toppingHandler}
        sizeHandler={this.sizeHandler}
        vegetarianHandler={this.vegetarianHandler}
        submitPizza={this.submitPizza}
        id={this.state.id}
        />
        <PizzaList 
        pizzas={this.state.pizzas}
        pizzaHandler={this.pizzaHandler}
        />
      </Fragment>
    );
  }
}

export default App;
