import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/router';
import cookie from 'js-cookie'
import { parseCookies } from 'nookies';
import Home from '../index';


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(6),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn() {
  const { token } = parseCookies();
  const router = useRouter();

  if (!token) {

    const classes = useStyles();

    const [values, setValue] = useState({
      password: "",
      email: "",
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
      fetch(`${process.env.HOST_URL}/api/user/singin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          u_email: values.email,
          u_password: values.password
        })
      }).then(res => res.json())
        .then(data => {
          if (data.type) {
            setMessage(data.msg);
            setTimeout(() => {
              setMessage("");
            }, 2000)
            router.push(data.path);
          } else {
            setMessage(data.msg);
            setTimeout(() => {
              setMessage("");
            }, 2000)
          }
        })
        .catch(err => {
          console.log(err);
        })
    }



    return (
      <>
        <Head>
          <title>Sign In</title>
        </Head>
        <Container data-aos="fade-up" data-aos-anchor-placement="center-bottom" component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
            {message ? <div className="alert alert-dark my-3" role="alert">{message}</div> : ""}
            <Typography component="h2" variant="h3">
              Sign in
        </Typography>
            <form className={classes.form} noValidate>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                value={values.email}
                autoComplete="email"
                onChange={ChangeValue}
                autoFocus
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                value={values.password}
                label="Password"
                type="password"
                id="password"
                onChange={ChangeValue}
                autoComplete="current-password"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={UploadRecord}
              >
                Sign In
          </Button>
              <Grid container>
                <Grid item>
                  <Link href="../SignUp" variant="body2">
                    <a>{"Don't have an account? Sign Up"}</a>
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
    return <Home />
  }
}
