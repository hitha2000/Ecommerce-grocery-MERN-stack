import React, { useState, useEffect } from 'react';
import {Nav, NavItem, Navbar, Button,Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input} from 'reactstrap'
import { slide as Menu } from 'react-burger-menu'
import { useSelector, useDispatch } from 'react-redux';
import { signin,login,register } from '../redux/actions/useractions';
import { Link, Redirect ,Route} from 'react-router-dom';
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';
import Cookie from 'js-cookie';
import axios from 'axios';

import {Errors,Control} from 'react-redux-form';
import history from '../history'
import Home from './HomeComponent'



// for dispatching

let isNameValid = false;
let isPhoneValid=false;
let isAddressValid= false;
let isEmailValid=false;
let isPasswordValid=false;
let isEmailValid2=false;
let isPasswordValid2=false;
let isRepasswordValid2=false;
const re = /^[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-/\s.]?[0-9]{4}$/;
let emailRegex = /^\S+@\S+\.\S+$/;


 function HomeHeader(props)
{

 
    const Signin = useSelector(state => state.userSignin);
    const { loading1, userSignin, error1} = Signin;
    const dispatch = useDispatch();

    const Login = useSelector(state => state.userLogin);
    const { loading2, userInfo, error2 } = Login;
   const Register = useSelector(state => state.userRegister);
    const { loading, userRegister, error } = Register;

    var logindetails=userInfo

    const [isOpen, setSide] = useState(false)
    function handleClick()
    {
      setSide(!isOpen)
    }
    function showSettings (event) {
      event.preventDefault();}
// login modals

const [email, setEmail] = useState('');
const [password , setPassword] = useState('');
const [email2, setEmail2] = useState('');
const [password2 , setPassword2] = useState('');
const [repassword2 , setRepassword2] = useState('');
const [isModalOpen , setToggle] = useState(false);

const [isloginOpen , setTogglelogin] = useState(false);
const [isinfoOpen,setInfo]=useState(false)
// const[state,setstate]=useState({name:'', phone:'', address:'' });

const [name, setName] = useState('');
const [phone, setPhone] = useState('');
const [address, setAddress] = useState('');
const[data,setdata]=useState('')
const[search,setSearch]=useState('')

const [nameerror, setnameerror]= useState({})
const [phoneerror, setphoneerror]= useState({})
const [addresserror, setaddresserror]= useState({})
const [emailerror, setemailerror]= useState('')
const [passworderror, setpassworderror]= useState({})
const [emailerror2, setemailerror2]= useState('')
const [passworderror2, setpassworderror2]= useState({})
const [repassworderror2, setrepassworderror2]= useState({})

const [isSuccessOpen1, setSuccessOpen1] = useState(false);
    function toggleSuccessModal1(prevState) {
        setSuccessOpen1(!isSuccessOpen1)
    } 

const [isSuccessOpen2 , setSuccessOpen2] = useState(false);
    function toggleSuccessModal2(prevState) {
        setSuccessOpen2(!isSuccessOpen2)
    }     

const [isSuccessOpen3 , setSuccessOpen3] = useState(false);
    function toggleSuccessModal3(prevState) {
        setSuccessOpen3(!isSuccessOpen3)
    }    

    const [isLogoutSuccessOpen, setLogoutSuccessOpen] = useState(false);
    function toggleLogoutSuccessModal(prevState) {
        setLogoutSuccessOpen(!isLogoutSuccessOpen)
    } 


async function submithandle(e) {

  if(isNameValid  && isPhoneValid && isAddressValid){
    
   
    var modeoflogin=Cookie.getJSON('modeoflogin')
    var userid=''
    if(modeoflogin==="normal")
     {userid=userSignin._id
      Cookie.set('modeoflogin',JSON.stringify("normal"))
    }
     else
     {
      userid=Cookie.getJSON("userSignin").user._id;
      Cookie.set('modeoflogin',JSON.stringify("google"))
     }
   
     
    const {data}= await axios.put("http://localhost:5000/users/signin", {userid,name,phone, address },
    {headers: {
     Authorization: 'Bearer ' + userSignin.token
   }}
   )
  
   Cookie.set('name', JSON.stringify(name));
   Cookie.set('login',JSON.stringify(true));
   
   // dispatch(register(name,phone,address));
   //toggleModal();
    //toggleSuccessModal1();
    
   
    //setName("")
    //setTogglelogin(true)
    //setInfo(false)
    
    
    //setTogglelogin(true)
    e.preventDefault();
    //handleSubmit();
   
}
else{
   alert("Enter details properly")
   e.preventDefault()
   setInfo(isinfoOpen)
}
  e.preventDefault();
  
   console.log(data)
   
   
}

const formValidation=(e)=>{
  const nameerror={};
  if(name.trim().length<5)
  {
      nameerror.nameshort="Name is too short"        
      isNameValid=false
      setnameerror(nameerror)
  }
 
  else{
      isNameValid=true
  }
}
const formValidation2=(e)=>{
  const phoneerror={};

  if(!re.test(phone) && phone.trim().length!=10)
  {
      phoneerror.notphone="Contact number should be a valid number"
      isPhoneValid=false
      setphoneerror(phoneerror)
  }
  else{
      isPhoneValid=true
  }
  
}
const formValidation3=(e)=>{
  const addresserror={}; 

  if(address.trim().length<10)
  {
      addresserror.shortaddress="Enter detailed address"
      isAddressValid=false
      setaddresserror(addresserror)
  }
  else{
      isAddressValid=true
  }
}

const formValidation4=(e)=>{
  const emailerror={};

  if(!emailRegex.test(email))
  {
      emailerror.notemail="Enter valid email"
      isEmailValid=false
      setemailerror(emailerror)
  }
  else{
      isEmailValid=true
  }
  
}

const formValidation5=(e)=>{
  const passworderror={};

  if(password.trim().length<6)
  {
      passworderror.notpassword="Password should be more than 6 characters"
      isPasswordValid=false
      setpassworderror(passworderror)
  }
  else{
      isPasswordValid=true
  }
  
}

const formValidation6=(e)=>{
  const emailerror2={};

  if(!emailRegex.test(email2))
  {
      emailerror2.notemail2="Enter valid email"
      isEmailValid2=false
      setemailerror2(emailerror2)
  }
  else{
      isEmailValid2=true
  }
  
}

const formValidation7=(e)=>{
  const passworderror2={};

  if(password2.trim().length<6)
  {
      passworderror2.notpassword2="Password should be more than 6 characters"
      isPasswordValid2=false
      setpassworderror2(passworderror2)
  }
  else{
      isPasswordValid2=true
  }
  
}
const formValidation8=(e)=>{
  const repassworderror2={};

  if(password2!=repassword2)
  {
      repassworderror2.notrepassword2="Password does not match the above password"
      isRepasswordValid2=false
      setrepassworderror2(repassworderror2)
  }
  else{
      isRepasswordValid2=true
  }
  
}

function handleSubmit(e) {
  console.log("hi")
 
  setInfo(!isinfoOpen)
  setTogglelogin(true)

  
}

function toggleModal() {
 
    setTogglelogin(!isloginOpen)
    
  setSide(false)
  setToggle(!isModalOpen)
} 

function submitHandler(e) {
 
  if(isEmailValid2 && isPasswordValid2 && isRepasswordValid2){
    dispatch(signin(email2, password2));
    Cookie.set("modeoflogin",JSON.stringify("normal"))
    toggleModal();
    
    setInfo(true);
    
    //toggleSuccessModal3();
    e.preventDefault();    

   }
   else{
       alert("Enter details properly")
       e.preventDefault()
   }
}

function toggleModallogin(e) {
 
    setSide(false)
    setTogglelogin(!isloginOpen)
  
   
  } 
function submitHandlerlogin(e) {
  
  if(isEmailValid){
    dispatch(login(email, password));

    toggleModallogin();
    
    toggleSuccessModal2();
    
  
  Cookie.set('login',JSON.stringify(true))
    Cookie.set('modeoflogin',JSON.stringify("normal"))
    //localStorage.setItem('login',JSON.stringify(true))
    e.preventDefault();
  
   

   }
   else{
       alert("Enter valid email")
       e.preventDefault()
   }
  }
  
  
  
  
  


  const config={
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "Access-Control-Allow-Credentials": true
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
        //toggleModal()
        setToggle(!isModalOpen)
        setInfo(true);
        //toggleSuccessModal2();
       
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
            setdata(response.data)
            Cookie.set('login',JSON.stringify(true))
            Cookie.set('modeoflogin',JSON.stringify("facebook"))
            Cookie.set('userInfo', JSON.stringify(response.data));
            Cookie.set('userSignin', JSON.stringify(response.data));
            //toggleModal();
            setToggle(!isModalOpen)
            setInfo(true);
           // toggleSuccessModal2();
            
         
          })
          .catch(error => {
            console.log('FACEBOOK SIGNIN ERROR', error.response);
          });
         
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
        toggleModallogin()
       
        toggleSuccessModal2();
       
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
            setdata(response.data)
            Cookie.set('login',JSON.stringify(true))
            Cookie.set('modeoflogin',JSON.stringify("facebook"))
            Cookie.set('userInfo', JSON.stringify(response.data));
            Cookie.set('userSignin', JSON.stringify(response.data));
            toggleModallogin();
          
           toggleSuccessModal2();
            
         
          })
          .catch(error => {
            console.log('FACEBOOK SIGNIN ERROR', error.response);
          });
         
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
 console.log((Cookie.getJSON('userInfo')))

 function newModal()
 {
   setToggle(false)
   setTogglelogin(true)

 }
 function toggleSignup()
 {
  setSide(false)
   setToggle(true)
   
 }



function logout()
{
    localStorage.clear()
    Cookie.remove('userInfo')
    Cookie.remove('modeoflogin')
    Cookie.remove('login')
   // localStorage.setItem('login',JSON.stringify(false))
    toggleLogoutSuccessModal();
    window.location.reload(false)
    
    
}


    return(
        <>
        <div>
    <Menu className="sidebar" isOpen={ isOpen } customBurgerIcon={false}>
    <div className="container">
      <div className="row">
    <div className="col-12 navtop"><div className="row"><div className="offset-1 col-7">{logincoookie?(<p  style={{cursor:"pointer"}}><span className="fa fa-user" style={{marginRight:"2px"}}></span>{signup}</p>):(<a href="/signup"><p  style={{cursor:"pointer"}}><span className="fa fa-sign-in"></span>Signin</p></a>)}</div><p onClick={handleClick} className=" col-2 fa fa-arrow-left "style={{cursor:"pointer"}}></p></div></div>
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
<a className="navbar-brand" onClick={handleClick}><span className="fa fa-bars fa-lg navicon" style={{color:"white"}}></span>

</a>

<ul className="navbar-nav">
<li className="nav-item col-1 col-lg-1">
 <a className="nav-link" href="/"><img src={`${process.env.PUBLIC_URL}/images/logo.jpg`}style={{width:"2.7rem"},{height:"2.7rem"}}></img>
</a>
</li>
  
</ul>
<span className="nav-item col-7 col-lg-2" style={{fontSize:"1rem"}}>Sri Balaji Stores</span>
<form className="nav-item form-inline col-10 col-md-11 col-lg-8">
<input type="text" className="form-control" placeholder="Search For Products" style={{width:"100%"}} onChange={(e)=>setSearch(e.target.value)} />
<Link to={{
                 pathname: "/products",
                 search: "?search="+search
                }}
                
                ><img src={`${process.env.PUBLIC_URL}/images/search.png`}className="btn menu" style={{width:"1rem"},{height:"1.5rem"}} id="searchicon"/></Link>


</form>
<a href="/cart"><img  src={`${process.env.PUBLIC_URL}/images/cart.png`} className="btn menu cart nav-item" style={{width:"2rem"},{height:"2rem"}}/></a>
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
{/* login modal*/}

<div className="container">
 <Modal isOpen = {isloginOpen} toggle={toggleModallogin}>
            <ModalHeader toggle={toggleModallogin} className='modal-text'> <strong>LOG-IN</strong> </ModalHeader>
            <ModalBody>
                <Form onSubmit={submitHandlerlogin}>
                    <FormGroup>
                        <Label htmlFor='email'><strong> Email</strong> </Label>
                        <Input type='email' name='email' id='email' placeholder='Email'  onChange= {(e)=> setEmail(e.target.value)} onBlur={(e)=>formValidation4()}></Input>
                        {Object.keys(emailerror).map((key)=>{
                                if(!isEmailValid)
                                return <p style={{color:"red"}}>{emailerror[key]}</p>
                                else
                                return <p></p>
                            })}    
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor='password'> <strong>Password</strong></Label>
                        <Input type='password' name='password' id='password' placeholder='Password' onChange={(e)=> setPassword(e.target.value)} ></Input>
                        
                    </FormGroup>
                    <FormGroup className='row'>
                        <Button className='col-10 col-sm-6 offset-sm-3' type='submit' value='submit' color='primary'><span className='fa fa-paper-plane fa-lg' ></span> LOGIN </Button>
                    </FormGroup>
                   
                </Form>
              

                <FacebookLogin
    appId="316383022969965" 

    fields="name,email,picture"
    autoLoad={false}
    callback={responseFacebook}
    
    render={renderProps => (
        <button onClick={renderProps.onClick} disabled={renderProps.disabled}>This is my custom FB button</button>
      )}
     />
   <GoogleLogin
        clientId="323182642781-39lt59q309bkj7n90486390v79tt2jip.apps.googleusercontent.com"
        onSuccess={responsegoogle}
        onFailure={responsegoogle}
        render={renderProps => (
          <button
            onClick={renderProps.onClick}
            disabled={renderProps.disabled}
            className='w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-indigo-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline'
          >
            <div className=' p-2 rounded-full '>
              <i className='fab fa-google ' />
            </div>
            <span className='ml-4'>Sign In with Google</span>
          </button>
        )}/> 
         
        </ModalBody>
        </Modal>
    </div>




<div className="container">
 <Modal isOpen = {isModalOpen} toggle={toggleModal}>
            <ModalHeader toggle={toggleModal} className='modal-text'> <strong>SIGN-IN</strong> </ModalHeader>
            <ModalBody>
                <Form onSubmit={submitHandler}>
                    <FormGroup>
                        <Label htmlFor='email'><strong> Email</strong> </Label>
                        <Input type='email' name='email2' id='email2' placeholder='Email'  onChange= {(e)=> setEmail2(e.target.value)} onBlur={(e)=>formValidation6(e.target.value)}></Input>
                        {Object.keys(emailerror2).map((key)=>{
                                if(!isEmailValid2)
                                return <p style={{color:"red"}}>{emailerror2[key]}</p>
                                else
                                return <p></p>
                            })}  
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor='password'> <strong>Password</strong></Label>
                        <Input type='password' name='password2' id='password2' placeholder='Password' onChange={(e)=> setPassword2(e.target.value)} onBlur={(e)=>formValidation7(e.target.value)}></Input>
                        {Object.keys(passworderror2).map((key)=>{
                                if(!isPasswordValid2)
                                return <p style={{color:"red"}}>{passworderror2[key]}</p>
                                else
                                return <p></p>
                            })} 
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor='repassword'> <strong>Confirm Password</strong></Label>
                        <Input type='password' name='repassword2' id='repassword2' placeholder=' Confirm Password' onChange={(e)=> setRepassword2(e.target.value)} onBlur={(e)=>formValidation8(e.target.value)}></Input>
                        {Object.keys(repassworderror2).map((key)=>{
                                if(!isRepasswordValid2)
                                return <p style={{color:"red"}}>{repassworderror2[key]}</p>
                                else
                                return <p></p>
                            })} 
                    </FormGroup>
                    <FormGroup className='row'>
                        <Button className='col-10 col-sm-6 offset-sm-3' type='submit' value='submit' color='primary'><span className='fa fa-paper-plane fa-lg' ></span>  Submit </Button>
                    </FormGroup>
                   
                </Form>

                <FacebookLogin
    appId="316383022969965" 

    fields="name,email,picture"
    autoLoad={false}
    callback={responseFacebooksignup}
    
    render={renderProps => (
        <button onClick={renderProps.onClick} disabled={renderProps.disabled}>This is my custom FB button</button>
      )}
     />
   <GoogleLogin
        clientId="323182642781-39lt59q309bkj7n90486390v79tt2jip.apps.googleusercontent.com"
        onSuccess={responsegooglesignup}
        onFailure={responsegooglesignup}
        render={renderProps => (
          <button
            onClick={renderProps.onClick}
            disabled={renderProps.disabled}
            className='w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-indigo-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline'
          >
            <div className=' p-2 rounded-full '>
              <i className='fab fa-google ' />
            </div>
            <span className='ml-4'>Sign In with Google</span>
          </button>
        )}/> 
         <Button className="btn" onClick={newModal}>Already have an account?</Button>
            </ModalBody>
        </Modal>
    </div>
        

      <div className='container'>
        <Modal isOpen={isinfoOpen} toggle={handleSubmit} >
                <ModalHeader toggle={handleSubmit}><strong>Customer Information</strong></ModalHeader>
                <ModalBody>
                    <Form  onSubmit={submithandle}>
                        <FormGroup>
                            <Label htmlFor='name'><strong> Name</strong> </Label>
                            <Input type='text' name="name" id='name' onChange={(e)=>setName(e.target.value)} onBlur={(e)=>formValidation(e.target.value)} />
                            {Object.keys(nameerror).map((key)=>{
                                if(!isNameValid)
                                return <p style={{color:"red"}}>{nameerror[key]}</p>
                                else
                                return <p></p>
                            })}   
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor='phone'><strong> Contact Number</strong> </Label>
                            <Input type="number" name="phone" id='phone' onChange={(e)=>setPhone(e.target.value)} onBlur={(e)=>formValidation2(e.target.value)}/>
                            {Object.keys(phoneerror).map((key)=>{
                                if(!isPhoneValid)
                                return <p style={{color:"red"}}>{phoneerror[key]}</p>
                                else
                                return <p></p>
                            })}
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor='address'><strong>Address</strong>  </Label>
                            <Input type='textarea' name='address' id='address' onChange={(e)=>setAddress(e.target.value)} onBlur={(e)=>formValidation3(e.target.value)}/>
                            {Object.keys(addresserror).map((key)=>{
                                if(!isAddressValid)
                                return <p style={{color:"red"}}>{addresserror[key]}</p>
                                else
                                return <p></p>
                            })}
                        </FormGroup>
                        <FormGroup className='row'>
                            <Button className='col-10 col-sm-6 offset-sm-3' type='submit' value='submit'> Submit </Button>
                        </FormGroup>
                    </Form>
                   
                </ModalBody>
            </Modal>
    </div>

    <div className="container">
    <Modal className='success-modal' isOpen = {isSuccessOpen1} toggle={toggleSuccessModal1}>
            <ModalHeader toggle={toggleSuccessModal1} className='success-modal-text'> <strong></strong> </ModalHeader>
            <ModalBody>
                
                    <p>Thank you for providing your details!</p>
                    <p><img src={`${process.env.PUBLIC_URL}/images/tick.png`} className="icons" alt="icons"/></p>                                
                
            </ModalBody>
        </Modal>
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

    <div className="container">
    <Modal className='success-modal' isOpen = {isSuccessOpen3} toggle={toggleSuccessModal3}>
            <ModalHeader toggle={toggleSuccessModal3} className='success-modal-text'> <strong></strong> </ModalHeader>
            <ModalBody>
                
                    <p>You are successfully signed in!</p>
                    
                    <p><img src={`${process.env.PUBLIC_URL}/images/tick.png`} className="icons" alt="icons"/></p>                              
                    
            </ModalBody>
        </Modal>
    </div>  

    <div className="container">
    <Modal className='success-modal' isOpen = {isLogoutSuccessOpen} toggle={toggleLogoutSuccessModal}>
            <ModalHeader toggle={toggleLogoutSuccessModal} className='success-modal-text'> <strong></strong> </ModalHeader>
            <ModalBody>
                
                    <p>You are successfully logged out!</p>
                    <p><img src={`${process.env.PUBLIC_URL}/images/tick.png`} className="icons" alt="icons"/></p>                                
                
            </ModalBody>
        </Modal>
  </div>  
</div>
</>)
}



export default (HomeHeader)
