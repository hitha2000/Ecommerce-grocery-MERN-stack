/*import React ,{useState,useEffect} from 'react';
import { Link } from 'react-router-dom';
import data from '../shared/datap';
import {Card,CardImg,CardBody,CardSubtitle, CardTitle, Button, Badge} from 'reactstrap'
import axios from 'axios'
function Demo(props)
{
    const[data2,setdata]=useState()
     useEffect(() => {
     const fetchusers=async()=>
     {

    try{
    var data1=await axios.get('http://localhost:5000/orders?orderid='+props.location.search.split('?orderid=')[1])
    setdata(data2)
    console.log(data1)
   
    }
    catch(error)
    {
      console.log("no orders")
    }
     
   }
   fetchusers()
  },[])
    const checkoutHandler = () => {
        props.history.push("/delivery");
      }
    return(
        <div className="container ">
        <div className="row row-content">
            <div className="col-sm-6 align-items-center justify-content-between">
            <div className="allpageheader">
                <h1><img src="/images/myorders.png" className="icons ml-2"></img> My Orders</h1>
            </div>    
                <br/>
                <div className="products">
                    {
                data.products.map(product =>
                    <Card className="pcard">
                        <div className="row no-gutters">
                            <div className="col-sm-5">
                            <span style={{textAlign:'left'}}><Badge style={{marginLeft:'8px'}} className='bg-primary'>{Math.ceil((1-(product.sp/product.mrp))*100)} %OFF</Badge></span>
                                <img className="pprod-img mt-4" src={product.image}/>                                
                            </div>
                            <div className="col-sm-7">
                                <CardBody className="card-body">                            
                                    <CardSubtitle style={{fontSize:"0.5em"},{textAlign:"center"}}><strong >{product.name}</strong>                                    
                                    <CardTitle className="mt-3" style={{fontSize:"0.5em"},{textAlign:"center"}}><strong><img src="/images/rupee.png" className="icons" alt="icons"></img>
                                    {product.sp}</strong><strong><strike style={{fontSize:"0.5em"},{padding:"3px"},{color:"grey"}}>{product.mrp}</strike></strong><strong>x{product.qty}</strong></CardTitle>                          
                                    <p className="product-price" style={{fontSize:"0.5em"},{textAlign:"center"}}>Total price <img src="/images/rupee.png" className="icons" alt="icons"></img>{product.sp*product.qty}</p>
                                    </CardSubtitle>
                                </CardBody>
                            </div>
                        </div>
                    </Card>   
                )
                }
                </div>
            </div>
            <div className="col-sm">
                <div className="pcard">
                    <h3 className="card-header text-black summary">Order Summary</h3>
                    <div className="card-body">
                        <dl className="row">
                            <dt className="col-6">Total Amount</dt>
                            <dd className="col-6"><img src="/images/rupee.png" className="icons"></img>200</dd>
                            <dt className="col-6"></dt>
                            <dd className="col-6"></dd>
                            <dt className="col-6">Delivery charges</dt>
                            <dd className="col-6"><img src="/images/rupee.png" className="icons"></img>50</dd>
                            <dt className="col-6"></dt>
                            <dd className="col-6"></dd>
                            <dt className="col-6">Total Payable Amount</dt>
                            <dd className="col-6"><img src="/images/rupee.png" className="icons"></img>250</dd>
                        </dl>
                    </div>                    
                </div>
                <br></br>
                            
            </div>
         </div>
    </div>
    );
}

export default Demo;*/



import React,{useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import {Card,CardImg,CardBody,CardText,CardSubtitle,Button,CardTitle, Row, Badge} from 'reactstrap'
//import data from '../shared/datap';
import axios from 'axios'
import Cookie from 'js-cookie'
import { slide as Menu } from 'react-burger-menu'

 var totalmrp=0
function arrayBufferToBase64(buffer) {
    var binary = '';
    var bytes = [].slice.call(new Uint8Array(buffer));
    bytes.forEach((b) => binary += String.fromCharCode(b));
    return window.btoa(binary);
  };

function Summary()

{
    return(
        <RenderPaymentSummary/>
    )
}



function RenderItem({product})
{
    const[img,setimg]=useState('');
  
    useEffect(async()=>
{
  var base64Flag = 'data:image/png;base64,';
  var imageStr =await arrayBufferToBase64(product.image.data.data) 
 var image= await base64Flag + imageStr
 setimg(image)
 
},[])
   
return(
  
<Card className=' view-card' >
<span style={{textAlign:'left'}}><Badge style={{marginLeft:'8px'}} className='bg-primary'>{Math.ceil((1-(product.sp/product.mrp))*100)} %OFF</Badge></span>
  <CardImg  className="prod-img"   src={img}/>
  <CardBody className="prod-card-body">
<div className="cart1">
<p className='prod-text1 m-0' style={{textAlign:"center"}}><strong >{product.productname}</strong><strong >{' '}{product.quantity}*{product.count}</strong></p>
<p className='prod-text2 m-0' ><strong><span className='fa fa-rupee'></span> {product.sp}</strong><strong><strike style={{color:"grey"}}>{product.mrp}</strike></strong></p></div>
<div className="cart2">

      </div>
  </CardBody>
</Card>

    )

}


function RenderPaymentSummary({product})
{
if(product)
   { const total=product.products.map((item)=>
    {
        totalmrp=totalmrp+(item.mrp*item.count)
    })
    return(
        <div className='container detailsummary'>
            
        <div className="offset-sm-1 col-12 col-sm-10">
                <div className="paysummarycard">
                    <h3 className="card-header text-black summary">Order Summary</h3>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-6">Total MRP</div>
                            <div className="col-6"><img src="/images/rupee.png" className="icons"></img>{totalmrp}</div>
                            <div className="col-6"></div>
                            <div className="col-6"></div>
                            <div className="col-6">Delivery charges</div>
                            <div className="col-6"><strong style={{color:'green'}}>FREE</strong></div>
                            <div className="col-6"></div>
                            <div className="col-6"></div>
                            <div className="col-6">Total Payable Amount</div>
                            <div className="col-6"><img src="/images/rupee.png" className="icons"></img>{product.totalamount}</div>
                        </div>
                    </div>                    
                </div>
                <br></br>
                           
            </div>
            </div>
    )
   }
   else
   {
       return(<>Loading</>)
   }
}

function Item(props)
  {
    const [data, setdata] = useState('')
    const userinform=JSON.parse(Cookie.get('userInfo'))
    
    
    useEffect(() => {
        
        const fetchorders=async()=>{
            let config = {
                headers: {'Authorization': 'Bearer ' + userinform.token},
                params: {
                    orderid: props.location.search.split('?orderid=')[1]
                }
              }

         const d = await axios.get('http://localhost:5000/orders/',config)
        setdata(d.data.order[0])
        }
       fetchorders()        
       
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
 
 
    if(data) {

    const items=data.products.map((item)=>
    {

      
      return(
        
        <div key={item.productid} className="  col-12 offset-sm-0 col-md-4 col-lg-3">
          <RenderItem product={item}/>
         
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
        <div className="container ">
            <div className="row row-content">
                <div className="col-12 align-items-center justify-content-between mt-3">
                    <div className="allpageheader">
                        <h1><img src="/images/myorders.png" className="icons ml-2"></img> Order Details</h1>
                    </div>
                    <br/>
                </div>
            </div>
            <div className="row">
                {items}
            </div>
            <div  className="offset-1 col-10 mt-4">
            <RenderPaymentSummary product={data}/>
            </div>
        </div>   
        </>   
    )
    }
    else {
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
    <span className="nav-item col-7 col-lg-7 font-name"  >Sri Balaji Stores</span>
    </nav>
    <div className="container spacingforheader"> 
    <div className="row">
        <div className="col-12">bye</div>
        <div className="col-12">        
     </div><div className="col-12"></div>
      
    </div>
    </div>
        Loading
        </>)
    }
}
 export default Item
