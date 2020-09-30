import React,{useState,useEffect} from 'react'
import Cookie from 'js-cookie'
import axios from 'axios';
import { slide as Menu } from 'react-burger-menu'
import { createBrowserHistory } from 'history'
import {Modal,ModalBody,ModalHeader, Button, Form, FormGroup, Label, Input} from 'reactstrap'
const history=createBrowserHistory()
function CustomerInfo(props)
{
    let props1=props;
    const re=/^(\+91[\-\s]?)?[0]?(91)?[6789]\d{9}$/;
    //const re = /^[(]?[6-9]{3}[)]?[-\s.]?[0-9]{3}[-/\s.]?[0-9]{4}$/;
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [nameerror, setnameerror]= useState({})
    const [phoneerror, setphoneerror]= useState({})
    const [addresserror, setaddresserror]= useState({});

    const[ isNameValid,setNameValid]=useState(false)
    const[ isPhoneValid,setPhoneValid]=useState(false)
    const[ isAddressValid,setAddressValid]=useState(false)

    const [isSuccessOpen1, setSuccessOpen1] = useState(false);

    function red()
    {
        const modeoflogin=(Cookie.getJSON('modeoflogin'));

        if(modeoflogin=="normal")
            {props1.history.push('/login')}
        else
        {
            props1.history.push('/')
        }
    }

    function toggleSuccessModal1(prevState) {
        setSuccessOpen1(!isSuccessOpen1)

        setTimeout(()=>
        {
            red();
        },3000)
    } 

    const formValidation=(e)=>{
        const nameerror={};
        if(name.trim().length<5)
        {
            nameerror.nameshort="Name is too short"        
            setNameValid(false)
            setnameerror(nameerror)
        }
       
        else{
            setNameValid(true)
        }
      }
      const formValidation2=(e)=>{
        const phoneerror={};
      
        if(!re.test(phone) || phone.trim().length!=10)
        {
            phoneerror.notphone="Contact number should be a valid number"
            setPhoneValid(false)
            setphoneerror(phoneerror)
        }
        else{
            setPhoneValid(true)
        }
        
      }
      const formValidation3=(e)=>{
        const addresserror={}; 
      
        if(address.trim().length<10)
        {
            addresserror.shortaddress="Enter detailed address"
            setAddressValid(false)
            setaddresserror(addresserror)
        }
        else{
            setAddressValid(true)
        }
      }


    async function registration(e)
    {
        e.preventDefault();

        if(isNameValid  && isPhoneValid && isAddressValid){
    
   
            var modeoflogin=Cookie.getJSON('modeoflogin')
            var userid=''
            var userSignin=Cookie.getJSON("userSignin")
            if(modeoflogin==="normal")
             {userid=userSignin._id
              Cookie.set('modeoflogin',JSON.stringify("normal"))
            }
             else
             {
              userid=Cookie.getJSON("userSignin").user._id;
              Cookie.set('modeoflogin',JSON.stringify("google"))
             }
           
             
            const {data}= await axios.put("http://localhost:5000/users/signin", {userid,name,phone,address },
            {headers: {
             Authorization: 'Bearer ' + userSignin.token
           }}
           )
           toggleSuccessModal1();

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
    <div className="col-12 navtop"><div className="row"><div className="offset-1 col-7">{logincoookie?(<p style={{cursor:"pointer"}}><span className="fa fa-user" style={{marginRight:"2px"}}></span>{signup}</p>):(<p  style={{cursor:"pointer"}}><span className="fa fa-sign-in"></span>Signin</p>)}</div><p onClick={handleClick} className=" col-2 fa fa-arrow-left "style={{cursor:"pointer"}}></p></div></div>
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
<span className="nav-item col-7 col-lg-7 font-name" >Sri Balaji Stores</span>
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

            <div className='login-heading'><strong>CUSTOMER INFORMATION</strong></div>
                    <Form className='container login-form ' >
                        <FormGroup  className='login-input'>
                            <Label htmlFor='name'><strong> Name</strong> </Label>
                            <Input type='text' name="name" id='name' onChange={(e)=>setName(e.target.value)} onBlur={(e)=>formValidation(e.target.value)} />
                            {Object.keys(nameerror).map((key)=>{
                                if(!isNameValid)
                                return <p style={{color:"red"}}>{nameerror[key]}</p>
                                else
                                return <p></p>
                            })}   
                        </FormGroup>
                        <FormGroup className='login-input'>
                            <Label htmlFor='phone'><strong> Contact Number</strong> </Label>
                            <Input type="tel" name="phone" id='phone' onChange={(e)=>setPhone(e.target.value)} onBlur={(e)=>formValidation2(e.target.value)}/>
                            {Object.keys(phoneerror).map((key)=>{
                                if(!isPhoneValid)
                                return <p style={{color:"red"}}>{phoneerror[key]}</p>
                                else
                                return <p></p>
                            })}
                        </FormGroup>
                        <FormGroup  className='login-input'>
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
                            <Button className='col-10 col-sm-6 offset-sm-3 mb-3 ml-3 fa fa-paper-plane bg-primary p-2' type='submit'  onClick={(e)=>registration(e)}> Submit </Button>
                        </FormGroup>
                    </Form>
                   

                    <div className="container">
            <Modal className='success-modal' isOpen = {isSuccessOpen1} toggle={toggleSuccessModal1}>
            <ModalHeader toggle={toggleSuccessModal1} className='success-modal-text'> <strong></strong> </ModalHeader>
            <ModalBody>
                
                    <p><strong>Thank you for providing your details!</strong></p>
                    <p><img src={`${process.env.PUBLIC_URL}/images/tick.png`} className="icons" alt="icons"/></p>                                
                
            </ModalBody>
        </Modal>
    </div>  


        </>

    )
}
export default CustomerInfo