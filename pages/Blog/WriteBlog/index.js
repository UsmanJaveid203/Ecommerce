import { parseCookies } from 'nookies';
import jwt from 'jsonwebtoken';
import { useState } from 'react';
import Table from '../../../public/styles/Table.module.css';
import FormData from 'form-data';
import SideMenu from '../../components/SideMenu'
import Head from 'next/head';

export default function index({ user_role, token, user_id }) {

    if (token) {
        if (user_role === "root" || user_role === "Admin") {

            const [values, setValue] = useState({
                b_name: "",
                b_img: "",
                b_description: ""
            });

            const [message, setMessage] = useState("");

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

            const UploadHandeler = (e) => {
                e.preventDefault();
                var form = new FormData();
                form.append('b_id', user_id);
                form.append('b_name', values.b_name);
                form.append('b_img', values.b_img);
                form.append('b_description', values.b_description);

                fetch(`${process.env.HOST_URL}/api/blog/upload_data`, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    },
                    body: form
                })
                    .then(res => res.json())
                    .then(data => {
                        setMessage(data.msg);
                        setTimeout(() => {
                            setMessage("");
                        }, 3000)
                    })
                    .catch(err => {
                        console.log(err);
                    })

            }

            return (
                <>
                    <Head>
                        <title>Write Blog</title>
                    </Head>
                    <div className="row">
                        <SideMenu />
                        <div className="col-lg-9 col-12">
                            <div className="container my-5">
                                <h1 className={Table.tblHeading}>Write Blog</h1>
                                {message ? <div className="alert alert-success my-3" role="alert">{message}</div> : ""}
                                <form>
                                    <div className="mb-3">
                                        <label htmlFor="blog_heading" className="form-label">Heading</label>
                                        <input type="text" name="b_name" value={values.b_name} className="form-control" id="blog_heading" placeholder="Enter Heading....." onChange={changeHandler} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="blog_img" className="form-label">Upload Photo</label>
                                        <input className="form-control" type="file" name="b_img" value={values.b_img.fileName} id="blog_img" placeholder="Chose only single Photo..... " onChange={changeHandler} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="blog_text" className="form-label">Explain</label>
                                        <textarea name="b_description" value={values.b_description} className="form-control" id="blog_text" rows="5" placeholder="Enter Product detail...." onChange={changeHandler}></textarea>
                                    </div>
                                    <button type="button" onClick={UploadHandeler} className="btn btn-light">Upload blog</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </>
            )
        }
    }
}


export async function getServerSideProps(ctx) {
    const { token } = parseCookies(ctx);
    let user = jwt.decode(token);
    let user_role = (user) ? user.u_role : "";
    let user_id = (user) ? user.u_id : "";

    if (!token || user_role === "u_role") {
        const { res } = ctx
        res.writeHead(302, { Location: "/" })
        res.end()
        return {
            props: {}
        }
    } else {
        return {
            props: { user_role, token, user_id }
        }
    }
}

