import { teamreducer } from './team';
import TeamStyle from '../../../public/styles/About.module.css';
export default function index() {
    return (
        <section className={`${TeamStyle.team2} mt-5`}>
            <div className="container">
                <h5 className={`${TeamStyle.section_title} h1`}>OUR TEAM</h5>
                <div className="row">
                    {
                        teamreducer.map((value) => (
                            <div className="col-xs-12 col-sm-6 col-md-4">
                                <div className={TeamStyle.image_flip} ontouchstart="this.classList.toggle('hover');">
                                    <div data-aos="fade-up"  data-aos-anchor-placement="center-bottom" className={TeamStyle.mainflip}>
                                        <div className={TeamStyle.frontside}>
                                            <div className={TeamStyle.card}>
                                                <div className={`${TeamStyle.card_body} text-center`}>
                                                    <img className="my-3 img-fluid"
                                                        src={value.img}
                                                        alt="card image" />
                                                    <h4 className={TeamStyle.card_title}>{value.name}</h4>
                                                    <p className={TeamStyle.card_text}>{value.desiganation}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className={TeamStyle.backside}>
                                            <div className={TeamStyle.card}>
                                                <div className={`${TeamStyle.card_body} text-center mt-4`}>
                                                    <h4 className={TeamStyle.card_title}>{value.name}</h4>
                                                    <p>{value.about}</p>
                                                    <div className={TeamStyle.card_icons}>
                                                        <a className={TeamStyle.card_social_link} href="#"><i className="fab fa-facebook-square"></i></a>
                                                        <a className={TeamStyle.card_social_link} href="#"><i className="fab fa-twitter-square"></i></a>
                                                        <a className={TeamStyle.card_social_link} href="#"><i className="fab fa-linkedin"></i></a>
                                                        <a className={TeamStyle.card_social_link} href="#"><i className="fab fa-github"></i></a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </section>
    )
}



