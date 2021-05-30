import SliderStyle from '../../../public/styles/slider.module.css';

export default function index() {
    return (
        <div className={SliderStyle.sli_main_div}>
            <div id="carouselExampleCaptions" className={`carousel slide ${SliderStyle.main}`} data-ride="carousel">
                <ol className="carousel-indicators">
                    <li data-target="#carouselExampleCaptions" data-slide-to="0" className="active"></li>
                    <li data-target="#carouselExampleCaptions" data-slide-to="1"></li>
                    <li data-target="#carouselExampleCaptions" data-slide-to="2"></li>
                    <li data-target="#carouselExampleCaptions" data-slide-to="3"></li>
                </ol>
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <div className={`text-center ${SliderStyle.ImageStyle}`}>
                            <img src="images/slider_1.jpeg" className={`w-100 ${SliderStyle.photo}`} alt="Slider_photo" />
                        </div>
                        <div data-aos="fade-up" data-aos-anchor-placement="center-bottom" className="carousel-caption d-none d-md-block">
                            <h5 className={SliderStyle.heading}> Business vision</h5>
                            <p className={SliderStyle.para}>“Chase the vision, not the money; the money will end up following you.”</p>
                        </div>
                    </div>
                    <div className="carousel-item">
                        <div className={`text-center ${SliderStyle.ImageStyle}`}>
                            <img src="images/two_sli.jpg" className={`w-100 ${SliderStyle.photo}`} alt="Slider_photo" />
                        </div>
                        <div data-aos="fade-up" data-aos-anchor-placement="center-bottom" className="carousel-caption d-none d-md-block">
                            <h5 className={SliderStyle.heading}>E-commerce</h5>
                            <p className={SliderStyle.para}>“The sooner we drop the ‘e’ out of ‘e-commerce’ and just call it commerce, the better.”</p>
                        </div>
                    </div>
                    <div className="carousel-item">
                        <div className={`text-center ${SliderStyle.ImageStyle}`}>
                            <img src="images/three_sli.jpg" className={`w-100 ${SliderStyle.photo}`} alt="Slider_photo" />
                        </div>
                        <div data-aos="fade-up" data-aos-anchor-placement="center-bottom" className="carousel-caption d-none d-md-block">
                            <h5 className={SliderStyle.heading}>“Communication</h5>
                            <p className={SliderStyle.para}>“Communication is at the heart of e-commerce and community.”</p>
                        </div>
                    </div>
                    <div className="carousel-item">
                        <div className={`text-center ${SliderStyle.ImageStyle}`}>
                            <img src="images/four_sli.jpg" className={`w-100 ${SliderStyle.photo}`} alt="Slider_photo" />
                        </div>
                        <div data-aos="fade-up" data-aos-anchor-placement="center-bottom" className="carousel-caption d-none d-md-block">
                            <h5 className={SliderStyle.heading}>Customer service</h5>
                            <p className={SliderStyle.para}>“Customer service shouldn’t just be a department, it should be the entire company”</p>
                        </div>
                    </div>
                </div>
                <a className="carousel-control-prev" href="#carouselExampleCaptions" role="button" data-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="sr-only">Previous</span>
                </a>
                <a className="carousel-control-next" href="#carouselExampleCaptions" role="button" data-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="sr-only">Next</span>
                </a>
            </div>
        </div>
    )
}
