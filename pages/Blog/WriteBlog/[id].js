import { parseCookies } from 'nookies';
import jwt from 'jsonwebtoken';
import { useState } from 'react';
import FormData from 'form-data';
import Table from '../../../public/styles/Table.module.css';
import { useRouter } from 'next/router';
import Head from 'next/head';

export default function index({ token, user_id, data }) {

    const router = useRouter()

    const [values, setValue] = useState({
        b_name: data[0].b_name,
        b_img: "",
        b_description: data[0].b_description
    });

    const changeHandler = (e) => {
        if (e.target.type === 'file') {
            let key = e.target.name;
            let val = document.getElementById("blog_img").files[0];
            setValue((preval) => {
                return {
                    ...preval,
                    [key]: val
                }
            })
        } else {
            let key = e.target.name;
            let val = e.target.value;
            setValue((preval) => {
                return {
                    ...preval,
                    [key]: val
                }
            })
        }
    }

    const UpdateHandeler = (e) => {
        e.preventDefault();
        var form = new FormData();
        form.append('b_name', values.b_name);
        form.append('b_img', values.b_img);
        form.append('b_description', values.b_description);

        fetch(`http://localhost:3000/api/blog/Update_specific_blog/${user_id}`, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: form
        })
            .then(res => res.json())
            .then(data => {
                router.push('/MyBlog');
            })
            .catch(err => {
                console.log(err);
            })

    }

    return (
        <>
            <Head>
                <title>Update Blog</title>
            </Head>
            <div className="row">
                <div className="col-lg-9 col-12">
                    <div className="container my-5">
                        <h1 className={Table.tblHeading}>Update Blog</h1>
                        <form>
                            <div className="mb-3">
                                <label htmlFor="blog_heading" className="form-label">Update Heading</label>
                                <input type="text" name="b_name" value={values.b_name} className="form-control" id="blog_heading" onChange={changeHandler} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="blog_img" className="form-label">Update Blog Photo</label>
                                <input className="form-control" type="file" name="b_img" value={values.b_img.fileName} id="blog_img" onChange={changeHandler} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="blog_text" className="form-label">Update Explain</label>
                                <textarea name="b_description" value={values.b_description} className="form-control" id="blog_text" rows="5" onChange={changeHandler}></textarea>
                            </div>
                            <button type="button" onClick={UpdateHandeler} className="btn btn-light">Update blog</button>
                        </form>
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
            props: { token, user_id, data }
        }
    }
}

