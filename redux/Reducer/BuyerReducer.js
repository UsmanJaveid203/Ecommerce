import {GET_DATA } from '../Action/BuyerAction';

const initialState = {
    items:[],
    infor:[]
}

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_DATA: return {
            ...state,
            items: action.payload,
            infor: action.infor
        }
        default: return state
    }
}
export default cartReducer;