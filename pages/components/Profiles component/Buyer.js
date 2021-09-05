import Profile from '../../../public/styles/Profile.module.css';
import { BuyerData } from '../../../redux/Action/BuyerAction';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import Pagination from '../Pagination';


export default function Seller(props) {

    const dispatch = useDispatch();
    const infor = useSelector(state => state.buyer.infor);
    const items = useSelector(state => state.buyer.items);

    const [values, setValues] = new useState(null);

    const changeValueHanler = (number) => {
        fetch(`${process.env.HOST_URL}/api/buy/BuyerProduct/${props.user_id}/${number}`, {
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

    let results = (values == null) ? items : values;

    useEffect(() => {
        dispatch(BuyerData(props.user_id))
    }, [])

    return (
        <React.Fragment>
            {(infor?.length !== 0) ? <>
            <ul>
                {infor?.map((value, index) => {
                    return <li key={index} className={Profile.List}>
                        <div className="row">
                            {value?.items?.map((values) => {
                                return <>
                                    <div className="col-md-4 col-12 text-center">
                                        <img src={`/images/${values.item.p_image}`} className={`img-thumbnail ${Profile.image}`} />
                                    </div>
                                    <div className="col-md-8 col-10">
                                        <h3 className={`${Profile.heading_1}`}>{values.item.p_name}</h3>
                                        <h6 className={`${Profile.heading_2}`}><strong>Price : $</strong>{values.item.p_price}</h6>
                                    </div>
                                </>
                            })}
                            <div className="col-12">
                                {(value.status !== 4) ? <div className={`text-center ${Profile.progress_container}`}>
                                    <div className={Profile.progress} id="progress"></div>
                                    <div className={`circle ${Profile.circle} ${(value.status >= 1) ? Profile.active : ""}`}>Ready</div>
                                    <div className={`circle ${Profile.circle} ${(value.status >= 2) ? Profile.active : ""}`}>Packed</div>
                                    <div className={`circle ${Profile.circle} ${(value.status >= 3) ? Profile.active : ""}`}>shipped</div>
                                    <div className={`circle ${Profile.circle} ${(value.status >= 4) ? Profile.active : ""}`}>Deliverd</div>
                                </div> :
                                    <div className="text-center">
                                        <h3 className={`${Profile.heading_1} ${Profile.heading}`}>Product Deliverd Successfully.....</h3>
                                    </div>}
                            </div>
                        </div>
                    </li>
                })}
            </ul>
            <Pagination result={results} changeHandler={changeValueHanler} />
            </> : <div className="text-center w-100">
                    <h2 className={Profile.head}>you didn't buy any product .............</h2>
                </div>}
        </React.Fragment>
    )
}
