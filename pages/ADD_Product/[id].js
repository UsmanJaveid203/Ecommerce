import { useState } from 'react';
import FormData from 'form-data';
import Table from '../../public/styles/Table.module.css';
import { parseCookies } from 'nookies';
import jwt from 'jsonwebtoken';
import { useRouter } from 'next/router';
import Head from 'next/head';

export default function index({ token, user_id, data }) {

    const router = useRouter()

    const [values, setValue] = useState({
        p_name: data[0].p_name,
        p_price: data[0].p_price,
        p_image: "",
        p_category: data[0].p_category,
        p_descrip: data[0].p_descrip
    });

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

    const UpdateHandeler = (e) => {
        e.preventDefault();
        var form = new FormData();

        form.append('p_name', values.p_name);
        form.append('p_image', values.p_image);
        form.append('p_price', values.p_price);
        form.append('p_category', values.p_category);
        form.append('p_descrip', values.p_descrip);

        fetch(`${process.env.HOST_URL}/api/product/update_specific_data/${user_id}`, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: form
        })
            .then(res => res.json())
            .then(data => {
                router.push('/MyPost');
            })
            .catch(err => {
                console.log(err);
            })

    }

    return (
        <>
            <Head>
                <title>Update Product</title>
            </Head>
            <div className="row">
                <div className="col-lg-9 col-12">
                    <div className="container my-5">
                        <h1 className={Table.tblHeading}>Update Product</h1>
                        <form>
                            <div className="mb-3">
                                <label htmlFor="pro_heading" className="form-label">Update product name</label>
                                <input type="text" name="p_name" value={values.p_name} className="form-control" id="pro_heading" onChange={ChangeValuehandeler} />
                            </div>
                            <div className="mb-3 w-70">
                                <label htmlFor="pro_img" className="form-label">Update Product Image</label>
                                <input type="file" name="p_image" role="button" value={values.p_image.fileName} className="form-control" id="pro_img" onChange={ChangeValuehandeler} />
                            </div>
                            <label htmlFor="pro_cat" className="form-label">Update Product Category</label>
                            <select className={`form-select ${Table.tblInput}`} id="pro_cat" aria-label="Default select example" name="p_category" value={values.p_category} onChange={ChangeValuehandeler} >
                                <option value="Wallet">Wallet</option>
                                <option value="Clothes">Clothes</option>
                                <option value="Shoes">Shoes</option>
                                <option value="Phones">Phones</option>
                                <option value="Laptops">Laptops</option>
                                <option value="Watches">Watches</option>
                            </select>
                            <div className="mb-3">
                                <label htmlFor="pro_price" className="form-label">Update price</label>
                                <input name="p_price" value={values.p_price} type="text" className="form-control" id="pro_price" onChange={ChangeValuehandeler} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="pro_text" className="form-label">Update Description</label>
                                <textarea name="p_descrip" value={values.p_descrip} className="form-control" id="pro_text" rows="5" onChange={ChangeValuehandeler}></textarea>
                            </div>
                            <button type="button" onClick={UpdateHandeler} className="btn btn-light">Update product</button>
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
            props: { token, user_id, data }
        }
    }
}