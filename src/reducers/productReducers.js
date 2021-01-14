import { FETCH_PRODUCTS, FILTER_PRODUCTS_BY_COLOR, ORDER_PRODUCTS_BY_PRICE } from "../types";

export const productReducer = (state={}, action) => {
    switch (action.type) {
        case FILTER_PRODUCTS_BY_COLOR:
            return{
                ...state,
                color: action.payload.color,
                filteredItems: action.payload.items
            }
        case ORDER_PRODUCTS_BY_PRICE:
            return{
                ...state,
                sort: action.payload.sort,
                filteredItems: action.payload.items
            }
        
        case FETCH_PRODUCTS:
            return{
                items: action.payload,
                filteredItems: action.payload
            }
                
        default:
            return state
    }
}
