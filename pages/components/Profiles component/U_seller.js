import Profile from '../../../public/styles/Profile.module.css';
import { BuyerData } from '../../../redux/Action/BuyerAction';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

export default function Seller(props) {

    const dispatch = useDispatch();
    const infor = useSelector(state => state.buyer.infor);


    useEffect(() => {
        dispatch(BuyerData(props.user_id))
    }, [])

    return (
        <ul>
            {infor.map((value, index) => {
                return <li key={index} className={Profile.List}>
                    <div className="row">
                        {value.items.map((values) => {
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
    )
}
