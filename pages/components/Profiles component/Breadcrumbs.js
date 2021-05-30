import Link from 'next/link';
import { useRouter } from 'next/router';
import Bread from '../../../public/styles/Breadcrumbs.module.css'

export default function Breadcrumbs() {
    let router= useRouter();

    return (
        <React.Fragment>
            <ol className={`breadcrumb ${Bread.main}`}>
                <div className={Bread.link_div}>
                    <li className="breadcrumb-item"><Link href="/Profile"><a className={`${Bread.linkk} ${(router.pathname === '/Profile') ? Bread.activeClass : ""}`}>User</a></Link></li>
                    <li className="breadcrumb-item"><Link href="/Profilee"><a className={`${Bread.linkk} ${(router.pathname === '/Profilee') ? Bread.activeClass : ""}`}>Buyer</a></Link></li>
                </div>
            </ol>
        </React.Fragment>
    )
}