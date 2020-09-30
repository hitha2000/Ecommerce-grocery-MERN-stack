var express = require('express');
var Users = require('../models/user');
const fetch = require("node-fetch");
const {getToken, isAdmin}=require('../authenticate')
const {isAuth}= require('../authenticate')
var passport = require('passport');
var authenticate = require('../authenticate');
const facebookController=require('../authenticate')
const axios =require('axios');
const config =require('../config');
const { OAuth2Client } = require('google-auth-library');
const bcrypt = require('bcryptjs');

const router = express.Router();

/*router.post('/signin', async (req, res) => {
  const signinUser = new Users({
    email: req.body.email,
    password: req.body.password,
  
  });
  
  console.log(req.body)
  const newsignin=await signinUser.save()
  console.log(newsignin)
  if (newsignin) {
    res.send(JSON.stringify({
      _id: newsignin.id,
      email: newsignin.email,
      isAdmin: newsignin.isAdmin,
      token: getToken(signinUser),
    }));

  } else {
    res.status(401).send({ message: 'Invalid Email or Password.' });
  }
});
*/
router.put('/signin',isAuth, async (req, res) => {
  const userId = req.body.userid;
  console.log(userId)
  const user = await Users.findById(userId);
  if (user) {
    //user.name = req.body.name || user.name;
    //user.email = req.body.email || user.email;
    //user.password = req.body.password || user.password;
    user.name = req.body.name;
    user.phone = req.body.phone;
    user.address = req.body.address;
  
    const updatedUser = await user.save();
    res.send({
      _id: updatedUser.id,
      name: updatedUser.name,
      phone: updatedUser.phone,
      address: updatedUser.address,
      custId: updatedUser.custId,
     token: getToken(updatedUser),
    });
  } else {
    res.status(404).send({ message: 'User Not Found' });
  }
});






router.post('/signin', async (req, res) => {
 

 let hash=""
 try
 {
   hash=await bcrypt.hash(req.body.password,10);
 
  console.log(hash)
 }

 catch(error)
 {
   console.log("error")
 }
  const signinUser = new Users({
    email: req.body.email,
    password: hash,
  
  });
  
  console.log(req.body)
  const newsignin=await signinUser.save()
  console.log(newsignin)
  if (newsignin) {
    res.send(JSON.stringify({
      _id: newsignin.id,
      email: newsignin.email,
      isAdmin: newsignin.isAdmin,
      token: getToken(signinUser),
    }));

  } else {
    res.status(401).send({ message: 'Invalid Email or Password.' });
  }
});





/*router.post('/login', async (req, res) => {


  
    const loginUser = await Users.findOne({
      email: req.body.email,
      password: req.body.password,
    });
    if (loginUser) {
      res.send(JSON.stringify({
        _id: loginUser.id,
        name: loginUser.name,
        email: loginUser.email,
        isAdmin: loginUser.isAdmin,
       token: getToken(loginUser),
      }));
    } else {
     // res.status(401).send({ message: 'Invalid Email or Password.' });
      res.send("Invalid Username and password");
    }
  });
// to get the list of all users.
  router.get('/allusers', async(req,res,next) => {
    
      
    try{
 
        const user = await Users.find({})
   
        res.send({user});
    }
    catch(error) {
     res.status(404).json({ message: 'User Not Found.' });
    }
  })

// to get the individual user details
  router.get('/user', async(req,res,next) => {
    const name = req.query.name ? { custId: req.query.name } : {};
      
      try{
   
          const user = await Users.find({custId:100})
          console.log(user)
          res.send({user});
      }
      catch(error) {
       res.status(404).json({ message: 'User Not Found.' });
      }
   
   });*/

   router.post('/login', async (req, res) => {

    hash=await bcrypt.hash(req.body.password,10);
 
  
    const loginUser = await Users.findOne({
      email: req.body.email,
    
    });
   
  if(loginUser)
    {
      let pass=await bcrypt.compare(req.body.password,loginUser.password);
      if (pass) {
      res.send(JSON.stringify({
        _id: loginUser.id,
        name: loginUser.name,
        email: loginUser.email,
        isAdmin: loginUser.isAdmin,
       token: getToken(loginUser),
      }));
    } else {
     // res.status(401).send({ message: 'Invalid Email or Password.' });
      res.send("Invalid Username and password");
    }
  }
  else
  {
    res.send("Invalid Username and password");
  }
  });


// to get the list of all users.
  router.get('/allusers', async(req,res,next) => {
    
      
    try{
 
        const user = await Users.find({})
   
        res.send({user});
    }
    catch(error) {
     res.status(404).json({ message: 'User Not Found.' });
    }
  })

// to get the individual user details
  router.get('/user', async(req,res,next) => {
    const name = req.query.name ? { custId: req.query.name } : {};
      
      try{
   
          const user = await Users.find({custId:100})
          console.log(user)
          res.send({user});
      }
      catch(error) {
       res.status(404).json({ message: 'User Not Found.' });
      }
   
   });

 
  
router.get('/createadmin', async (req, res) => {

  hash=await bcrypt.hash("admin",10);
  try {
    const user = new Users({
      name: 'Suhas',
      email: 'gpsuhas20@gmail.com',
      password: hash,
      isAdmin: true,
      custId: '100',
      phone: '8050611039',
      address: '#20 bangalore'
    });
    const newUser = await user.save();
    res.send(newUser);
  } catch (error) {
    res.send({ message: error.message });
  }
});

router.get('/userinfo',async(req,res)=>
{
  try
  {
   
    const user=await Users.find({email:req.query.email})

   res.send([{
      name: user[0].name,
      email: user[0].email,
      custId: user[0].custId,
      phone: user[0].phone,
      address: user[0].address
    }])
  }
  catch(error)
    {
      res.send("no users")

    }})


    router.get('/address',async(req,res)=>
    {
      try
      {
       
        const user=await Users.find({email:req.query.email})
    
       res.send([{
         address: user[0].address
        }])
      }
      catch(error)
        {
          res.send("no users")
    
        }})
    



router.put('/password', async(req, res) => {


  
      var user=await Users.find({email:req.body.params.email})
    
       
    if(user){ 
      user[0].password = req.body.data.password
    
      const updatedUser= await user[0].save();
      console.log(updatedUser)
      res.send(updatedUser);
      
      }
       else{
        res.send("no users")
      }
    
})

router.put('/address', async(req, res) => {


  
  var user=await Users.find({email:req.body.params.email})

   
if(user){ 
  user[0].address = req.body.data.address

  const updatedUser= await user[0].save();
  console.log(updatedUser)
  res.send(updatedUser);
  
  }
   else{
    res.send("no users")
  }

})






router.post('/facebooklogin',async (req, res) => {
  console.log('FACEBOOK LOGIN REQ BODY', req.body);
 
  const userID=req.body.response.userID;
  const accessToken=req.body.response.accessToken;
  //console.log(userID +accessToken)

  const url = `https://graph.facebook.com/v8.0/${userID}/?fields=id,name,email&access_token=${accessToken}`;
  

/*try{
  var response= await axios.get(url)
console.log("respnse"+response)
 
 const user=await Users.findOne({ email })
    if (user) {
    var  token= getToken(user)
     console.log("user"+user)
      const { _id, email, name} = user;
      res.json({
        token,
        user: { _id, email, name}
      });
    } else {
      let password = email + config.JWT_SECRET;
     
      user = new Users({ name, email, password });
      const newUser= user.save();
      if(newUser)
      {
        res.send(newUser)
      }
      else
      {
        res.status(404).send({ message: 'login failed' });
      }

    }
        
}
catch(error)
{
  res.json({
    error: 'Facebook login failed. Try later'
  });
}
});*/
fetch(url, {
  method: 'GET'
})
  .then(response => response.json())
   //.then(response => console.log("respone"+response))
   .then(response => {
   console.log("hi")
    const {email}=response;
    const {name}=response;
    console.log(email+name)
    Users.findOne({ email }).exec((err, user) => {
      if (user) {
        console.log("user"+user)
        const token = getToken({ _id: user._id })
        const { _id, email, name} = user;
        return res.json({
          token,
          user: { _id, email, name }
        });
      } else {
        let password = email + config.JWT_SECRET;
        user = new Users({ name, email, password });
        user.save((err, data) => {
          if (err) {
            console.log('ERROR FACEBOOK LOGIN ON USER SAVE', err);
            return res.status(400).json({
              error: 'User signup failed with facebook'
            });
          }
          console.log("data"+data)
          const token = getToken(  { _id: data._id })
          const { _id, email, name} = data;
          return res.json({
            token,
            user: { _id, email, name }
          });
        });
      }
    });
  })
  .catch(error => {
    res.json({
      error: 'Facebook login failed. Try later'
    });
  })
})


/// google


const client = new OAuth2Client("323182642781-39lt59q309bkj7n90486390v79tt2jip.apps.googleusercontent.com");
// Google Login


const googleController = (req, res) => {
  const { idToken } = req.body;

  client
    .verifyIdToken({ idToken, audience: "323182642781-39lt59q309bkj7n90486390v79tt2jip.apps.googleusercontent.com" })
    .then(response => {
      console.log('GOOGLE LOGIN RESPONSE',response)
      const { email_verified, name, email } = response.payload;
      if (email_verified) {
        Users.findOne({ email }).exec((err, user) => {
          if (user) {
            const token = getToken({ _id: user._id })
            const { _id, email, name } = user;
            return res.json({
              token,
              user: { _id, email, name }
            });
          } else {
            let password = email + config.JWT_SECRET;
            user = new Users({ name, email, password });
            user.save((err, data) => {
              if (err) {
                console.log('ERROR GOOGLE LOGIN ON USER SAVE', err);
                return res.status(400).json({
                  error: 'User signup failed with google'
                });
              }
              const token = getToken( { _id: data._id })
              const { _id, email, name} = data;
              return res.json({
                token,
                user: { _id, email, name }
              });
            });
          }
        });
      } else {
        return res.status(400).json({
          error: 'Google login failed. Try again'
        });
      }
    });
};

router.post('/google', googleController)








module.exports=router;
