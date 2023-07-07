import React, {  useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import { AppContext } from '../myContext/myContext';
import { useLoginUserMutation } from '../services/appApi';
import  { useContext, useEffect } from "react";

const useStyles = makeStyles((theme) => ({
  root: {




    
    flexGrow: 1,
    height: '100vh',
  },
  bg: {
    backgroundImage: 'url("/path/to/image.jpg")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing(4),
  },
  form: {
    width: '80%',
    maxWidth: 500,
    marginBottom: theme.spacing(4),
  },
  title: {
    fontSize: '48px',
    fontWeight: 'bold',
    marginBottom: theme.spacing(2),
    textAlign: 'center',
  },
  label: {
    fontSize: '18px',
    fontWeight: 'bold',
    marginBottom: theme.spacing(1),
  },
  input: {
    marginBottom: theme.spacing(2),
  },
  button: {
    color: '#fff',
    backgroundColor: '#3b5998',
    borderRadius: '30px',
    padding: theme.spacing(2, 4),
    transition: 'background-color 0.3s ease-in-out',
    '&:hover': {
      backgroundColor: '#2d4373',
    },
  },
  link: {
    color: '#3b5998',
    textDecoration: 'none',
    transition: 'color 0.3s ease-in-out',
    '&:hover': {
      color: '#2d4373',
    },
  },
}));

const Login = () => {
  const classes = useStyles();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [LoginUser, { isLoading, error }] = useLoginUserMutation();
  const navigate = useNavigate();


  const { socket } = useContext(AppContext);


  const handleLogin = (e) => {
    e.preventDefault();

    LoginUser({ email, password }).then(({ data }) => {
      if (data) {
          // socket work
          socket.emit("new-user");
          // navigate to the chat
          navigate("/chat");
      }
  });
    
  };



  
  

  return (
    <Container className={classes.root}>
      <Grid container>
   
        <Grid item md={5} className={classes.bg}></Grid>
        <Grid item md={7} className={classes.content}>
          <Typography variant="h1" className={classes.title}>
            Login
          </Typography>

          {error && <Typography variant="body1" color="error">{error.data}</Typography>}
          <form className={classes.form} onSubmit={handleLogin}>
           
            <label className={classes.label}>Email address</label>
            <TextField
              type="email"
              placeholder="Enter email"
              variant="outlined"
              fullWidth
              className={classes.input}
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
            />
            <label className={classes.label}>Password</label>
            <TextField
              type="password"
              placeholder="Password"
              variant="outlined"
              fullWidth
              className={classes.input}
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
            />
            <Button variant="contained" color="primary" type="submit" className={classes.button}>
              {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Login'}
              
              
            </Button>
          </form>
          <div>
            <Typography variant="subtitle1">
              Don't have an account? <Link to="/signup" className={classes.link}>Signup</Link>
            </Typography>
          </div>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Login;
