import Link from 'next/link';
import CardActions from '@material-ui/core/CardActions';
import BlogAreaStyle from '../../../public/styles/Blogarea.module.css';
import Pagination from '../../components/Pagination';
import { useState } from 'react'
import Head from 'next/head';

export default function index({ result }) {
    const [values, setValues] = new useState(null);

    const changeValueHanler = (number) => {
        fetch(`${process.env.HOST_URL}/api/blog/get_blog/${10}/${number}`, {
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

    return (
        <>
            <Head>
                <title>Read Blog</title>
            </Head>
            <div className={BlogAreaStyle.latest_blog}>
                <div className="row">
                    <div className="col-lg-12">
                        <div className={`${BlogAreaStyle.title} text-center`}>
                            <h1>All blog post</h1>
                            <p>Blogging is good for your career. A well-executed blog sets you apart as an expert in your field.</p>
                        </div>
                    </div>
                </div>
                <div className="row">
                    {results?.data?.map(value => {
                        return <div key={value._id} className={`col-md-6 col-lg-4 col-xl-4 ${BlogAreaStyle.card_div}`}>
                            <div className={`card ${BlogAreaStyle.main_box}`}>
                                <div className="text-center">
                                    <img className="img-thumbnail" src={`/images/${value.b_img}`} alt="Blog photo" />
                                </div>
                                <div className={BlogAreaStyle.b_content}>
                                    <div className={BlogAreaStyle.title_blog}>
                                        <h3>{value.b_name}</h3>
                                    </div>
                                    <CardActions>
                                        <Link href={`/Blog/ReadBlog/${value._id}`}>
                                            <a className={BlogAreaStyle.btn_link} size="small" color="primary"> Read here <i className="fas fa-arrow-right"></i></a>
                                        </Link>
                                    </CardActions>
                                </div>
                            </div>
                        </div>
                    })
                    }
                </div>
                <Pagination result={results} changeHandler={changeValueHanler} />
            </div>
        </>
    )
}


export async function getStaticProps() {
    const res = await fetch(`${process.env.HOST_URL}/api/blog/get_blog/${10}`)
    const result = await res.json()
    return {
        props: { result }
    }
}


