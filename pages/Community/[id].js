import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Head from 'next/head';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { parseCookies } from 'nookies';
import jwt from 'jsonwebtoken';


const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        width: '96%',
    },
    paper: {
        marginTop: theme.spacing(5),
        marginBottom: theme.spacing(6),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    }
}));

export default function SignUp({ token, data, user_role, user_id }) {

    const router = useRouter()
    const classes = useStyles();
    const [values, setValue] = useState({
        firstName: data.u_fname,
        lastName: data.u_sname,
        password: "",
        email: data.u_email,
        user_select: data.u_role,
        picture: ""
    });


    const ChangeValue = (e) => {
        if (e.target.type === 'file') {
            let key = e.target.name;
            let val = document.getElementById("profile_img").files[0];
            setValue((preval) => {
                return {
                    ...preval,
                    [key]: val
                }
            })
        } else {
            let key = e.target.name;
            let val = e.target.value;
            setValue((preval) => {
                return {
                    ...preval,
                    [key]: val
                }
            })
        }
    }


    const UpdateRecord = (e) => {
        e.preventDefault();
        var form = new FormData();

        form.append('u_fname', values.firstName);
        form.append('u_sname', values.lastName);
        form.append('u_email', values.email);
        form.append('u_role', values.user_select);
        form.append('u_password', values.password);
        form.append('u_image', values.picture);

        fetch(`${process.env.HOST_URL}/api/user/updateData/${user_id}`, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: form
        }).then(res => res.json())
            .then(data => {
                router.push('/Community');
            }).catch(err => {
                console.log(err);
            })


    }

    return (
        <>
            <Head>
                <title>Update Data</title>
            </Head>
            <Container data-aos="fade-up" data-aos-anchor-placement="center-bottom" component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    <Typography component="h2" variant="h3">
                        Update Data
                    </Typography>
                    <form className={classes.form} noValidate>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="fname"
                                    name="firstName"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="First Name"
                                    onChange={ChangeValue}
                                    value={values.firstName}
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="lastName"
                                    label="Last Name"
                                    name="lastName"
                                    onChange={ChangeValue}
                                    autoComplete="lname"
                                    value={values.lastName}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    onChange={ChangeValue}
                                    autoComplete="email"
                                    value={values.email}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    onChange={ChangeValue}
                                    autoComplete="current-password"
                                    value={values.password}
                                />
                            </Grid>

                            {(user_role === "root") ? <><Grid item xs={12}>
                                <input name="picture" className={`form-control`} value={values.picture.fileName} type="file" id="profile_img" onChange={ChangeValue} />
                            </Grid>
                                <Grid xs={12}>
                                    <FormControl variant="outlined" className={classes.formControl}>
                                        <InputLabel id="demo-simple-select-outlined-label">Select Role</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-outlined-label"
                                            id="demo-simple-select-outlined"
                                            label="Select Role"
                                            name="user_select"
                                            onChange={ChangeValue}
                                            value={values.user_select}
                                        >
                                            <MenuItem value="User">User</MenuItem>
                                            <MenuItem value="Admin">Admin</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid></>
                                : null}

                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={UpdateRecord}
                        >
                            Update Data
          </Button>
                    </form>
                </div>
            </Container>
        </>
    );
}



export async function getServerSideProps(ctx) {
    const { token } = parseCookies(ctx);
    let user = jwt.decode(token);
    let user_role = (user) ? user.u_role : "";
    let user_id = ctx.params.id;
    if (!token) {
        const { res } = ctx
        res.writeHead(302, { Location: "/" })
        res.end()
        return {
            props: {}
        }
    } else {
        const res = await fetch(`${process.env.HOST_URL}/api/user/getData/${user_id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        const data = await res.json()
        return {
            props: { token, data, user_role, user_id }
        }
    }
}