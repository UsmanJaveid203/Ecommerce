import Top from '../Top';
import { useEffect } from 'react';
import Link from 'next/link';
import MainHeader from '../../../public/styles/header.module.css';
import { parseCookies } from 'nookies';
import jwt from 'jsonwebtoken';
import { useSelector, useDispatch } from 'react-redux';
import { GetFromCookie } from '../../../redux/Action/CartAction';

let MenuData;
export default function index() {
    const dispatch = new useDispatch();
    const Order_no = useSelector(state => state.cart.orderItems);

    const { token } = parseCookies();
    let user = jwt.decode(token);
    let user_role = (user) ? user.u_role : "";

    if (token) {
        if (user_role === 'User') {
            MenuData = <>
                <li className={`nav-item ${MainHeader.navbar_list}`}><Link href="/"><a className="nav-link">HOME</a></Link></li>
                <li className={`nav-item ${MainHeader.navbar_list}`}><Link href="/Blog/ReadBlog"><a className="nav-link">BLOG</a></Link></li>
                <li className={`nav-item ${MainHeader.navbar_list}`}><Link href="/Userprofile"><a className="nav-link">PROFILE</a></Link></li>
                <li className={`nav-item ${MainHeader.navbar_list}`}><Link href="/Aboutpage"><a className="nav-link">ABOUT US</a></Link></li>
            </>
        } else {
            MenuData = <>
                <li className={`nav-item ${MainHeader.navbar_list}`}><Link href="/"><a className="nav-link">HOME</a></Link></li>
                <li className={`nav-item ${MainHeader.navbar_list}`}><Link href="/Blog/ReadBlog"><a className="nav-link">BLOG</a></Link></li>
                <li className={`nav-item ${MainHeader.navbar_list}`}><Link href="/Profile"><a className="nav-link">PROFILE</a></Link></li>
                <li className={`nav-item ${MainHeader.navbar_list}`}><Link href="/Aboutpage"><a className="nav-link">ABOUT US</a></Link></li>
            </>
        }
    } else {
        MenuData = <>
            <li className={`nav-item ${MainHeader.navbar_list}`}><Link href="/"><a className="nav-link">HOME</a></Link></li>
            <li className={`nav-item ${MainHeader.navbar_list}`}><Link href="/Blog/ReadBlog"><a className="nav-link">BLOG</a></Link></li>
            <li className={`nav-item ${MainHeader.navbar_list}`}><Link href="/Aboutpage"><a className="nav-link">ABOUT US</a></Link></li>
        </>
    }
 

    useEffect(() => {
        dispatch(GetFromCookie());
    }, [])

    return (
        <>
            <Top />
            <header className={`row ${MainHeader.main_header}`}>
                <div className="col-9">
                    <nav className="navbar navbar-expand-lg navbar-default bootsnav">
                        <div className="container">
                            <div className="navbar-header">
                                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar-menu" aria-controls="navbars-rs-food" aria-expanded="false" aria-label="Toggle navigation">
                                    <i className="fa fa-bars"></i>
                                </button>
                                <Link href="/"><a className={MainHeader.navbar_brand}><img className={MainHeader.photo} src="images/download.jpg" alt="logo image" /></a></Link>
                            </div>
                            <div className="collapse navbar-collapse" id="navbar-menu">
                                <ul className={`nav navbar-nav ml-auto ${MainHeader.UnOrder}`} data-in="fadeInDown" data-out="fadeOutUp">
                                    {MenuData}
                                </ul>
                            </div>
                        </div>
                    </nav>
                </div>
                <div className={`col-2 ${MainHeader.header_att}`}>
                    <Link href="/CartPage"><a>
                        <i className="cart-box fas fa-shopping-cart"></i>
                        <span>{Order_no}</span>
                    </a></Link>
                </div>
            </header>
        </>
    )
}

