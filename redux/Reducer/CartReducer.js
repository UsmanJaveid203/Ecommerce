import { SENDING_DATA, GET_DATA, UPDATE_DATA, REMOVE_DATA , DELETE_DATA } from '../Action/CartAction';

const initialState = { 
    orderItems: 0,
    totalPrice: 0,
    items:[]
}

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case SENDING_DATA: return {
            ...state,
            orderItems: action.length,
            totalPrice : action.price,
            items: action.payload
        }
        case GET_DATA: return {
            ...state,
            orderItems: action.length,
            totalPrice : action.price,
            items: action.payload
        }
        case UPDATE_DATA: return {
            ...state,
            orderItems: action.length,
            totalPrice : action.price,
            items: action.payload
        }
        case REMOVE_DATA: return {
            ...state,
            orderItems: action.length,
            totalPrice : action.price,
            items: action.payload
        }
        case DELETE_DATA: return {
            ...state,
            orderItems: action.length,
            totalPrice : action.price,
            items: action.payload
        }
        default: return state
    }

}
export default cartReducer;