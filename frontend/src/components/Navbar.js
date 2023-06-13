import React from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import { useLogoutUserMutation } from '../services/appApi';
import { useSelector } from 'react-redux';
import { Button } from '@material-ui/core';




const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: '#3b5998',
    color: '#fff',
    boxShadow: 'none',
    borderBottom: '1px solid #ddd',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    textDecoration: 'none',
    color: '#fff',
    fontSize: '24px',
    fontWeight: 'bold',
    display: 'flex',
    alignItems: 'center',
    padding: '16px',
    marginLeft: '-16px',
  },
  icon: {
    marginRight: theme.spacing(1),
    fontSize: '32px',
  },
  link: {
    marginLeft: theme.spacing(4),
    textDecoration: 'none',
    color: '#fff',
    transition: 'color 0.3s ease-in-out',
    '&:hover': {
      color: '#ddd',
    },
  },

}));

const Navig = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const currUser = useSelector((state) => state.user);
  const user = useSelector((state) => state.user);
    const [logoutUser] = useLogoutUserMutation();
    async function handleLogout(e) {
        e.preventDefault();
        await logoutUser(user);
        // redirect to home page
        
        navigate("/");
    }
   
    

  
  return (
    <AppBar position="static" className={classes.appBar}>
      <Toolbar>
        <Link to="/" className={classes.logo}>
          <ChatBubbleOutlineIcon className={classes.icon} />
          <PersonOutlineIcon className={classes.icon} />
          <Typography variant="h6">
            CHAT
          </Typography>
        </Link>
        <div>
        {!user && (<Link to="/login" className={classes.link}>
            Login
          </Link>)
       }
          <Link to="/chat" className={classes.link}>
            Chat
          </Link>
         {!user && ( <Link to="/signup" className={classes.link}>
            SignUp
          </Link>) }

          {user  && (<Link to='/' onClick={handleLogout} className={classes.link}>Logout</Link>)}
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navig;
