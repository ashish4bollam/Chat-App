import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { useSignupUserMutation } from '../services/appApi';
import dummyImg from '../assests/dummyImg.jpg'






const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      height: '100vh',
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
    profilePicContainer: {
      position: 'relative',
      width: '100%',
      height: '200px',
      marginBottom: theme.spacing(2),
    },
    profilePic: {
      width: '33%',
      height: '90%',
      objectFit: 'cover',
      borderRadius: '50%',
     
    },
    uploadIcon: {
      position: 'absolute',
      bottom: '0',
      right: '0',
      backgroundColor: '#fff',
      borderRadius: '50%',
      padding: theme.spacing(1),
      cursor: 'pointer',
      transition: 'background-color 0.3s ease-in-out',
      '&:hover': {
        backgroundColor: '#f1f1f1',
      },
    },
    hiddenInput: {
      display: 'none',
    },
  }));


function SignUp() {

    const classes = useStyles();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [signupUser, { isLoading, error }] = useSignupUserMutation();
    const navigate = useNavigate();
    //image upload states
    const [image, setImage] = useState(null);
    const [uploadingImg, setUploadingImg] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);

    function validateImg(e) {
        const file = e.target.files[0];
        if (file.size >= 1048576) {
            return alert("Max file size is 1mb");
        } else {
            setImage(file);
            setImagePreview(URL.createObjectURL(file));
        }
    }

    async function uploadImage() {
        const data = new FormData();
        data.append("file", image);
        data.append("upload_preset", "your-key");
        try {

            setUploadingImg(true);
            let res = await fetch("https://api.cloudinary.com/v1_1/driorrz12/image/upload", {
                method: "post",
                body: data,
            });
            const urlData = await res.json();
            setUploadingImg(false);
            return urlData.url;
        } catch (error) {
            setUploadingImg(false);
            console.log(error);
        }
    }

    async function handleSignup(e) {
        e.preventDefault();
        if (!image) return alert("Please upload your profile picture");
    
        const url = await uploadImage(image);
        // console.log(url);
        // signup the user
        signupUser({ name, email, password, picture: url }).then(({ data }) => {
          console.log(data);
            if (data) {
                console.log(data);
                navigate("/chat");
            }
        });

        console.log(name);
        console.log(email);
        console.log(password);
    }

   

    return (
        <Container className={classes.root}>
        <Grid container>
          <Grid item md={7}>
            <div className={classes.content}>
              <form className={classes.form} onSubmit={handleSignup}>
                <Typography variant="h1" className={classes.title}>Create account</Typography>
                <div className={classes.profilePicContainer}>
                  <img src={imagePreview || dummyImg} alt="profile pic" className={classes.profilePic} />
                  <label htmlFor="image-upload" className={classes.uploadIcon}>
                    <CloudUploadIcon />
                  </label>
                  <input type="file" id="image-upload" className={classes.hiddenInput} accept="image/png, image/jpeg" onChange={validateImg} />
                </div>
                {error && <Typography variant="body1" color="error">{error.data}</Typography>}
                <TextField id="name" label="Name" variant="outlined" fullWidth className={classes.input} value={name}  onChange={(e) => setName(e.target.value)} />
                <TextField id="email" label="Email" variant="outlined" fullWidth className={classes.input} value={email}  onChange={(e) => setEmail(e.target.value)} />
                <TextField id="password" label="Password" variant="outlined" fullWidth className={classes.input} value={password} onChange={(e) => setPassword(e.target.value)}type="password" />
                <Button variant="contained" color="primary" type="submit" className={classes.button} >
                  {uploadingImg || isLoading ? <CircularProgress size={24} color="inherit" /> : 'Signup'}
                
                </Button>
                <div className="py-4">
                  <Typography variant="body1" className="text-center">
                    Already have an account? <Link to="/login" className={classes.link}>Login</Link>
                  </Typography>
                </div>
              </form>
            </div>
          </Grid>
          <Grid item md={5} className={classes.bg}></Grid>
        </Grid>
      </Container>
       
    );
}

export default SignUp;