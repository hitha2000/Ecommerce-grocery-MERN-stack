import React,{useState,useEffect} from 'react'
import Cookie from 'js-cookie'
import { slide as Menu } from 'react-burger-menu'
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';
import {Modal,ModalBody,ModalHeader, Button, Form, FormGroup, Label, Input} from 'reactstrap'
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { createBrowserHistory } from 'history'
import baseurl from '../baseurl'
const history=createBrowserHistory()



function Login(props)
{
    let props1=props
    const [email, setEmail] = useState('');
    const [password , setPassword] = useState('');
    

    const[isEmailValid,setEmailValid]=useState(false)
   

    const [emailerror, setemailerror]= useState('')
  
    let emailRegex = /^\S+@\S+\.\S+$/;
    
    function red()
    {
      props1.history.push('/')
    }

    const [isSuccessOpen2 , setSuccessOpen2] = useState(false);
    function toggleSuccessModal2(prevState) {
        setSuccessOpen2(!isSuccessOpen2)

        setTimeout(()=>
        {
            red();
        },3000)
    }     



    const responsegoogle = (response )=> {// for login response google
        console.log(response)
        console.log(response.accessToken);
        axios({
          method: 'POST',
          url: `http://localhost:5000/users/google`,
          data: { idToken: response.tokenId }
        })
       
          .then(response => {
            console.log('GOOGLE SIGNIN SUCCESS', response);
            Cookie.set('login',JSON.stringify(true))
            Cookie.set('userInfo', JSON.stringify(response.data));
            Cookie.set('modeoflogin',JSON.stringify("google"))
            Cookie.set('userSignin', JSON.stringify(response.data));
             toggleSuccessModal2()
           
           
          })
          .catch(error => {
            console.log('GOOGLE SIGNIN ERROR', error.response);
          });
        }
     
      const responseFacebook = (response) => {
        
            console.log(response);
           
            axios({
              method: 'POST',
              url: "http://localhost:5000/users/facebooklogin",
              data: { response}
            })
              .then(response => {
                console.log('FACEBOOK SIGNIN SUCCESS', response.data);
                
                Cookie.set('login',JSON.stringify(true))
                Cookie.set('modeoflogin',JSON.stringify("facebook"))
                Cookie.set('userInfo', JSON.stringify(response.data));
                Cookie.set('userSignin', JSON.stringify(response.data));
               toggleSuccessModal2()
             
              })
              .catch(error => {
                console.log('FACEBOOK SIGNIN ERROR', error.response);
              });
             
    }


    const formValidation4=(e)=>{
        const emailerror={};
      
        if(!emailRegex.test(email))
        {
            emailerror.notemail="Enter valid email"
            setEmailValid(false)
            setemailerror(emailerror)
        }
        else{
            setEmailValid(true)
            
            emailerror.notemail=""
          
            setemailerror(emailerror)
        }
        
      }


   async function handlelogin(e)
    {
        e.preventDefault();
        
       
        const {data}= await axios.post("http://localhost:5000/users/login", {email,password})
    
        if(data=="Invalid Username and password")
        {
            const emailerror={};
            emailerror.notemail="Invalid Email or Password"
            setemailerror(emailerror)
            
        }
        else
        {
           
            Cookie.set('userInfo', JSON.stringify(data));
            Cookie.set('login',JSON.stringify(true))
            Cookie.set("modeoflogin",JSON.stringify("normal"))
            console.log(data)
            await toggleSuccessModal2()
            
            
           
         }
    
     
      
       
    }
    var signup="SignIn"
 
  var logincoookie=(Cookie.getJSON('login'))||false
  console.log(logincoookie)
  if(logincoookie)
  {
    console.log("bye")
    const logintype=(Cookie.getJSON('modeoflogin'))||''
    if(logintype==="normal")
    {const signup1=(Cookie.getJSON('userInfo'))||{name:"SignIn"}
    signup=signup1.name}

   
    else
    {
      const signup1=(Cookie.getJSON('userInfo'))||{user:{name:"SignIn"}}
      signup=signup1.user.name
    }
  }
  const [isOpen, setSide] = useState(false)
  function handleClick()
  {
    setSide(!isOpen)
  }
  function logout()
{
    localStorage.clear()
    Cookie.remove('userInfo')
    Cookie.remove('modeoflogin')
    Cookie.remove('login')
   // localStorage.setItem('login',JSON.stringify(false))
 
    window.location.reload(false)
    
    
}


   
   
    return(
        <>
          <Menu className="sidebar" isOpen={ isOpen } customBurgerIcon={false}>
    <div className="container">
      <div className="row">
    <div className="col-12 navtop"><div className="row"><div className="offset-1 col-7">{logincoookie?(<p  style={{cursor:"pointer"}}><span className="fa fa-user" style={{marginRight:"2px"}}></span>{signup}</p>):(<p  style={{cursor:"pointer"}}><span className="fa fa-sign-in"></span>Signin</p>)}</div><p onClick={handleClick} className=" col-2 fa fa-arrow-left "style={{cursor:"pointer"}}></p></div></div>
   <div className="side-items">
   <div className="col-12 container"><a href ='/home'className="menu-item row"><span className="fa fa-home fa-lg offset-1 offset-sm-2  offset-lg-2 col-1 p-1"></span><span className="offset-1 offset-sm-2  col-7 col-sm-6">Home</span></a></div> 
   <div className="col-12 container" onClick={()=>setSide(false)}><a href ='#accordian'className="menu-item row"><span className="fa fa-th-large fa-lg offset-1 offset-sm-2 offset-lg-2 col-1 p-1"></span><span className="offset-1 offset-sm-2 col-7 col-sm-6"> Categories</span></a></div> 
   <div className="col-12 container"><a href ='/myorders'className="menu-item row"><span className="fa fa-th-list fa-lg offset-1 offset-sm-2 offset-lg-2 col-1 p-1"></span><span className="offset-1 offset-sm-2 col-7 col-sm-6">  MyOrders</span></a></div> 
   <div className="col-12 container"><a href ='/myaccount'className="menu-item row"><span className="fa fa-user fa-lg offset-1 offset-sm-2 offset-lg-2 col-1 p-1"></span><span className="offset-1 offset-sm-2 col-7 col-sm-6"> MyAccount</span></a></div> 
   <div className="col-12 container"><a href ='/aboutus'className="menu-item row"><span className="fa fa-info fa-lg offset-1 offset-sm-2 offset-lg-2 col-1 p-1"></span><span className="offset-1 offset-sm-2 col-7 col-sm-6"> AboutUs</span></a></div> 
   <div className="col-12 container"><a href ='/developedby'className="menu-item row"><span className="fa fa-connectdevelop fa-lg offset-1 offset-sm-2 offset-lg-2 col-1 p-1"></span><span className="offset-1 offset-sm-2 col-7 col-sm-6"> DevelopedBy</span></a></div> 
   <div className="col-12 container"><a onClick={logout} style={{cursor:"pointer"}} className="menu-item row"><span className="fa fa-sign-out fa-lg offset-1 offset-sm-2 offset-lg-2 col-1 p-1"></span><span className="offset-1 offset-sm-2 col-7 col-sm-6"> LogOut</span></a></div> 

 
   </div>
 </div>
 </div>
</Menu>

<nav className="navbar fixed-top navbar-light bg-dark">
<a className="navbar-brand"  onClick={handleClick}><span className="fa fa-bars fa-lg navicon" style={{color:"white"}}></span>

</a>

<ul className="navbar-nav">
<li className="nav-item col-1 col-lg-5">
 <a className="nav-link" href="/"><img src={`${process.env.PUBLIC_URL}/images/logo.jpg`}style={{width:"2.7rem"},{height:"2.7rem"}}></img>
</a>
</li>
  
</ul>
<span className="nav-item col-7 col-lg-7 font-name">Sri Balaji Stores</span>
</nav>
<div className="form-background">
<div className="container spacingforheader "> 
<div className="row">
    <div className="col-12">bye</div>
    <div className="col-12">        
    ..
    </div>
    <div className="col-12"></div>
    <div className="col-12"></div><div className="col-12"></div>
  
</div>
</div>

        <div className='login-heading'><strong>LOGIN</strong></div>
        
            <Form className='container login-form ' >
                    <FormGroup className='login-input'>
                      
                        <Label   htmlFor='email'><strong> Email</strong> </Label>
                        
                        
                        <input type='email' name='email' id='email' placeholder='Email'  onChange= {(e)=> setEmail(e.target.value)} onBlur={(e)=>formValidation4()}></input>
                        
                        {Object.keys(emailerror).map((key)=>{
                                if(!isEmailValid)
                                return <p style={{color:"red"}}>{emailerror[key]}</p>
                                else
                                return <p></p>
                            })}    
                    </FormGroup>
                    
                    <FormGroup className='login-input'>
                    
                        <Label htmlFor='password'> <strong>Password</strong></Label>
                        
                        
                        <input type='password' name='password' id='password' placeholder='Password' onChange={(e)=> setPassword(e.target.value)} ></input>
                        
                    </FormGroup>
                    <FormGroup className='row'>
                        <Button className='col-10 col-sm-4 ml-3' style={{marginLeft:'1rem'}} type='submit' onClick={(e)=>handlelogin(e)}  color='primary'><span className='fa fa-paper-plane fa-lg' ></span> LOGIN </Button>
                    </FormGroup>
                   
              
<FormGroup className='row'>
                <FacebookLogin 
    appId="316383022969965" 
                            className='col-10 col-sm-4'
    fields="name,email,picture"
    autoLoad={false}
    callback={responseFacebook}
    cssClass="my-facebook-button-class"
    icon=" fa fa-facebook"
    
    
  
     />
     </FormGroup>

     <FormGroup className='row'>
   <GoogleLogin 
        clientId="323182642781-39lt59q309bkj7n90486390v79tt2jip.apps.googleusercontent.com"
        onSuccess={responsegoogle}
        onFailure={responsegoogle}
        render={renderProps => (
          <Button  className='col-10 col-sm-4 google-button'
            onClick={renderProps.onClick}
            disabled={renderProps.disabled}
            style={{marginLeft:'1rem'}}
          ><span className='fa fa-google '></span>
            Login With Google
          </Button>
        )}/> 
      </FormGroup>
  </Form>
  </div>

  <div className="container">
    <Modal className='success-modal' isOpen = {isSuccessOpen2} toggle={toggleSuccessModal2}>
            <ModalHeader toggle={toggleSuccessModal2} className='success-modal-text'> <p><strong></strong></p> </ModalHeader>
            <ModalBody>
                
                    <p>You are successfully logged in!</p>
                    <p><img src={`${process.env.PUBLIC_URL}/images/tick.png`} className="icons" alt="icons"/></p>                                
                
            </ModalBody>
        </Modal>
    </div>    
              
        </>
    )
}
export default Login