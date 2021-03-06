import React, { Component } from 'react'
import { Provider } from 'react-redux'
import Cart from './components/Cart'
import Filter from './components/Filter'
import Products from './components/Products'
// import data from './data.json'
import store from './store'


class App extends Component {

  createOrder = order => {
    alert("coming back")
  } 

  // removeFromCart = product => {
  //   // create an instance of the cartItems to work with
  //   const cartItems = this.state.cartItems.slice()
  //   this.setState({
  //     cartItems: cartItems.filter(item => item.id !== product.id)
  //   })
  //   localStorage.setItem("cartItems", JSON.stringify(cartItems.filter(item => item.id !== product.id)))
  // }

  // addToCart = product => {
  //   const cartItems = this.state.cartItems.slice()
  //   let alreadyInCart = false
  //   cartItems.forEach(item => {
  //     // if product is already in cart
  //     if(item.id === product.id){
  //       item.count++
  //       alreadyInCart = true
  //     }
  //   })
  //   // if product is not in the cart, so i push
  //   if(!alreadyInCart){
  //     cartItems.push({...product, count: 1})
  //   }
  //   this.setState({cartItems})
  //   localStorage.setItem("cartItems", JSON.stringify(cartItems))
  // }

  // filterProducts = (event) => {
  //   console.log(event.target.value)
  //   if(event.target.value === ""){
  //     this.setState({
  //       color: event.target.value,
  //       products: data.products
  //     })
  //   }else{
  //     this.setState({
  //       color: event.target.value,
  //       products: data.products.filter(
  //         product => product.availableColor.indexOf(event.target.value) >= 0
  //       )
  //     })
  //   }
  // }


  // sortProducts = (event) => {
  //   const sort = event.target.value
  //   this.setState(state => ({
  //     sort: event.target.value,
  //     products : this.state.products.slice().sort((a,b) =>(
  //           sort === 'lowest' ?
  //           ((a.price > b.price) ? 1 : -1) : 

  //           sort === 'highest' ?
  //           ((a.price < b.price) ? 1 : -1) :

  //           ((a.id < b.id) ? 1 : -1) 
  //         ))
  //   }))
  // }
  
  render() {
    return (
      <Provider store={store}>
        <div className="container">
        <header><a href='/'>Gadget Palace</a></header>
        <main>
          <div className='content'>
            <div className='main'>

            <Filter/>

            <Products />
            </div>
            <div className='sidebar'>
                <Cart createOrder={this.createOrder} />
            </div>
          </div>
        </main>
        <footer>All rights has been reserved</footer>
      </div>
      </Provider>
    )
  }
}

export default App
