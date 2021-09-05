import Sidebar from '../components/SideMenu';
import { parseCookies } from 'nookies';
import ProductCategory from '../components/CategoryMenu'
import Mypost from '../../public/styles/CategoryPro.module.css';
import jwt from 'jsonwebtoken';
import Link from 'next/link';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { useState } from 'react'
import Pagination from '../components/Pagination';
import Head from 'next/head';

function index({ user_role, token, result, user_id }) {

    const [values, setValues] = new useState(null);
    const changeValueHanler = (number) => {
        fetch(`https://ecommerce-203.herokuapp.com/api/product/get_data/${user_id}/${number}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .then(data => {
                setValues(data);
            })
            .catch(err => {
                console.log(err);
            })
    }

    let results = (values == null) ? result : values;

    if (token) {
        if (user_role === "Admin" || user_role === "root") {
            return (
                <> 
                    <Head>
                        <title>Product</title>
                    </Head>
                    <div className="row">
                        <Sidebar />
                        <div className={`col-lg-9 col-12`}>
                            <ProductCategory />
                            <div className={Mypost.shop_maindiv}>
                                {(results?.data?.length !== 0) ? <>
                                    <div className={`row ${Mypost.card}`}>
                                        {results?.data?.map(value => {
                                            return <Card key={value._id} className={` mb-3 ${Mypost.shop_card}`}>
                                                <CardActionArea>
                                                    <div className="text-center">
                                                        <img src={`/images/${value.p_image}`} className="img-thumbnail" alt="category_photo" />
                                                    </div>
                                                    <CardContent>
                                                        <Typography gutterBottom variant="h5" component="h2">
                                                            ${value.p_name}
                                                        </Typography>
                                                        <Typography gutterBottom variant="h6" component="h2">
                                                            {`$${value.p_price}`}
                                                        </Typography>
                                                    </CardContent>
                                                </CardActionArea>
                                                <CardActions className={Mypost.buton}>
                                                    <a className={Mypost.btn_link} size="small" color="primary"> Add to cart <i className="cart-box fas fa-shopping-cart"></i></a>
                                                    <Link href={`/MyPost/${value._id}`}>
                                                        <a className={Mypost.btn_link} size="small" color="primary"> See About <i className="fas fa-arrow-right"></i></a>
                                                    </Link>
                                                </CardActions>
                                            </Card>
                                        })}
                                    </div>
                                    <Pagination result={results} changeHandler={changeValueHanler} />
                                </> : <div className={Mypost.No_record_div}>
                                        <h1>Not found any product</h1>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </>
            )
        }
    }
}
export default index


export async function getServerSideProps(ctx) {
    const { token } = parseCookies(ctx);
    let user = jwt.decode(token);
    let user_role = (user) ? user.u_role : "";
    let user_id = (user) ? user.u_id : "";

    if (!token || user_role === "u_role") {
        const { res } = ctx
        res.writeHead(302, { Location: "/" })
        res.end()
        return {
            props: {}
        }
    } else {
        let res = await fetch(`https://ecommerce-203.herokuapp.com/api/product/get_data/${user_id}`)
        let result = await res.json();
        return {
            props: { user_role, token, result, user_id }
        }
    }
}