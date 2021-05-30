import BlogSpecific from '../../../public/styles/BlogSpeci.module.css';
import Head from 'next/head';

export default function index({ data }) {
    return (
        <>
            <Head>
                <title>Read Blog</title>
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
                </div>
            </div>
        </>
    )
}


export async function getServerSideProps(ctx) {
    let user_id = ctx.params.id;

    const res = await fetch(`http://localhost:3000/api/blog/specific_blog/${user_id}`)
    const data = await res.json()
    return {
        props: { data },
    }
}