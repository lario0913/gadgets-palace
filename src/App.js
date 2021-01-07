import React, { Component } from 'react'
import Cart from './components/Cart'
import Filter from './components/Filter'
import Products from './components/Products'
import data from './data.json'

class App extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       products: data.products,
       cartItems: localStorage.getItem("cartItems") ?
                  JSON.parse(localStorage.getItem("cartItems")) :
                  [],
       color: "",
       sort: ""
    }
    this.sortProducts = this.sortProducts.bind(this);
  }

  removeFromCart = product => {
    // create an instance of the cartItems to work with
    const cartItems = this.state.cartItems.slice()
    this.setState({
      cartItems: cartItems.filter(item => item.id !== product.id)
    })
    localStorage.setItem("cartItems", JSON.stringify(cartItems.filter(item => item.id !== product.id)))
  }

  addToCart = product => {
    const cartItems = this.state.cartItems.slice()
    let alreadyInCart = false
    cartItems.forEach(item => {
      // if product is already in cart
      if(item.id === product.id){
        item.count++
        alreadyInCart = true
      }
    })
    // if product is not in the cart, so i push
    if(!alreadyInCart){
      cartItems.push({...product, count: 1})
    }
    this.setState({cartItems})
    localStorage.setItem("cartItems", JSON.stringify(cartItems))
  }

  filterProducts = (event) => {
    console.log(event.target.value)
    if(event.target.value === ""){
      this.setState({
        color: event.target.value,
        products: data.products
      })
    }else{
      this.setState({
        color: event.target.value,
        products: data.products.filter(
          product => product.availableColor.indexOf(event.target.value) >= 0
        )
      })
    }
  }


  sortProducts = (event) => {
    const sort = event.target.value
    this.setState(state => ({
      sort: event.target.value,
      products : this.state.products.slice().sort((a,b) =>(
            sort === 'lowest' ?
            ((a.price > b.price) ? 1 : -1) : 

            sort === 'highest' ?
            ((a.price < b.price) ? 1 : -1) :

            ((a.id < b.id) ? 1 : -1) 
          ))
    }))
  }
  
  render() {
    return (
      <div className="container">
        <header><a href='/'>Gadget Palace</a></header>
        <main>
          <div className='content'>
            <div className='main'>
            <Filter 
              count={this.state.products.length}
              color={this.state.color}
              sort={this.state.sort}
              filterProducts={this.filterProducts}
              sortProducts={this.sortProducts}
            />

            <Products 
              products={this.state.products}
              addToCart={this.addToCart}
              />
            </div>
            <div className='sidebar'>
                <Cart cartItems={this.state.cartItems}
                      removeFromCart={this.removeFromCart}
                />
            </div>
          </div>
        </main>
        <footer>All rights has been reserved</footer>
      </div>
    )
  }
}

export default App
