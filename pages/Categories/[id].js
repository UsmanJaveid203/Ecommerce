import SpecificPro from '../../public/styles/specificPro.module.css'
// import { parseCookies } from 'nookies';
// import jwt from 'jsonwebtoken';
import { DataIntoCookie } from '../../redux/Action/CartAction';
import { useDispatch } from 'react-redux';
import Head from 'next/head';

export default function index({ data }) {

    const dispatch = useDispatch();

    const BuyProduct = (buy_product) => {
        dispatch(DataIntoCookie(buy_product))
    }

    return (
        <>
            <Head>
                <title>Product</title>
            </Head>
            <div className="container">
                <h1 class={SpecificPro.heading}>{data[0].p_name}</h1>
                <div className="row">
                    <div className={`col-md-4 text-center ${SpecificPro.img_div}`}>
                        <img src={`/images/${data[0].p_image}`} className="img-thumbnail" alt="product_photo" />
                    </div>
                    <div className="col-md-8">
                        <p className={SpecificPro.para}>{data[0].p_descrip}</p>
                        <h4 className="my-4"><strong>Price : </strong>${data[0].p_price}</h4>
                        <div className={`${SpecificPro.button}`}>
                            <button type="button" className={`btn btn-outline-primary`} onClick={BuyProduct.bind(this, data[0])}>Add to cart</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}


export async function getServerSideProps(ctx) {
    let user_id = ctx.params.id;

    const res = await fetch(`https://ecommerce-203.herokuapp.com/api/product/specific_data/${user_id}`)
    const data = await res.json()
    return {
        props: { data },
    }
}

