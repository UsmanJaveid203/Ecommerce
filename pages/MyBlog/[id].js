import BlogSpecific from '../../public/styles/BlogSpeci.module.css'
import { parseCookies } from 'nookies';
import jwt from 'jsonwebtoken';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Head from 'next/head';

export default function index({ data, user_id, token }) {
    const router = useRouter()

    const DeleteHandler = () => {
        fetch(`http://localhost:3000/api/blog/Delete_record/${user_id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then(res => res.json())
            .then(data => {
                router.push('/MyBlog')
            })
            .catch(err => {
                console.log(err);
            })
    }


    return (
        <>
            <Head>
                <title>Blog</title>
            </Head>
            <div className="container">
                <h1 className={BlogSpecific.heading}>{data[0].b_name}</h1>
                <div className="row">
                    <div className={`col-12 text-center ${BlogSpecific.img_div}`}>
                        <img src={`/images/${data[0].b_img}`} className="img-thumbnail" alt="product_photo" />
                    </div>
                    <div className="col-12">
                        <p className={BlogSpecific.para}>{data[0].b_description}</p>
                    </div>
                    <div className={BlogSpecific.button}>
                        <Link href={`/Blog/WriteBlog/${data[0]._id}`}>
                            <a type="button" className={`btn`}>Edit <i className="fas fa-edit"></i></a>
                        </Link>
                        <button type="button" className={`btn`} onClick={DeleteHandler}>Delete <i className="fas fa-trash"></i></button>
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

    if (!token || user_role === "User") {
        const { res } = ctx
        res.writeHead(302, { Location: "/" })
        res.end()
        return {
            props: {}
        }
    } else {
        const res = await fetch(`http://localhost:3000/api/blog/specific_blog/${user_id}`)
        const data = await res.json()
        return {
            props: { data, user_id, token },
        }
    }
}