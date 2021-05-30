import Link from 'next/link';
import CardActions from '@material-ui/core/CardActions';
import BlogAreaStyle from '../../../public/styles/Blogarea.module.css';
export default function index(props) {

    return (
        <div className={BlogAreaStyle.latest_blog}>
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className={`${BlogAreaStyle.title} text-center`}>
                            <h1>latest blog</h1>
                            <p>The first step in blogging is not writing them but reading them.</p>
                        </div>
                    </div>
                </div>
                <div className="row">
                    {
                        props.result.data.slice(0, 3).map((value) => (
                            <div data-aos="fade-up" data-aos-anchor-placement="center-bottom" className="col-md-6 col-lg-4 col-xl-4">
                                <div className={BlogAreaStyle.main_box}>
                                    <div key={value._id} className="text-center">
                                        <img className="img-fluid" src={`images/${value.b_img}`} alt="Blog photo" />
                                    </div>
                                    <div key={value._id + Math.random()} className={BlogAreaStyle.b_content}>
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
                        ))
                    }
                </div>
            </div>
        </div>
    )
}
