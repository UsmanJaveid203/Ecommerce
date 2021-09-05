import Rootprofile from '../../../public/styles/MainProfile.module.css';
import Link from 'next/link';
import { useState } from 'react';
import FormData from 'form-data';


export default function index(props) {
    const [picture, setPicture] = new useState("");

    const [information, setInformation] = new useState(props.data);

    const ImageChangeHandler = (e) => {
        let val = document.getElementById("profile_img").files[0];
        setPicture(val)
    }


    const UpdateHandeler = (e) => {
        e.preventDefault();
        var form = new FormData();
        form.append('u_image', picture);
        fetch(`${process.env.HOST_URL}/api/user/updateData/${props.data._id}`, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${props.token}`
            },
            body: form
        })
            .then(res => res.json())
            .then(data => {
                setInformation(data);
            })
            .catch(err => {
                console.log(err);
            })

    }

    return (

        <div className="row">
            <div className={`col-md-4 col-12 text-center ${Rootprofile.img_div}`}>
                {(information.u_image) ? <img src={`/images/${information.u_image}`} className="img-thumbnail" alt="product_photo" />
                    : <img src={`/images/profile_img.png`} className="img-thumbnail" alt="product_photo" />
                }
            </div>
            <div className={`col-md-8 col-12 ${Rootprofile.detail_div}`}>
                <h1><strong>Name : </strong> {information.u_fname} {information.u_sname}</h1>
                <h3><strong>Email : </strong> {information.u_email}</h3>
                <p><strong>User Role : </strong> {information.u_role}</p>

                <div className={`input-group my-3`}>
                    <div className={`custom-file`}>
                        <input name="picture" className={`form-control ${Rootprofile.input}`} value={picture.fileName} type="file" id="profile_img" onChange={ImageChangeHandler} />
                    </div>
                </div>


                <div className={Rootprofile.button}>
                    <button type="button" className={`btn ${Rootprofile.btnn}`} onClick={UpdateHandeler}>Upload <i className="fa fa-upload"></i></button>
                    <Link href={`/Profile/${information._id}`}>
                        <a type="button" className={`btn ${Rootprofile.btnn}`}>Edit <i className="fas fa-edit"></i></a>
                    </Link>
                    <button type="button" className={`btn ${Rootprofile.btnn}`} onClick={props.DeleteHandler}>Delete <i className="fa fa-trash"></i></button>
                </div>
            </div>
        </div>
    )
}