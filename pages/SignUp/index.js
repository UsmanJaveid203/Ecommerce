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
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { parseCookies } from 'nookies';
import Home from '../index';


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

export default function SignUp() {
  const { token } = parseCookies();
  const router = useRouter()
  if (!token) {
    const classes = useStyles();
    const [values, setValue] = useState({
      firstName: "",
      lastName: "",
      password: "",
      email: "",
      address: "",
      user_select: ""
    });

    const [message, setMessage] = useState("");

    const ChangeValue = (e) => {
      let key = e.target.name;
      let val = e.target.value;
      setValue((preval) => {
        return {
          ...preval,
          [key]: val
        }
      })
    } 


    const UploadRecord = (e) => { 
      e.preventDefault();
      fetch(`${process.env.HOST_URL}/api/user/singup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          u_fname: values.firstName,
          u_sname: values.lastName,
          u_email: values.email,
          u_password: values.password,
          u_address: values.address,
          u_role: values.user_select
        })
      }).then(res => res.json())
        .then(data => {
          setTimeout(() => {
            setMessage("");
          }, 2000)
          setMessage(data.msg);
        }).catch(err => {
          console.log(err);
        })
    }

    return (
      <>
        <Head>
          <title>Create Account</title>
        </Head>
        <Container data-aos="fade-up" data-aos-anchor-placement="center-bottom" component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
          {message ? <div className="alert alert-dark my-3" role="alert">{message}</div> : ""}
            <Typography component="h2" variant="h3">
              Create Account
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
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="addressName"
                    label="Enter Address"
                    name="address"
                    onChange={ChangeValue}
                    autoComplete="lname"
                    value={values.address}
                  />
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
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={UploadRecord}
              >
                Sign Up
          </Button>
              <Grid container justify="flex-end">
                <Grid item>
                  <Link href="../SignIn" variant="body2">
                    <a>Already have an account? Sign in</a>
                  </Link>
                </Grid>
              </Grid>
            </form>
          </div>
        </Container>
      </>
    );
  } else {
    router.push('/');
    return <Home/>
  }
}