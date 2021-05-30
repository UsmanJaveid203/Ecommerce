import TopHeader from '../../../public/styles/topheader.module.css';
import Link from 'next/link';
import cookie from 'js-cookie';
import { parseCookies } from 'nookies';
import { useRouter } from 'next/router';


let MenuData;

export default function index() {
    const { token } = parseCookies();
    let router= useRouter();

    const LogoutUser = (e) => {
        e.preventDefault();
        cookie.remove('token')
        router.push('/');
    }

    if (token) {
        MenuData = <>
            <li><button className={`btn ${TopHeader.button}`} onClick={LogoutUser}>Logout</button></li>
            <li><Link href="/ContactUs"><a>Contact Us</a></Link></li>
        </>
    } else {
        MenuData = <>
            <li><Link href="/SignIn"><a>Sign in</a></Link></li>
            <li><Link href="/SignUp"><a>Create Account</a></Link></li>
            <li><Link href="/ContactUs"><a>Contact Us</a></Link></li>
        </>
    }

    return (
        <div className={TopHeader.main_div}>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        <div className={TopHeader.our_link}>
                            <ul>
                                {MenuData}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
