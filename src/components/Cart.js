import React, { Component } from 'react'
import formatCurrency from '../utils';
import Fade from 'react-reveal/Fade'

export default class Cart extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             showCheckout: false,
             name: '',
             address: '',
             email: ''
        }
    }

    handleChange = e => {
        this.setState({[e.target.name]: e.target.value})
    }

    createOrder = e => {
        e.preventDefault()
        const order = {
            name: this.state.name,
            email: this.state.email,
            address: this.state.address,
            cartItems: this.props.cartItems
        }
        this.props.createOrder(order)
    }
    
    render() {
        const {cartItems} = this.props;
        return (
            <div>
                {
                    cartItems.length === 0 ?
                   (<div className='cart cart-header'>Cart is Empty</div>) :
                   (<div className='cart cart-header'>You have {cartItems.length} items in the cart</div>)
                }

                <div>
                    <div className='cart'>
                        <Fade left cascade>
                        <ul className='cart-items'>
                            {
                                cartItems.map(item => (
                                    <li key={item.id}>
                                        <div>
                                            <img src={item.image} alt={item.title} />
                                        </div>
                                        <div>
                                            <div className='cart-items-title'>{item.title}</div>
                                            <div className='right'>
                                                {formatCurrency(item.price)} x {item.count}
                                                <button className='button' onClick={() => this.props.removeFromCart(item)}>Remove</button>
                                            </div>
                                            
                                        </div>
                                    </li>
                                ))
                            }
                        </ul>
                        </Fade>
                    </div>
                    
                    {cartItems.length !== 0 && (
                        <div>
                        <div className='cart cart-total'>
                        <div className='total'>
                            <div>
                                Total: {" "}
                                {formatCurrency(
                                    cartItems.reduce((a,c) => a + c.price * c.count, 0)
                                )}
                            </div>
                        </div>
                        <button onClick={()=>this.setState({showCheckout: true})} className="button primary">
                            Proceed
                        </button>
                    </div>

                    {this.state.showCheckout && (
                    <div className='cart'>
                        <form onSubmit={this.createOrder}>
                            <Fade right>
                            <ul className='form-container'>
                                <li>
                                    <label>Email</label>
                                    <input name='email' type='email' onChange={this.handleChange} required />
                                </li>
                                <li>
                                    <label>Name</label>
                                    <input name='name' type='text' onChange={this.handleChange} required />
                                </li>
                                <li>
                                    <label>Address</label>
                                    <input name='address' type='text' onChange={this.handleChange} required />
                                </li>
                                <li>
                                    <button type='submit' className='button primary'>Checkout</button>
                                </li>
                            </ul>
                            </Fade>
                        </form>
                    </div>
                )}

                    </div>
                    )}
                    
                </div>

            </div>
        )
    }
}
