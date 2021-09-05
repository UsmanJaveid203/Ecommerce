import { parseCookies } from 'nookies';
import { useEffect } from 'react';
import Checkout from '../components/CheckOut';
import { useDispatch, useSelector } from 'react-redux';
import { GetFromCookie, RemoveFromCookie, UpdateCounting } from '../../redux/Action/CartAction';
import jwt from 'jsonwebtoken';
import CartStyle from '../../public/styles/Cart.module.css';
import Head from 'next/head';

export default function index({ token, user_id }) {
    const dispatch = new useDispatch();

    const Information = useSelector(state => state.cart.items);
    const Order_no = useSelector(state => state.cart.orderItems);
    const price = useSelector(state => state.cart.totalPrice);

    const RemoveItemHandler = (index) => {
        dispatch(RemoveFromCookie(index));
    }

    const changeHandler = (UserInfo) => {
        let val = document.getElementById(`field${UserInfo.item._id}`).value;
        let userInfor = {
            val: parseInt(val),
            id: UserInfo.item._id,
            p_price: UserInfo.item.p_price
        }
        dispatch(UpdateCounting(userInfor))
    }

    useEffect(() => {
        dispatch(GetFromCookie());
    }, [])



    if (token) {
        return (
            <>
                <Head>
                    <title>Cart page</title>
                </Head>
                <div className="row">
                    <div className="col-md-8 col-12">
                        <div className={CartStyle.tblDiv}>
                            <h1 className={CartStyle.heading}>Cart Product</h1>

                            <table className={`table ${CartStyle.pro_table}`}>
                                <thead>
                                    <tr className={CartStyle.tbl_heading}>
                                        <th>#NO</th>
                                        <th>Images</th>
                                        <th>Product Name</th>
                                        <th>price</th>
                                        <th>buy items</th>
                                        <th>remove item</th>
                                    </tr>
                                </thead>
                                {(Order_no > 0) ?
                                    <tbody>
                                        {
                                            Information?.map((value, index) => {
                                                return <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td className="text-center">
                                                        <img src={`/images/${value.item.p_image}`} className={`img-thumbnail ${CartStyle.image}`} alt="category_photo" />
                                                    </td>
                                                    <td>{value.item.p_name}</td>
                                                    <td>{value.item.p_price}</td>
                                                    <td><input type="text" id={`field${value.item._id}`} defaultValue={value.qty} className={CartStyle.inputfield} onChange={changeHandler.bind(this, value)} /></td>
                                                    <td><a className="text-center" type="button" onClick={RemoveItemHandler.bind(this, index)}><i className={`fas fa-minus-circle ${CartStyle.icons}`}></i></a></td>
                                                </tr>
                                            })
                                        }
                                    </tbody>
                                    : <td colSpan="7" className={CartStyle.No_record_div}>
                                        <h1>Not found any product</h1>
                                    </td>
                                }
                            </table>
                        </div>
                    </div>
                    <div className="col-md-4 col-12">
                        <div className={`card ${CartStyle.crd}`}>
                            <div className="card-body">
                                <h2 className={`card-title ${CartStyle.crd_heading}`}>Total Bill</h2>
                                <p className={`card-text ${CartStyle.card_para}`}><strong>No. of Items : </strong>{Order_no}</p>
                                <p className={`card-text ${CartStyle.card_para}`}><strong>Total Price  : </strong>$ {price}</p>

                                <Checkout user_id={user_id} price={price} />
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export async function getServerSideProps(ctx) {
    const { token } = parseCookies(ctx);
    let user = jwt.decode(token);
    let user_id = (user) ? user.u_id : "";

    if (!token) {
        const { res } = ctx
        res.writeHead(302, { Location: "/SignIn" })
        res.end()
        return {
            props: {}
        }
    } else {
        return {
            props: { token, user_id }
        }
    }
}


