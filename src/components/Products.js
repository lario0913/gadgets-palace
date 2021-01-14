import React, { Component } from 'react'
import formatCurrency from '../utils'
import Fade from 'react-reveal/Fade'
import Modal from 'react-modal'
import Zoom from 'react-reveal/Zoom'
import { connect } from 'react-redux'
import { fetchProducts } from '../actions/productActions'
import {addToCart} from '../actions/cartActions'

class Product extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             product: null
        }
    }

    componentDidMount(){
        this.props.fetchProducts()
    }

    openModal = product => {
        this.setState({product})
    }
    closeModal = () => {
        this.setState({product: null})
    }
    

    render() {
        const {product} = this.state
        return (
            <div>
                <Fade bottom cascade>
                    {
                        !this.props.product ?
                        (<div>loading ...</div>) :
                        (
                            <ul className='products'>
                    {this.props.product.map(product => (
                        <li key={product.id}>
                            <div className='product'>
                                <a href={"#" + product.id} onClick={() => this.openModal(product)}>
                                    <img src={product.image} alt={product.title} />
                                    <p>{product.title}</p>
                                </a>
                                <div className="product-price">
                                    <div>{formatCurrency(product.price)}</div>
                                    <button onClick={() => this.props.addToCart(product)} className='button primary'>Add To Cart</button>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
                )
            }
                </Fade>

                {this.state.product && (
                    <Modal isOpen={true} onRequestClose={this.closeModal}>
                        <Zoom>
                            <button className='close-modal' onClick={this.closeModal}>x</button>
                            <div className='product-details'>
                                <img src={product.image} alt={product.title} />
                                <div className='product-details-description'>
                                    <p><strong>{product.title}</strong></p>
                                    <p>{product.description}</p>
                                    <p>
                                        Available Color: {" "}
                                        {product.availableColor.map(color => (
                                            <span> {" "}
                                                <button className='button'>{color}</button>
                                            </span>
                                        ))}
                                    </p>
                                    <div className='product-price product-price-modal'>
                                        <div>{formatCurrency(product.price)}</div>
                                        <button className='button primary' 
                                                onClick={() => {
                                                    this.props.addToCart(product)
                                                    this.closeModal()
                                                }}>
                                            Add To Cart
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </Zoom>
                    </Modal>
                )}

            </div>
        )
    }
}

// state to used, list of actions and the component to connect with
export default connect(state=>({
    product: state.products.filteredItems
}), 
{
    fetchProducts,
    addToCart
}
)
(Product)
