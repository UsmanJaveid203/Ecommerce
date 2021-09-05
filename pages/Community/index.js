import Sidebar from '../components/SideMenu';
import { withStyles } from '@material-ui/core/styles';
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import CommunityStyle from '../../public/styles/Community.module.css';
import { parseCookies } from 'nookies';
import jwt from 'jsonwebtoken';
import { useState } from 'react'
import Pagination from '../components/Pagination';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Accordion = withStyles({
    root: {
        border: '1px solid rgba(0, 0, 0, .125)',
        boxShadow: 'none',
        '&:not(:last-child)': {
            borderBottom: 0,
        },
        '&:before': {
            display: 'none',
        },
        '&$expanded': {
            margin: 'auto',
        },
    },
    expanded: {},
})(MuiAccordion);

const AccordionSummary = withStyles({
    root: {
        backgroundColor: 'rgba(0, 0, 0, .03)',
        borderBottom: '1px solid rgba(0, 0, 0, .125)',
        marginBottom: -1,
        minHeight: 56,
        '&$expanded': {
            minHeight: 56,
        },
    },
    content: {
        '&$expanded': {
            margin: '12px 0',
        },
    },
    expanded: {},
})(MuiAccordionSummary);

const AccordionDetails = withStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiAccordionDetails);



export default function index({ user_role, token, result }) {

    const [values, setValues] = new useState(null);
    const router = useRouter();

    const DeleteHandler = (user_id) => {

        fetch(`https://ecommerce-203.herokuapp.com/api/user/delteData/${user_id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then(res => res.json())
            .then(data => {
                router.push('/Community')
            })
            .catch(err => {
                console.log(err);
            })
    }

    const changeValueHanler = (number) => {
        fetch(`https://ecommerce-203.herokuapp.com/api/user/getAllData/${number}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
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

    if (token || user_role === "root") {
        const [expanded, setExpanded] = React.useState('panel1');

        const handleChange = (panel) => (event, newExpanded) => {
            setExpanded(newExpanded ? panel : false);
        };

        return (
            <React.Fragment>
                <div className="row">
                    <Sidebar />
                    <div className={`col-lg-8 col-12`}>
                        <div className={`container my-5 ${CommunityStyle.MainDiv}`}>
                            <h1 className={`${CommunityStyle.mainHead}`}>All User</h1>
                            {(results?.data?.length !== 0) ? <>
                                {results?.data?.map((u_values) => {
                                    return <Accordion square expanded={expanded === u_values._id} onChange={handleChange(u_values._id)}>
                                        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                                            <Typography className={`${CommunityStyle.SmallHead}`}><strong>Name : </strong>{u_values.u_fname} {u_values.u_sname}</Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <Typography className={CommunityStyle.detail_main_duv}>
                                                <div className="row">
                                                    <div className={`col-md-3 ${CommunityStyle.photo}`}>
                                                        {(u_values.u_image) ? <img src={`/images/${u_values.u_image}`} className="rounded float-start" alt="User_Photo" />
                                                            : <img src={`/images/profile_img.png`} className="rounded float-start" alt="User_Photo" />}
                                                    </div>
                                                    <div className={`col-md-6 ${CommunityStyle.user_detail}`}>
                                                        <h3><strong>Name  : </strong>{u_values.u_fname} {u_values.u_sname}</h3>
                                                        <h3><strong>Gmail : </strong>{u_values.u_email}</h3>
                                                        <h3><strong>Role    : </strong>{u_values.u_role}</h3>

                                                        <div className={CommunityStyle.button}>
                                                            <Link href={`/Community/${u_values._id}`}>
                                                                <a type="button" className={`btn ${CommunityStyle.btnn}`}>Edit <i className="fas fa-edit"></i></a>
                                                            </Link>
                                                            <button type="button" className={`btn ${CommunityStyle.btnn}`} onClick={DeleteHandler.bind(this, u_values._id)}>Delete <i className="fas fa-trash"></i></button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Typography>
                                        </AccordionDetails>
                                    </Accordion>
                                })}
                                <Pagination result={results} changeHandler={changeValueHanler} />
                            </> : <div className={CommunityStyle.No_record_div}>
                                    <h1>Not found any user</h1>
                                </div>}
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export async function getServerSideProps(ctx) {
    const { token } = parseCookies(ctx);
    let user = jwt.decode(token);
    let user_role = (user) ? user.u_role : "";

    if (!token || user_role === "Admin" || user_role === "User") {
        const { res } = ctx
        res.writeHead(302, { Location: "/" })
        res.end()
        return {
            props: {}
        }
    } else {
        let res = await fetch(`https://ecommerce-203.herokuapp.com/api/user/getAllData`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        let result = await res.json();
        return {
            props: { user_role, token, result }
        }
    }
}