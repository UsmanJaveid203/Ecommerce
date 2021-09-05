import { useState } from 'react';
import FormData from 'form-data';
import Table from '../../public/styles/Table.module.css';
import SideMenu from '../components/SideMenu'
import { parseCookies } from 'nookies';
import jwt from 'jsonwebtoken';
import Head from 'next/head';

export default function index({ user_role, token, user_id }) {

    if (token) {
        if (user_role === 'Admin' || user_role === 'root') {
            const [values, setValue] = useState({
                p_name: "",
                p_price: "",
                p_image: "",
                p_category: "",
                p_descrip: ""
            });

            const [message, setMessage] = useState("");

            const ChangeValuehandeler = (e) => {
                if (e.target.type === 'file') {
                    let key = e.target.name;
                    let val = document.getElementById("pro_img").files[0];
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
                form.append('u_id', user_id);
                form.append('p_name', values.p_name);
                form.append('p_image', values.p_image);
                form.append('p_price', values.p_price);
                form.append('p_category', values.p_category);
                form.append('p_descrip', values.p_descrip);

                fetch(`${process.env.HOST_URL}/api/product/upload_data`, {
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
                        <title>Add Product</title>
                    </Head>
                    <div className="row">
                        <SideMenu />
                        <div className="col-lg-9 col-12">
                            <div className="container my-5">
                                <h1 className={Table.tblHeading}>Upload Product</h1>
                                {message ? <div className="alert alert-success my-3" role="alert">{message}</div> : ""}
                                <form>
                                    <div className="mb-3">
                                        <label htmlFor="pro_heading" className="form-label">product name</label>
                                        <input type="text" name="p_name" value={values.p_name} className="form-control" id="pro_heading" placeholder="enter product name" onChange={ChangeValuehandeler} />
                                    </div>
                                    <div className="mb-3 w-70">
                                        <label htmlFor="pro_img" className="form-label">Product Image</label>
                                        <input type="file" name="p_image" role="button" value={values.p_image.fileName} className="form-control" id="pro_img" onChange={ChangeValuehandeler} />
                                    </div>
                                    <label htmlFor="pro_cat" className="form-label">Product Category</label>
                                    <select className={`form-select ${Table.tblInput}`} id="pro_cat" aria-label="Default select example" name="p_category" value={values.p_category} onChange={ChangeValuehandeler} >
                                        <option value="Wallet">Wallet</option>
                                        <option value="Clothes">Clothes</option>
                                        <option value="Shoes">Shoes</option>
                                        <option value="Phones">Phones</option>
                                        <option value="Laptops">Laptops</option>
                                        <option value="Watches">Watches</option>
                                    </select>
                                    <div className="mb-3">
                                        <label htmlFor="pro_price" className="form-label">price</label>
                                        <input name="p_price" value={values.p_price} type="text" className="form-control" id="pro_price" placeholder="enter product price" onChange={ChangeValuehandeler} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="pro_text" className="form-label">Description</label>
                                        <textarea name="p_descrip" value={values.p_descrip} className="form-control" id="pro_text" rows="5" onChange={ChangeValuehandeler}></textarea>
                                    </div>
                                    <button type="button" onClick={UploadHandeler} className="btn btn-light">Upload product</button>
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