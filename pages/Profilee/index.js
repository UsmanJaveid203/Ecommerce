import { parseCookies } from 'nookies';
import jwt from 'jsonwebtoken';
import Sidebar from '../components/SideMenu';
import { useRouter } from 'next/router';
import Profilee from '../components/Profiles component/profilee';
import Head from 'next/head';

export default function profilee({ token, data, user_id }) {

    const router = useRouter();

    const DeleteHandler = () => {

        fetch(`https://ecommerce-203.herokuapp.com/api/user/delteData/${user_id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then(res => res.json())
            .then(data => {
                router.push('/')
                cookie.remove('token')
            })
            .catch(err => {
                console.log(err);
            })
    }


    return (
        <>
            <Head>
                <title>Profile</title>
            </Head>
            <div className="row">
                <Sidebar />
                <Profilee data={data} token={token} user_id={user_id} DeleteHandler={DeleteHandler} />
            </div>
        </>
    )
}


export async function getServerSideProps(ctx) {
    const { token } = parseCookies(ctx);
    let user = jwt.decode(token);
    let user_role = (user) ? user.u_role : "";
    let user_id = (user) ? user.u_id : "";

    if (!token || user_role === "User") {
        const { res } = ctx
        res.writeHead(302, { Location: "/" })
        res.end()
        return {
            props: {}
        }
    } else {
        let res = await fetch(`https://ecommerce-203.herokuapp.com/api/user/getData/${user_id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        let data = await res.json();
        return {
            props: { token, data, user_id }
        }
    }
}