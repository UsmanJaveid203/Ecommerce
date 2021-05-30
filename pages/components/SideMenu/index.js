import { Fragment } from 'react';
import Link from 'next/link';
import Style from '../../../public/styles/sideMenu.module.css'
import { parseCookies } from 'nookies';
import { useRouter } from 'next/router';
import jwt from 'jsonwebtoken';
let MenuData;

export default function index() {
    const { token } = parseCookies();
    var dataa = jwt.decode(token);
    let user_data = (dataa) ? dataa.u_role : "";
    let router= useRouter();
    if (token) {
        if (user_data === 'Admin') {
            MenuData = <>
                <li className={`nav-item  ${Style.List_item}`}><Link href="/Profile"><a className={`nav-link ${(router.pathname === '/Profile' || router.pathname === '/Profilee') ? Style.activeClass : ""}`}>Profile</a></Link></li>
                <li className={`nav-item  ${Style.List_item}`}><Link href="/ADD_Product"><a className={`nav-link ${(router.pathname === '/ADD_Product') ? Style.activeClass : ""}`}>Upload Product</a></Link></li>
                <li className={`nav-item  ${Style.List_item}`}><Link href="/Blog/WriteBlog"><a className={`nav-link ${(router.pathname === '/Blog/WriteBlog') ? Style.activeClass : ""}`}>Write Blog</a></Link></li>
                <li className={`nav-item  ${Style.List_item}`}><Link href="/MyPost"><a className={`nav-link ${(router.pathname === '/MyPost') ? Style.activeClass : ""}`}>My Post</a></Link></li>
                <li className={`nav-item ${Style.List_item}`}><Link href="/MyBlog"><a className={`nav-link ${(router.pathname === '/MyBlog') ? Style.activeClass : ""}`}>My Blog</a></Link></li>
            </>
        } else if (user_data === 'root') {
            MenuData = <>
                <li className={`nav-item  ${Style.List_item}`}><Link href="/Profile"><a className={`nav-link ${(router.pathname === '/Profile' || router.pathname === '/Profilee') ? Style.activeClass : ""}`}>Profile</a></Link></li>
                <li className={`nav-item  ${Style.List_item}`}><Link href="/Community"><a className={`nav-link ${(router.pathname === '/Community') ? Style.activeClass : ""}`}>Community</a></Link></li>
                <li className={`nav-item  ${Style.List_item}`}><Link href="/ADD_Product"><a className={`nav-link ${(router.pathname === '/ADD_Product') ? Style.activeClass : ""}`}>Upload Product</a></Link></li>
                <li className={`nav-item  ${Style.List_item}`}><Link href="/Blog/WriteBlog"><a className={`nav-link ${(router.pathname === '/Blog/WriteBlog') ? Style.activeClass : ""}`}>Write Blog</a></Link></li>
                <li className={`nav-item  ${Style.List_item}`}><Link href="/MyPost"><a className={`nav-link ${(router.pathname === '/MyPost') ? Style.activeClass : ""}`}>My Post</a></Link></li>
                <li className={`nav-item ${Style.List_item}`}><Link href="/MyBlog"><a className={`nav-link ${(router.pathname === '/MyBlog') ? Style.activeClass : ""}`}>My Blog</a></Link></li>
            </>
        }
    }

    return (
        <Fragment>
            <div className={`col-lg-3 col-12 ${Style.sidenav}`}>
                <nav className="navbar navbar-expand-lg">
                    <button className={`navbar-toggler ${Style.MyBtn}`} type="button" data-toggle="collapse" data-target="#sidebar-menu" aria-controls="navbars-rs-food" aria-expanded="false" aria-label="Toggle navigation">
                        <i className="fa fa-users fa-2x" aria-hidden="true"></i>
                    </button>

                    <div className="collapse navbar-collapse" id="sidebar-menu">
                        <ul className={`nav flex-column ${Style.Unorder_item}`}>
                            {MenuData}
                        </ul>
                    </div>
                </nav>
            </div>
        </Fragment>
    )
}