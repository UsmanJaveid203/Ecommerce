import Sidebar from '../components/SideMenu';
import { parseCookies } from 'nookies';
import jwt from 'jsonwebtoken';
import Link from 'next/link';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import BlogAreaStyle from '../../public/styles/Blogarea.module.css';
import Pagination from '../components/Pagination';
import { useState } from 'react'
import Head from 'next/head';

export default function index({ user_role, token, result, user_id }) {
    const [values, setValues] = new useState(null);
    const changeValueHanler = (number) => {
        fetch(`https://ecommerce-203.herokuapp.com/api/blog/get_blog/${user_id}/${number}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .then(data => {
                setValues(data);
            })
            .catch(err => {
                console.log(err);
            })
    }

    let results = (values == null) ? result : values;

    if (token) {
        if (user_role === "Admin" || user_role === "root") {
            return (
                <>
                    <Head>
                        <title>Blog</title>
                    </Head>
                    <div className="row">
                        <Sidebar />
                        <div className={`col-lg-9 col-12`}>
                            <div className={BlogAreaStyle.latest_blog}>
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className={`${BlogAreaStyle.title} text-center`}>
                                            <h1>latest blog</h1>
                                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet lacus enim.</p>
                                        </div>
                                    </div>
                                </div>

                                {(results?.data?.length !== 0) ? <>
                                    <div className="row">
                                        {results?.data?.map(value => {
                                            return <div key={value._id} className={`col-md-6 col-lg-4 col-xl-4 ${BlogAreaStyle.card_div}`}>
                                                <Card className={`card ${BlogAreaStyle.main_box}`}>
                                                    <div className="text-center">
                                                        <img className="img-thumbnail" src={`/images/${value.b_img}`} alt="Blog photo" />
                                                    </div>
                                                    <div className={BlogAreaStyle.b_content}>
                                                        <div className={BlogAreaStyle.title_blog}>
                                                            <h3>{value.b_name}</h3>
                                                        </div>
                                                        <CardActions>
                                                            <Link href={`../MyBlog/${value._id}`}>
                                                                <a className={BlogAreaStyle.btn_link} size="small" color="primary"> Read here <i className="fas fa-arrow-right"></i></a>
                                                            </Link>
                                                        </CardActions>
                                                    </div>
                                                </Card>
                                            </div>
                                        })
                                        }
                                    </div>
                                    <Pagination result={results} changeHandler={changeValueHanler} />
                                </>
                                    : <div className={BlogAreaStyle.No_record_div}>
                                        <h1>Not found any blog</h1>
                                    </div>}
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
        let res = await fetch(`https://ecommerce-203.herokuapp.com/api/blog/get_blog/${user_id}`)
        let result = await res.json();
        return {
            props: { user_role, token, result, user_id }
        }
    }
}