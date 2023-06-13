const router = require('express').Router();
const User = require('../models/User');

// creating user
router.post('/', async(req, res)=> {
  try {
    const {name, email, password, picture} = req.body;
    console.log(req.body);
    const currUser = await User.create({name, email, password, picture});
    res.status(201).json(currUser);
  } catch (error) {
    let msg;
    if(error.code !=11000){
        msg = e.message;
      
    } else {
        msg = "User already exists"
      
    }
    console.log(error);
    res.status(400).json(msg)
  }
})

// login user

router.post('/login', async(req, res)=> {
  try {
    const {email, password} = req.body;
    const currUser = await User.findByCredentials(email, password);
    currUser.status = 'online';
    await currUser.save();
    res.status(200).json(currUser);
  } catch (error) {
      res.status(400).json(error.message)
  }
})


module.exports = router
