import UserDetail from './userDetail';
import Seller from './U_seller';

export default function profile(props) {
    return (
        <div className="col-lg-9 col-12">
            <UserDetail data={props.data} token={props.token} DeleteHandler={props.DeleteHandler} />
            <Seller/>
        </div>
    )
}