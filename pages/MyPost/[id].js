import SpecificPro from '../../public/styles/specificPro.module.css'
import { parseCookies } from 'nookies';
import jwt from 'jsonwebtoken';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Head from 'next/head';

export default function index({ data, user_id, token }) {
    const router = useRouter();

    const DeleteHandler = () => {
        fetch(`${process.env.HOST_URL}/api/product/delete_data/${user_id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then(res => res.json())
            .then(data => {
                router.push('/MyPost')
            })
            .catch(err => {
                console.log(err);
            })
    }


    return (
        <>
            <Head>
                <title>Product</title>
            </Head>
            <div className="container">
                <h1 class={SpecificPro.heading}>{data[0].p_name}</h1>
                <div className="row">
                    <div className={`col-md-4 text-center ${SpecificPro.img_div}`}>
                        <img src={`/images/${data[0].p_image}`} className="img-thumbnail" alt="product_photo" />
                    </div>
                    <div className="col-md-8">
                        <p className={SpecificPro.para}>{data[0].p_descrip}</p>
                        <h4 className="my-4"><strong>Price : </strong>${data[0].p_price}</h4>
                        <div className={`${SpecificPro.button}`}>
                            <Link href={`/ADD_Product/${data[0]._id}`}><a type="button" className={`btn btn-outline-primary`}>Edit <i className="fas fa-edit"></i></a></Link>
                            <button type="button" className={`btn btn-outline-primary`} onClick={DeleteHandler}>Delete <i className="fas fa-trash"></i></button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}


export async function getServerSideProps(ctx) {
    const { token } = parseCookies(ctx);
    let user = jwt.decode(token);
    let user_role = (user) ? user.u_role : "";
    let user_id = ctx.params.id;

    if (!token || user_role === "u_role") {
        const { res } = ctx
        res.writeHead(302, { Location: "/" })
        res.end()
        return {
            props: {}
        }
    } else {
        const res = await fetch(`${process.env.HOST_URL}/api/product/specific_data/${user_id}`)
        const data = await res.json()
        return {
            props: { data, user_id, token },
        }
    }
}
