import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';

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
  title: {
    fontSize: '48px',
    fontWeight: 'bold',
    marginBottom: theme.spacing(2),
    textAlign: 'center',
  },
  subtitle: {
    fontSize: '24px',
    marginBottom: theme.spacing(4),
    textAlign: 'center',
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
  icon: {
    marginLeft: theme.spacing(1),
  },
}));

const Home = () => {
  const classes = useStyles();

  return (
    
    <Grid container className={classes.root}>
        
      <Grid item md={6} className={classes.content}>
        <Typography variant="h1" className={classes.title}>
          Share the world with your friends 
        </Typography>
        <Typography variant="h2" className={classes.subtitle}>
          Chat App lets you connect with the world
        </Typography>
        <Link to="/chat" className={classes.link}>
          <Button variant="contained" className={classes.button}>
            Get Started
            <ChatBubbleIcon className={classes.icon} />
          </Button>
        </Link>
      </Grid>
      <Grid item md={6} className={classes.bg}></Grid>
    </Grid>
  );
};

export default Home;
