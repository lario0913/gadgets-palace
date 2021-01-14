import React, { Component } from 'react'
import { connect } from 'react-redux'
import { filterProducts, sortProducts } from '../actions/productActions'

class Filter extends Component {
    render() {
        const {color, sort, products, filteredProducts, filterProducts, sortProducts} = this.props

        return !filteredProducts ? 
                (<div>Loading ...</div>) :        
                (
                    <div className='filter'>
                        <div className="filter-result">{filteredProducts.length} Products</div>
                        <div className="filter-sort">
                            Order {"  "}
                            <select value={sort} 
                                    onChange={e=> sortProducts(filteredProducts, e.target.value)}
                            >
                                <option value="latest">Latest</option>
                                <option value="lowest">Lowest</option>
                                <option value="highest">Highest</option>
                            </select>
                        </div>
                        <div className='filter-size'>
                            Filter {"  "}
                            <select value={color} 
                            onChange={e=> filterProducts(products, e.target.value)}>
                                <option value="">ALL</option>
                                <option value="WHITE">WHITE</option>
                                <option value="GOLD">GOLD</option>
                                <option value="RED">RED</option>
                            </select>
                        </div>
                    </div>
                )
    }
}

// mapStateToProps, mapActionsToProps
export default connect(state =>({
    color: state.products.color,
    sort: state.products.sort,
    products: state.products.items,
    filteredProducts: state.products.filteredItems
}), 
{
    filterProducts,
    sortProducts

})
(Filter)