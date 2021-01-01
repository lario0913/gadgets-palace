import React, { Component } from 'react'
import Filter from './components/Filter'
import Products from './components/Products'
import data from './data.json'

class App extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       products: data.products,
       color: "",
       sort: ""
    }
    this.sortProducts = this.sortProducts.bind(this);
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

            <Products products={this.state.products}/>
            </div>
            <div>Sidebar</div>
          </div>
        </main>
        <footer>All rights has been reserved</footer>
      </div>
    )
  }
}

export default App
