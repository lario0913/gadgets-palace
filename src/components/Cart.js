import React, { Component } from 'react'
import formatCurrency from '../utils';

export default class Cart extends Component {
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
                        <div className='cart-items'>
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
                        </div>
                    </div>
                    {cartItems.length !== 0 && (
                        <div className='cart cart-total'>
                        <div className='total'>
                            <div>
                                Total: {" "}
                                {formatCurrency(
                                    cartItems.reduce((a,c) => a + c.price * c.count, 0)
                                )}
                            </div>
                        </div>
                        <button className="button primary">
                            Proceed
                        </button>
                    </div>
                    )}
                    
                </div>
            </div>
        )
    }
}
