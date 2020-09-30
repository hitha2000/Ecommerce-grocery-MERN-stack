
import React, { useState,useEffect}  from 'react';
import { Link } from 'react-router-dom';
import {Accordion, Button, ButtonGroup, Card, ToggleButton} from 'react-bootstrap'
import styled from 'styled-components'
import Cookie from 'js-cookie';
import { slide as Menu } from 'react-burger-menu'

import axios from 'axios'
function DeliveryComponent(props)
{
    const checkoutHandler = () => {
        props.history.push("/payment");
      }
    


     
      var tomorrow = new Date()
      tomorrow.setDate(tomorrow.getDate() + 2);
      var weekday = new Array(7);
      weekday[0]=  tomorrow.toDateString();
      weekday[1] = tomorrow.toDateString();
      weekday[2] = tomorrow.toDateString();
      weekday[3] = tomorrow.toDateString();
      weekday[4] = tomorrow.toDateString();
      weekday[5] = tomorrow.toDateString();
      weekday[6] = tomorrow.toDateString();
      var n1 = weekday[tomorrow.getDay()];
      
      var tomorrow = new Date()
      tomorrow.setDate(tomorrow.getDate() + 3);
      var weekday = new Array(7);
      weekday[0]=  tomorrow.toDateString();
      weekday[1] = tomorrow.toDateString();
      weekday[2] = tomorrow.toDateString();
      weekday[3] = tomorrow.toDateString();
      weekday[4] = tomorrow.toDateString();
      weekday[5] = tomorrow.toDateString();
      weekday[6] = tomorrow.toDateString();
      var n2 = weekday[tomorrow.getDay()];
      
      var tomorrow = new Date()
      tomorrow.setDate(tomorrow.getDate() + 4);
      var weekday = new Array(7);
      weekday[0]=  tomorrow.toDateString();
      weekday[1] = tomorrow.toDateString();
      weekday[2] = tomorrow.toDateString();
      weekday[3] = tomorrow.toDateString();
      weekday[4] = tomorrow.toDateString();
      weekday[5] = tomorrow.toDateString();
      weekday[6] = tomorrow.toDateString();
      var n3 = weekday[tomorrow.getDay()];
      
      var tomorrow = new Date()
      tomorrow.setDate(tomorrow.getDate() + 5);
      var weekday = new Array(7);
      weekday[0]=  tomorrow.toDateString();
      weekday[1] = tomorrow.toDateString();
      weekday[2] = tomorrow.toDateString();
      weekday[3] = tomorrow.toDateString();
      weekday[4] = tomorrow.toDateString();
      weekday[5] = tomorrow.toDateString();
      weekday[6] = tomorrow.toDateString();
      var n4 = weekday[tomorrow.getDay()]; 
    
    const [checked, setChecked] = useState(false);
    const [radioValue, setRadioValue] = useState('1');
    const [date, setdate] = useState('');
    const [background, setBackground]=useState('#000000');
    
    const setStyle=(background)=>{
        setBackground(background);
    };
    const SummaryStyle = styled.div`
        background-color:${background}`;
        var logintype=Cookie.getJSON('modeoflogin')||false
        var userinform=''
    
       
     
        userinform=(Cookie.getJSON('userInfo'))
        const [data, setdata] = useState('')
        var logintype=Cookie.getJSON('modeoflogin')||false
    
        
        useEffect(() => {
           
            if(logintype)
            {const fetchuserdetails=async()=>{
                let config
                if(logintype=="normal")
                {
                 config = {
                    
                    params: {
                        email: userinform.email
                    }
                  }
                }
                else
                {
                   
                     config = {
                       
                        params: {
                            email: userinform.user.email
                        }
                      }
                   
    
                }
    
               
    
             const d = await axios.get('http://localhost:5000/users/address',config)
            setdata(d.data)
        
        }
        fetchuserdetails() 
            }
        else
        {
            setdata(false)
        }
            
        
            console.log(data)
        
        
          }, [])
    
          console.log(data)
   

    console.log(radioValue)
console.log(date)
var time=radioValue
localStorage.setItem(JSON.stringify("delivery"),JSON.stringify({date,time}));

  const radios = [
   
    { name: '12PM - 2 PM', value: '12PM - 2 PM' , style: '1em'},
    { name: '6PM - 9PM', value: '6PM - 9PM' , style: '1em'},
  ];

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


  
  if(data)
    {return(
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
    <span className="nav-item col-7 col-lg-7 font-name"  >Sri Balaji Stores</span>
    </nav>
    <div className="container spacingforheader"> 
    <div className="row">
        <div className="col-12">bye</div>
        <div className="col-12">        
     </div><div className="col-12"></div>
      
    </div>
    </div>
    <div className="container">  
        <div className="row row-content">
            <div className="col-sm-6 mt-3 align-items-center justify-content-between">
                <div className="allpageheader">
                    <h1><img src="/images/delivery.png" className="icons ml-2 mb-2" alt="icons"></img> Delivery</h1>
                </div>
                <div className="pcard">
                        <h3 className="card-header text-black allpageheader">HOME</h3>
                        <div className="card-body">
                            <dl className="row">
                            <h2>Address</h2>
                            </dl>
                            <div>
                                {data[0].address}
                            </div>
                        </div>
                </div>
                <br></br>
                <div>
                    <img src="/images/market.jpg" className="marketimg" alt="marketimg"></img>
                </div>
            </div>
            
            <div className="col-sm mt-4">
                        <h3>Choose your slot <img src="/images/slot.png" className="slotimg" alt="slotimg"></img></h3>
                        
                        <Accordion defaultActiveKey="0">
                            <Card style={{height:"120px"}}>
                                
                                    <Accordion.Toggle as={Card.Header} eventKey="0" className="plinkcolor paccCard">                                    
                                        {n1} 
                                    </Accordion.Toggle>
                                
                                <Accordion.Collapse eventKey="0">
                                    <Card.Body className="paccCardBody">                                    
                                    <ButtonGroup toggle>
                                        {radios.map((radio, idx) => ( 
                                                              
                                       <ToggleButton className="paccButton"
                                            key={idx}
                                            type="radio"
                                            variant="secondary"
                                            style={{margin:"5px"}}                                          
                                            name="radio"
                                            value={radio.value}
                                            checked={radioValue === radio.value}                                           
                                            onChange={(e) => {
                                                setRadioValue(e.currentTarget.value)
                                                setdate(n1)
                                                
                                                
                                                
                                            }} 
                                                                                    
                                        >
                                            {radio.name}
                                        </ToggleButton> 
                                        
                                        ))}
                                    </ButtonGroup>
                                    </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                            <Card style={{height:"120px"}}>
                                
                                    <Accordion.Toggle as={Card.Header} eventKey="1" className="plinkcolor paccCard">
                                      {n2}
                                    </Accordion.Toggle>
                                
                                <Accordion.Collapse eventKey="1">
                                    <Card.Body className="paccCardBody">
                                    <ButtonGroup toggle>
                                        {radios.map((radio, idx) => (
                                        <ToggleButton className="paccButton"
                                            key={idx}
                                            type="radio"
                                            variant="secondary"
                                            style={{margin:"5px"}}  
                                            name="radio"
                                            value={radio.value}
                                            checked={radioValue === radio.value}
                                            onChange={(e) => {setRadioValue(e.currentTarget.value)
                                                setdate(n2)
                                            
                                            
                                            }}
                                        >
                                            {radio.name}
                                        </ToggleButton>
                                        ))}
                                    </ButtonGroup>
                                    </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                            <Card style={{height:"120px"}}>
                               
                                    <Accordion.Toggle as={Card.Header} eventKey="2" className="plinkcolor paccCard">
                                        {n3}
                                    </Accordion.Toggle>
                                
                                <Accordion.Collapse eventKey="2">
                                    <Card.Body className="paccCardBody">
                                    <ButtonGroup toggle>
                                        {radios.map((radio, idx) => (
                                        <ToggleButton className="paccButton"
                                            key={idx}
                                            type="radio"
                                            variant="secondary"
                                            style={{margin:"5px"}}  
                                            name="radio"
                                            value={radio.value}
                                            checked={radioValue === radio.value}
                                            onChange={(e) => {setRadioValue(e.currentTarget.value)
                                                setdate(n3)
                                                setStyle("#FF4500")
                                            
                                            }                                           
                                        
                                        
                                        }
                                        >
                                            {radio.name}
                                        </ToggleButton>
                                        ))}
                                    </ButtonGroup>
                                    </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                            <Card style={{height:"120px"}}>
                                
                                    <Accordion.Toggle as={Card.Header} eventKey="3" className="plinkcolor paccCard">
                                        {n4}
                                    </Accordion.Toggle>
                                
                                <Accordion.Collapse eventKey="3">
                                    <Card.Body className="paccCardBody">
                                    <ButtonGroup toggle>
                                        {radios.map((radio, idx) => (
                                        <ToggleButton className="paccButton"
                                            key={idx}
                                            type="radio"
                                            variant="secondary"
                                            style={{margin:"5px"}}  
                                            name="radio"
                                            value={radio.value}
                                            checked={radioValue === radio.value}
                                            onChange={(e) => {setRadioValue(e.currentTarget.value)
                                                setdate(n4)
                                            
                                            
                                            }}
                                        >
                                            {radio.name}
                                        </ToggleButton>
                                        ))}
                                    </ButtonGroup>
                                    </Card.Body>
                                </Accordion.Collapse>
                            </Card>    
                            <br></br>
                        <button onClick={checkoutHandler} className="pdelthemebutton btn-lg" style={{width:"100%"}}>
                            Proceed to Payment
                        </button>                        
                        </Accordion>
                        
                        </div>
                        
                    </div>   
                        
    </div>  
    </>                                            
    );
}
else
{
    return(<>
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
    <span className="nav-item col-7 col-lg-7 font-name" >Sri Balaji Stores</span>
    </nav>
    <div className="container spacingforheader"> 
    <div className="row">
        <div className="col-12">bye</div>
        <div className="col-12">        
     </div><div className="col-12"></div>
      
    </div>
    </div>
    <Link to="/signup"><button>To Place Order Login</button></Link>
    </>)
}

}


export default DeliveryComponent;
