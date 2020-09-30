import React,{useState,useEffect} from 'react'
import Cookie from 'js-cookie'
import { createBrowserHistory } from 'history'
import { slide as Menu } from 'react-burger-menu'

import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';
import {Modal,ModalBody,ModalHeader, Button, Form, FormGroup, Label, Input} from 'reactstrap'
import axios from 'axios';

const history=createBrowserHistory()
function Signup(props)
{
    let props1=props
    const re = /^[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-/\s.]?[0-9]{4}$/;
    let emailRegex = /^\S+@\S+\.\S+$/;

    /*let isEmailValid2=false;
    let isPasswordValid2=false;
    let isRepasswordValid2=false;*/

    const [isSuccessOpen3 , setSuccessOpen3] = useState(false);
    function toggleSuccessModal3(prevState) {
        setSuccessOpen3(!isSuccessOpen3)
    }    

    const[ isEmailValid2,setemailValid2]=useState(false)
    const[ isPasswordValid2,setpasswordValid2]=useState(false)
    const[ isRepasswordValid2,setrepasswordValid2]=useState(false)

    const [emailerror2, setemailerror2]= useState('')
const [passworderror2, setpassworderror2]= useState({})
const [repassworderror2, setrepassworderror2]= useState({})

const [isSuccessOpen1, setSuccessOpen1] = useState(false);
    const [email2, setEmail2] = useState('');
    const [password2 , setPassword2] = useState('');
    const [repassword2 , setRepassword2] = useState('');

    function red()
    {
      props1.history.push('/customerinfo')
    }

    const [isSuccessOpen2 , setSuccessOpen2] = useState(false);
    function toggleSuccessModal3(prevState) {
        setSuccessOpen3(!isSuccessOpen3)

        setTimeout(()=>
        {
            red();
        },3000)
    }     

    function redirectlogin()
  {
    props1.history.push('/login')
  }
    const formValidation6=(e)=>{
        const emailerror2={};
      
        if(!emailRegex.test(email2))
        {
            emailerror2.notemail2="Enter valid email"
           setemailValid2(false)
            setemailerror2(emailerror2)
        }
        else{
            setemailValid2(true)

            emailerror2.notemail2=""
           
            setemailerror2(emailerror2)
        }
        
      }
      
      const formValidation7=(e)=>{
        const passworderror2={};
      
        if(password2.trim().length<=6)
        {
            passworderror2.notpassword2="Password should be more than 6 characters"
            setpasswordValid2(false)
            setpassworderror2(passworderror2)
        }
        else{
            
            setpasswordValid2(true)
            
            passworderror2.notpassword2=""
         
            setpassworderror2(passworderror2)
        }
        
      }
      const formValidation8=()=>{
        const repassworderror2={};
      
        if(password2!=repassword2)
        {
            repassworderror2.notrepassword2="Password does not match the above password"
            setrepasswordValid2(false)
            setrepassworderror2(repassworderror2)
        }
        else{
           
            repassworderror2.notrepassword2=""
            setrepasswordValid2(true)
            setrepassworderror2(repassworderror2)
        }
        
      }
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    const responsegooglesignup = (response )=> {// for signupresponse google
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
            toggleSuccessModal3()
           
           
          })
          .catch(error => {
            console.log('GOOGLE SIGNIN ERROR', error.response);
          });
        }
     
      const responseFacebooksignup = (response) => {
        
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
              
                toggleSuccessModal3()
              })
              .catch(error => {
                console.log('FACEBOOK SIGNIN ERROR', error.response);
              });
             
    }
    

   async function handleSignup(e)
   {
    e.preventDefault()

  
  if(isEmailValid2 && isPasswordValid2 && isRepasswordValid2){
      const email=email2;
      const password=password2;
    const {data}= await axios.post("http://localhost:5000/users/signin", {email,password})
    Cookie.set('userSignin', JSON.stringify(data));
    Cookie.set('modeoflogin',JSON.stringify("normal"))

    toggleSuccessModal3()
    
   
   }
   else{
       alert("Enter details properly")
      
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
<a className="navbar-brand" onClick={handleClick} ><span className="fa fa-bars fa-lg navicon" style={{color:"white"}}></span>

</a>

<ul className="navbar-nav">
<li className="nav-item col-1 col-lg-5">
 <a className="nav-link" href="/"><img src={`${process.env.PUBLIC_URL}/images/logo.jpg`}style={{width:"2.7rem"},{height:"2.7rem"}}></img>
</a>
</li>
  
</ul>
<div className="nav-item col-7 col-lg-7 font-name"  >Sri Balaji Stores</div>
</nav>
<div className="container spacingforheader"> 
<div className="row">
    <div className="col-12">bye</div>
    <div className="col-12">        
    ..
    </div>
    <div className="col-12"></div>
    <div className="col-12"></div><div className="col-12"></div>
  
</div>
</div>
               <div className='login-heading'><strong>SIGN UP</strong></div>
                <Form className='container login-form '>
                    <FormGroup className='login-input'>
                        <Label htmlFor='email'><strong> Email</strong> </Label>
                        <Input type='email' name='email2' id='email2' placeholder='Email'  onChange= {(e)=> setEmail2(e.target.value) } onBlur={(e)=>formValidation6(e.target.value)}></Input>
                        {Object.keys(emailerror2).map((key)=>{
                                if(!isEmailValid2)
                                return <p style={{color:"red"}}>{emailerror2[key]}</p>
                                else
                                return <p></p>
                            })}  
                    </FormGroup>
                    <FormGroup className='login-input'>
                        <Label htmlFor='password'> <strong>Password</strong></Label>
                        <Input type='password' name='password2' id='password2' placeholder='Password' onChange={(e)=> setPassword2(e.target.value)} onBlur={(e)=>formValidation7(e.target.value)}></Input>
                        {Object.keys(passworderror2).map((key)=>{
                                if(!isPasswordValid2)
                                return <p style={{color:"red"}}>{passworderror2[key]}</p>
                                else
                                return <p></p>
                            })} 
                    </FormGroup>
                    <FormGroup className='login-input'>
                        <Label htmlFor='repassword'> <strong>Confirm Password</strong></Label>
                        <Input type='password' name='repassword2' id='repassword2' placeholder=' Confirm Password' onChange={(e)=> setRepassword2(e.target.value)} onBlur={(e)=>formValidation8()}></Input>
                        {Object.keys(repassworderror2).map((key)=>{
                                if(!isRepasswordValid2)
                                return <p style={{color:"red"}}>{repassworderror2[key]}</p>
                                else
                                return <p></p>
                            })} 
                    </FormGroup>
                    <FormGroup className='row'>
                        <Button className='col-10 col-sm-4 ml-3' type='submit'  onClick={(e)=>handleSignup(e)} color='primary'><span className='fa fa-paper-plane fa-lg bg-primary' ></span>  Signup </Button>
                        <Button className="btn ml-sm-2 ml-3 col-10 mt-1 mt-sm-0 col-sm-4 bg-success" onClick={redirectlogin}>Already have an account?</Button>
                    </FormGroup>
                   
              
<FormGroup className="row col-10 col-sm-4 ">
                <FacebookLogin
            appId="316383022969965" 
              
            fields="name,email,picture"
            autoLoad={false}
            callback={responseFacebooksignup}
           // cssClass="fb-button"
           cssClass="my-facebook-button-class"
            icon="fa-facebook"
     />

</FormGroup>

<FormGroup className="row">
   <GoogleLogin 
    
        clientId="323182642781-39lt59q309bkj7n90486390v79tt2jip.apps.googleusercontent.com"
        onSuccess={responsegooglesignup}
        onFailure={responsegooglesignup}
        render={renderProps => (
          <Button  className='col-10 col-sm-4  google-button'
            onClick={renderProps.onClick}
            disabled={renderProps.disabled}
            style={{marginLeft:'1rem'}}
          ><span className='fa fa-google'></span>
            Login With Google
          </Button>
        )}/>

        </FormGroup> 
        
         </Form>

         <div className="container">
    <Modal className='success-modal' isOpen = {isSuccessOpen3} toggle={toggleSuccessModal3}>
            <ModalHeader toggle={toggleSuccessModal3} className='success-modal-text'> <strong></strong> </ModalHeader>
            <ModalBody>
                
                    <p>You are successfully signed in!</p>
                    
                    <p><img src={`${process.env.PUBLIC_URL}/images/tick.png`} className="icons" alt="icons"/></p>                              
                    
            </ModalBody>
        </Modal>
    </div>

        </>
      
    )
}
export default Signup