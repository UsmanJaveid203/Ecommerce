import StripeCheckout from 'react-stripe-checkout';
import { DeleteCartData } from '../../../redux/Action/CartAction';
import { useDispatch } from 'react-redux';
import CartStyle from '../../../public/styles/Cart.module.css';
import { Toast, ToastBody } from 'reactstrap';
import {useState} from 'react';

export default function index(props) {
    const dispatch = new useDispatch();
    const [message , setMessage] = new useState("");

    const makePayment = (token) => {
        const body = {
            token,
            price:props.price
        }
        const headers = {
            "Content-Type": "application/json"
        }

        return fetch('http://localhost:3000/api/cart/payment', {
            method: 'POST',
            headers,
            body: JSON.stringify(body)
        })
            .then(res => {
                dispatch(DeleteCartData(props.user_id));
            })
            .catch(err => {
                console.log(err);
            })
    }

    const SendMessage = () =>{
        setMessage("You didn't buys any product first buy product");
        setTimeout(()=>{
            setMessage("");
        },2000)
    }

    return (
        <>
        {(message !== "")?<Toast><ToastBody>{message}</ToastBody></Toast> : ""}
        {(props.price !== 0)?<StripeCheckout
            stripeKey={process.env.STRIPE_KEY}
            token={makePayment}
            name="Buy Product"
        >
            <div className={CartStyle.card_btn}>
                <button type="button" class="btn btn-primary" >Purchase Now</button>
            </div>
        </StripeCheckout>:
        <div className={CartStyle.card_btn}>
            <button type="button" class="btn btn-primary" onClick={SendMessage}>Purchase Now</button>
        </div>}
        </>
    )
}

