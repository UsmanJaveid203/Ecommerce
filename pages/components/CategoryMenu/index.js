import Link from 'next/link';
import CatMenu from '../../../public/styles/categories_menu.module.css';
function index() {
    return (
        <div className={CatMenu.cat_main_div}>
            <h1 className={CatMenu.heading}>Product Categories</h1>
            <div className={CatMenu.pro_div}>
                <Link href="/Categories/wallet"><a className="nav-link">Wallet</a></Link>
                <Link href="/Categories/watches"><a className="nav-link">Watches</a></Link>
                <Link href="/Categories/clothes"><a className="nav-link">Clothes</a></Link>
                <Link href="/Categories/shoes"><a className="nav-link">Shoes</a></Link>
                <Link href="/Categories/phones"><a className="nav-link">Phones</a></Link>
                <Link href="/Categories/laptops"><a className="nav-link">Laptops</a></Link>
            </div>
        </div>
    )
}
 
export default index
