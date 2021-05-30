import Ourteam from '../components/Ourteam';
import AboutStyle from '../../public/styles/About.module.css';
import Head from 'next/head';

export default function index() {
    return (
        <>
            <Head>
                <title>About</title>
            </Head>
            <div className={AboutStyle.about_box}>
                <div className="container">
                    <div className="row">
                        <div data-aos="fade-up" data-aos-anchor-placement="center-bottom" className="col-lg-6">
                            <h2 className={AboutStyle.About_title}>Brain & StartUps</h2>
                            <p>"This is online shoping enviroment. We provide facility to write blog about your product.
                        If you want to post your product create your accout as admin role."</p>
                            <p>It’s good for your store and your competitors are probably already doing it. But what kind of ecommerce content should you have?
                            That’s strongly specific for your business, but we’ve selected some of the best eCommerce content marketing examples from a few online stores to get you in a creative mood.
                            The businesses we looked at are almost exclusively owned and ran by entrepreneurs who don’t have huge marketing departments and budgets.
                        Many of them offer niche products and we feature a wide range of categories to illustrate how to create content marketing for ecommerce sites selling any product. This is to show that content marketing strategy for ecommerce is doable even in small teams and with little budget.</p>
                        </div>
                        <div data-aos="fade-left" data-aos-anchor-placement="center-bottom" className="col-lg-6">
                            <div> <img className="img-thumbnail img-fluid" src="images/con_shop.jpeg" alt="" />
                            </div>
                        </div>
                    </div>
                </div>
                <Ourteam />
            </div>
        </>
    )
}
