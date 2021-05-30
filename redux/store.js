import {createStore, applyMiddleware ,combineReducers} from 'redux';

import CartReducer from './Reducer/CartReducer';
import BuyerReducer from './Reducer/BuyerReducer';

const thunkMiddleware = require('redux-thunk').default;

const mainReducer = combineReducers({
    cart: CartReducer,
    buyer : BuyerReducer
});

const store = createStore(mainReducer,applyMiddleware(thunkMiddleware));

export default store;