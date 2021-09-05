import Link from 'next/link';
import Clothes from '../../public/styles/CategoryPro.module.css';
import ProductCategory from '../components/CategoryMenu'
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Pagination from '../components/Pagination';
import { useState } from 'react'
import { DataIntoCookie } from '../../redux/Action/CartAction';
import { useDispatch } from 'react-redux';
import Head from 'next/head';


export default function clothes({ result }) {

    const [values, setValues] = new useState(null);

    const dispatch = useDispatch();

    const changeValueHanler = (number) => {
        fetch(`http://localhost:3000/api/product/get_data/${1}/${number}`, {
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

    const BuyProduct = (buy_product) => {
        dispatch(DataIntoCookie(buy_product))
    }

    return (
        <React.Fragment>
            <Head>
                <title>Clothes</title>
            </Head>
            <ProductCategory />
            <div className={Clothes.shop_maindiv}>
                {(results?.data?.length !== 0) ? <>
                    <div className={`row ${Clothes.card}`}>
                        {results?.data?.map(value => {
                            return <Card key={value._id} className={` mb-3 ${Clothes.shop_card}`}>
                                <CardActionArea>
                                    <div className="text-center">
                                        <img src={`/images/${value.p_image}`} className="img-thumbnail" alt="category_photo" />
                                    </div>
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            {value.p_name}
                                        </Typography>
                                        <Typography gutterBottom variant="h6" component="h2">
                                            {`$${value.p_price}`}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                                <CardActions className={Clothes.buton}>
                                    <a className={Clothes.btn_link} id="Btn_cart" size="small" color="primary" onClick={BuyProduct.bind(this, value)}> Add to cart <i className="cart-box fas fa-shopping-cart"></i></a>
                                    <Link href={`../Categories/${value._id}`}>
                                        <a className={Clothes.btn_link} size="small" color="primary"> See About <i className="fas fa-arrow-right"></i></a>
                                    </Link>
                                </CardActions>
                            </Card>
                        })}
                    </div>
                    <Pagination result={results} changeHandler={changeValueHanler} />
                </> : <div className={Clothes.No_record_div}>
                        <h1>Not found any product</h1>
                    </div>
                }
            </div>
        </React.Fragment>
    )
}

export async function getStaticProps() {
    const res = await fetch(`http://localhost:3000/api/product/get_data/${1}`)
    const result = await res.json()
    return {
        props: { result }
    }
}
