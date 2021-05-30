import Footer from '../../../public/styles/Footer.module.css'

export default function index() {
    return ( 
        <>
            <footer>
                <div className={Footer.footer_main}>
                    <div className="container">
                        <div className={`row ${Footer.F_div}`}>
                            <div className="col-lg-5 col-md-12 col-sm-12">
                                <div className={Footer.footer_widget}>
                                    <img src="/images/download.jpg" className="rounded mx-auto d-block" alt="Logo Image"/>
                                    <ul className={Footer.Unorder_list}>
                                        <li><a href="#"><i className="fab fa-facebook" aria-hidden="true"></i>   facebook</a></li>
                                        <li><a href="#"><i className="fab fa-twitter" aria-hidden="true"></i>   twitter</a></li>
                                        <li><a href="#"><i className="fab fa-linkedin" aria-hidden="true"></i>   linkedin</a></li>
                                        <li><a href="#"><i className="fab fa-pinterest-p" aria-hidden="true"></i>   pinterest</a></li>
                                    </ul>
                                </div>
                            </div>
                            
                            <div className="col-lg-5 col-md-12 col-sm-12">
                                <div className={Footer.footer_link_contact}>
                                    <h2>Contact Us</h2>
                                    <ul>
                                        <li>
                                            <p><i className="fas fa-map-marker-alt"></i>Address: Zarer Shaheed Road <br />Vaterinary Research Insitute,<br /> D#4 </p>
                                        </li>
                                        <li>
                                            <p><i className="fas fa-phone-square"></i>Phone: <a href="tel:+1-888705770">+92 304 0078819</a></p>
                                        </li>
                                        <li>
                                            <p><i className="fas fa-envelope"></i>Email: <a href="mailto:usmanjaveid.185203@gmail.com">usmanjaveid.185203@gmail.com</a></p>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    )
}
