import Table from '../../public/styles/Table.module.css';
import Head from 'next/head';

export default function index() {
    return (
        <>
            <Head>
                <title>Contact Us</title>
            </Head>
            <div className="container my-5">
                <h2 className={Table.tblHeading}>GET IN TOUCH</h2>
                <form id="contactForm">
                    <div className="mb-3">
                        <label htmlFor="con_name" className="form-label">Name</label>
                        <input type="text" className="form-control" id="con_name" name="name" placeholder="Enter Name" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="con_mail" className="form-label">Email</label>
                        <input type="email" className="form-control" id="con_mail" name="mail" placeholder="Enter Email" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="con_subject" className="form-label">Subject</label>
                        <input type="text" className="form-control" id="con_subject" name="subject" placeholder="Enter Subject" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="con_message" className="form-label">Message</label>
                        <textarea className="form-control" name="message" id="con_message" placeholder="Enter Message" rows="4"></textarea>
                    </div>
                    <button type="button" className="btn btn-light">Submit</button>
                </form>
            </div>
        </>
    )
}
