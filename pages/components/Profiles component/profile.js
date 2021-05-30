import UserDetail from './userDetail';
import BreadCrumbs from './Breadcrumbs';
import Seller from './Seller'

export default function profile(props) {
    return (
        <div className="col-lg-9 col-12">
            <UserDetail data={props.data} token={props.token} DeleteHandler={props.DeleteHandler}/>
            <BreadCrumbs />
            <Seller user_id={props.user_id}/>
        </div>
    )
}
