import React, { Component } from 'react'
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
  }
  
  render() {
    return (
      <div className="container">
        <header><a href='/'>Gadget Palace</a></header>
        <main>
          <div className='content'>
            <div className='main'>
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
