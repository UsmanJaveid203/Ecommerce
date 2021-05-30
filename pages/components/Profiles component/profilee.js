import UserDetail from './userDetail';
import BreadCrumbs from './Breadcrumbs'
import Buyer from './Buyer';

export default function profilee(props) {
    return (
        <div className="col-lg-9 col-12">
            <UserDetail data={props.data} token={props.token} DeleteHandler={props.DeleteHandler}/>
            <BreadCrumbs />
            <Buyer user_id={props.user_id}/>
        </div>
    )
}
