import React, {useState, useEffect} from 'react';
import {Card, CardHeader, CardBody, Button} from 'reactstrap';
import {ORDERS} from '../shared/orders';
import SearchBar from './searchbar'
import axios from 'axios'
import Cookie from 'js-cookie'
import {Link} from 'react-router-dom'
import { slide as Menu } from 'react-burger-menu'

function RenderCard({item}) {

    return(

        <>
        
        <Card className='order-card' style={{textAlign:'center'}}>
            <CardHeader>
                <div>Placed on {item.placedon} </div>
                <div>Scheduled for {item.scheduledon}</div>
            </CardHeader>
            <CardBody>
                <div className='p-1'><span className='fa fa-shopping-bag'>{' '}</span> Delivered by SBS</div>
                <div className='p-1'><strong>SBS store - RT Nagar</strong> - <span>{' '}</span><span className='fa fa-rupee fa-xs'>{' '}</span> {item.totalamount}</div>
                <div>Delivery Charges - <span style={{color:'green'}}><strong>FREE</strong></span></div>
                <div className='pb-1'>Order ID: {item.orderid}</div>
                <div className='pb-2'> <strong>Total Payable Amount</strong> -<span>{' '}</span><span className='fa fa-rupee fa-xs'>{' '}</span> {item.totalamount}</div>
                
                <Link to={{
            pathname: "/orders",
            search: "?orderid="+item.orderid 
          }}>  
          <p></p>
          <Button type='submit' value='submit'  className='col-10 col-sm-3 myorder-button'> View Details </Button>
                </Link> 
            </CardBody>
        </Card>
</>
            

           
    )

}

function MyOrders(props)
 {

    const [data, setdata] = useState('')
    var userinform=(Cookie.getJSON('userInfo'))||null

    var logintype=Cookie.getJSON('modeoflogin')||''
  
        userinform=(Cookie.getJSON('userInfo'))||null
        var logintype=Cookie.getJSON('modeoflogin')||false
        const[noorders,setnoorders]=useState(false)

    
    
    useEffect(() => {
        
        const fetchorders=async()=>{

            if(logintype)
            {let config
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

         const d = await axios.get('http://localhost:5000/orders/userorder',config)
        setdata(d.data)}
        else
        {
            setdata(false)
            setnoorders(true)
        }
        }
       fetchorders()        
        console.log(data)
      }, [])

      console.log(data)


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
    {const orders = data.map((item) => {
        return(
            <div key={item.id} className='col-12 col-sm-11 '>
                <RenderCard item={item}/>

            </div>
        )
    })

    return(
        <>
              <Menu className="sidebar" isOpen={ isOpen } customBurgerIcon={false}>
        <div className="container">
          <div className="row">
        <div className="col-12 navtop"><div className="row"><div className="offset-1 col-7">{logincoookie?(<p  style={{cursor:"pointer"}}><span className="fa fa-user" style={{marginRight:"2px"}}></span>{signup}</p>):(<p  style={{cursor:"pointer"}}><span className="fa fa-sign-in"></span>Signin</p>)}</div><p onClick={handleClick} className=" col-2 fa fa-arrow-left "style={{cursor:"pointer"}}></p></div></div>
       <div className="side-items">
       <div className="col-12 container"><a href ='/home'className="menu-item row"><span className="fa fa-home fa-lg offset-1 offset-sm-2  offset-lg-2 col-1 p-1"></span><span className="offset-1 offset-sm-2  col-7 col-sm-6">Home</span></a></div> 
       <div className="col-12 container" onClick={()=>setSide(false)}><a href ='home#accordian'className="menu-item row"><span className="fa fa-th-large fa-lg offset-1 offset-sm-2 offset-lg-2 col-1 p-1"></span><span className="offset-1 offset-sm-2 col-7 col-sm-6"> Categories</span></a></div> 
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
        <div className='container'>
            <div className='row'>
                <div className='col-10 col-sm-11 p-2 mt-0'>
            <div className='myorder-heading'>
            <strong>My Orders</strong>
            </div>
            </div>
            </div>
           
            <div className='row mt-5'>
                {orders}
            </div>

        </div>
        </>
    )
    }
    else
    {
        if(noorders)

        {
            return(<>No orders</>)
        }
        else

        {return(
            <>
                    <Menu className="sidebar" isOpen={ isOpen } customBurgerIcon={false}>
        <div className="container">
          <div className="row">
        <div className="col-12 navtop"><div className="row"><div className="offset-1 col-7">{logincoookie?(<p  style={{cursor:"pointer"}}><span className="fa fa-user" style={{marginRight:"2px"}}></span>{signup}</p>):(<p  style={{cursor:"pointer"}}><span className="fa fa-sign-in"></span>Signin</p>)}</div><p onClick={handleClick} className=" col-2 fa fa-arrow-left "style={{cursor:"pointer"}}></p></div></div>
       <div className="side-items">
       <div className="col-12 container"><a href ='/home'className="menu-item row"><span className="fa fa-home fa-lg offset-1 offset-sm-2  offset-lg-2 col-1 p-1"></span><span className="offset-1 offset-sm-2  col-7 col-sm-6">Home</span></a></div> 
       <div className="col-12 container" onClick={()=>setSide(false)}><a href ='/home/#accordian'className="menu-item row"><span className="fa fa-th-large fa-lg offset-1 offset-sm-2 offset-lg-2 col-1 p-1"></span><span className="offset-1 offset-sm-2 col-7 col-sm-6"> Categories</span></a></div> 
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
    <span className="nav-item col-7 col-lg-7"  className="font-name">Sri Balaji Stores</span>
    </nav>
    <div className="container spacingforheader"> 
    <div className="row">
        <div className="col-12">bye</div>
        <div className="col-12">        
     </div><div className="col-12"></div>
      
    </div>
    </div>
             <div className="spinner-grow text-secondary" role="status">
            <span className="sr-only">Loading...</span>
          </div></>
        )}
    }

}

export default MyOrders