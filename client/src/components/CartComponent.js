/*import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import {Card,CardImg,CardBody,CardText,CardSubtitle,Button,CardTitle, Row, Badge} from 'reactstrap'
import data from '../shared/datap';

function CartComponent(props)
{
var data2=localStorage.getItem('cartItems');
console.log(data2)
  
    const checkoutHandler = () => {
        props.history.push("/delivery");
      }
    return(
        <div className="container">
        <div className="row row-content">
            <div className="col-sm-6 align-items-center justify-content-between">
                <div className="allpageheader">
                    <h1><img src="/images/mycart.png" className="icons ml-2" alt="icons"></img> My Cart</h1>
                </div>
                <br/>
                <div className="products">
                {
                data.products.map(product =>                
                    <Card key ={product.id} className="pcard">
                        <div className="row no-gutters">
                            <div className="col-sm-5">
                            <span style={{textAlign:'left'}}><Badge style={{marginLeft:'8px'}} className='bg-primary'>{Math.ceil((1-(product.sp/product.mrp))*100)} %OFF</Badge></span>
                                <img className="pprod-img mt-4" src={product.image}/>
                            </div>
                            <div className="col-sm-7">
                                <CardBody className="card-body">  

                                    <CardTitle style={{fontSize:"0.5em"},{textAlign:"center"}}><strong><img src="/images/rupee.png" className="icons" alt="icons"></img>
                                    {product.sp}</strong><strong><strike style={{fontSize:"0.5em"},{padding:"3px"},{color:"grey"}}>{product.mrp}</strike></strong><strong>x{product.qty}</strong></CardTitle>                          
                                    <CardSubtitle style={{fontSize:"0.5em"},{textAlign:"center"}}><strong >{product.name}</strong>                                                                 
                                    <p><button className="pcartbutton">-</button><span style={{fontSize:"0.7rem"}}><b>Add to Cart</b></span><button className="pcartbutton">+</button></p>
                                    <Button onClick={checkoutHandler} className="premovebutton btn-lg">
                                        <img src="/images/deletebin.png" className="icons" alt="icons"></img>
                                        Remove
                                    </Button>
                                    </CardSubtitle>
                                </CardBody>
                            </div>
                        </div>                       
                    </Card>                          
                )
                }   
  
                <hr></hr>
            </div>
            </div>
            <div className="col-sm">
                <div className="paysummarycard">
                    <h3 className="card-header text-black summary">Order Summary</h3>
                    <div className="card-body">
                        <dl className="row">
                            <dt className="col-6">Total Amount</dt>
                            <dd className="col-6"><img src="/images/rupee.png" className="icons" alt="icons"></img>200</dd>
                            <dt className="col-6"></dt>
                            <dd className="col-6"></dd>
                            <dt className="col-6">Delivery charges</dt>
                            <dd className="col-6"><img src="/images/rupee.png" className="icons" alt="icons"></img>50</dd>
                            <dt className="col-6"></dt>
                            <dd className="col-6"></dd>
                            <dt className="col-6">Total Payable Amount</dt>
                            <dd className="col-6"><img src="/images/rupee.png" className="icons" alt="icons"></img>250</dd>
                        </dl>
                    </div>                    
                </div>
                <br></br>
                <button onClick={checkoutHandler} className="pthemebutton col-sm" style={{height:"50px"}}>
                    Proceed to Checkout
                </button>                
            </div>
         </div>
    </div>
    );
}

export default CartComponent;*/


import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import {Card,CardImg,CardBody,CardText,CardSubtitle,Button,CardTitle, Row, Badge} from 'reactstrap'
import data from '../shared/datap';
import { useSelector, useDispatch} from 'react-redux';
import {
    addToCart,
    removeFromCart
  } from '../redux/actions/cartactions';
import Cookie from 'js-cookie'
import { slide as Menu } from 'react-burger-menu'

var totalsp=0
var totalsavings=0
var totalmrp=0
var discount=0

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


    const dispatch = useDispatch();
      const[img,setimg]=useState('');
      
     
      const[count,setcount]=useState(0);

    
      useEffect(()=>
      {
    
        const fetchcount=async()=>
        {
           var countfetch=JSON.parse(localStorage.getItem(JSON.stringify(product.productid)))
           localStorage.setItem(JSON.stringify("amount"),JSON.stringify({totalsp}))
           if(countfetch && countfetch.count>=0)
           {
            setcount(countfetch.count) 
            
           }
        }
        fetchcount()
      },[])
      
     useEffect(()=>
     {
     
      if(count>0)
     { dispatch(addToCart(
        product.productid,
       product.productname,
        product.mrp,
        product.sp,
        product.quantity,
        product.category,
        product.subcategory,
        product.image,
        count))


        var newcart=JSON.parse(localStorage.getItem('newcart'))

        var  d={}
        d.productid=product.productid
        d.productname=product.productname
        d.mrp=product.mrp
        d.sp=product.sp
        d.quantity=product.quantity
        d.category=product.category
        d.subcategory=product.subcategory
        d.image=product.image
        d.count=count
        var item=newcart?newcart:[]
       
       
       function checkitem(product)
       {
            if(product.productid!=d.productid)
            {
              return(product)
            }
       }

       var newitem=item.filter(checkitem)

        newitem.push(d)// adding the updated item.


      localStorage.setItem('newcart',JSON.stringify(newitem))
       
        localStorage.setItem(JSON.stringify(product.productid),JSON.stringify({count}));
        
        
     }
     },[count])
  
       function  handlestate()
      {
        
         // setstate(false)
          setcount(count+1) 
      }
      function handleincrement()
      {
  
       totalsp=(product.sp+totalsp)
       totalmrp=(product.mrp+totalmrp)
       totalsavings=totalmrp-totalsp
       discount=((totalsavings/totalmrp)*100).toFixed(2);
       localStorage.setItem(JSON.stringify("amount"),JSON.stringify({totalsp}))
          setcount(count+1)
          
          window.location.reload(false);
         
          
      }
      
      async function handledecrement()
      {
         totalsp=(totalsp-product.sp)
         totalmrp=(product.mrp+totalmrp)
         totalsavings=totalmrp-totalsp
         discount=((totalsavings/totalmrp)*100).toFixed(2)
         localStorage.setItem(JSON.stringify("amount"),JSON.stringify({totalsp}))
         
        const c3=0;
        if( count<=1)
        {
        
         // setstate(true)
         setcount(count-1)
          dispatch(addToCart(
            product.productid,
            product.productname,
            product.mrp,
            product.sp,
            product.quantity,
            product.category,
            product.subcategory,
            product.image,
            0))

            var newcart=JSON.parse(localStorage.getItem('newcart'))

            var  d={}
            d.productid=product.productid
            d.productname=product.productname
            d.mrp=product.mrp
            d.sp=product.sp
            d.quantity=product.quantity
            d.category=product.category
            d.subcategory=product.subcategory
            d.image=product.image
            d.count=count
            var item=newcart?newcart:[]
           
           
           function checkitem(product)
           {
                if(product.productid!=d.productid)
                {
                  return(product)
                }
           }
    
           var newitem=item.filter(checkitem)
    
          
    
    
          localStorage.setItem('newcart',JSON.stringify(newitem))

      
         
           //localStorage.setItem(JSON.stringify(product.productid),JSON.stringify({state,c3}));
           localStorage.setItem(JSON.stringify(product.productid),JSON.stringify({c3}));
           window.location.reload(false);
  
        }
        else
        {setcount(count-1)
            window.location.reload(false);
        
        }
      }
     
      useEffect(async()=>
      {
        var base64Flag = 'data:image/png;base64,';
        var imageStr =await arrayBufferToBase64(product.image.data.data) 
       var image= await base64Flag + imageStr
       setimg(image)
    },[])
    if(count!=0)
  { 
return(
   
  /*  <Card className="card">
    <div className="row no-gutters">
        <div className="col-sm-5">
        <span style={{textAlign:'left'}}><Badge style={{marginLeft:'8px'}} className='bg-primary'>{Math.ceil((1-(product.sp/product.mrp))*100)} %OFF</Badge></span>
            <CardImg className="prod-img mt-4" src={img}></CardImg> 
        </div>
        <div className="col-sm-7">
            <CardBody className="card-body">  
                <p style={{fontSize:"0.5em"},{textAlign:"center"}}><strong><img src="/images/rupee.png" className="icons" alt="icons"></img>
                {product.sp*count}</strong><strong><strike style={{fontSize:"0.5em"},{padding:"3px"},{color:"grey"}}>{product.mrp*count}</strike></strong><strong>x{product.qty}</strong></p>                          
                <p style={{fontSize:"0.5em"},{textAlign:"center"}}><strong >{product.productname}</strong>    
                {product.quantity+"*"+count}                                                             
               
                <p><button className="cartbutton" onClick={handledecrement}>-</button><span style={{fontSize:"0.7rem"}}><b>{count}</b></span><button className="cartbutton" onClick={handleincrement}>+</button></p>
            
               
                </p>
            </CardBody>
        </div>
    </div>                       
</Card>  */


   /* <Card className=' prod-card' >
      <span style={{textAlign:'left'}}><Badge style={{marginLeft:'8px'}} className='bg-primary'>{Math.ceil((1-(product.sp/product.mrp))*100)} %OFF</Badge></span>
        <CardImg  className="prod-img"   src={img}/>
        <CardBody className="prod-card-body">
    
    <p className='prod-text m-0' style={{textAlign:"center"}}><strong >{product.productname}</strong><strong style={{marginLeft:"0.5rem"}}>{product.quantity}</strong></p>
    <p className='prod-text m-0' ><strong><span className='fa fa-rupee'></span> {product.sp}</strong><strong><strike style={{color:"grey"}}>{product.mrp}</strike></strong></p>
    
                <p><button className="cartbutton addtocart" onClick={handledecrement}>-</button><span className="addtocart" style={{fontSize:"0.7rem"}}><b >{count}</b></span><button className="cartbutton addtocart" onClick={handleincrement}>+</button></p>
            
        </CardBody>
      </Card>*/

   /* <Card className=' prod-card' >
      <span style={{textAlign:'left'}}><Badge style={{marginLeft:'8px'}} className='bg-primary'>{Math.ceil((1-(product.sp/product.mrp))*100)} %OFF</Badge></span>
        <CardImg  className="prod-img"   src={img}/>
        <CardBody className="prod-card-body">
    <div className="cart1">
    <p className='prod-text1 m-0' style={{textAlign:"center"}}><strong >{product.productname}</strong><strong >{' '}{product.quantity}</strong></p>
    <p className='prod-text2 m-0' style={{textAlign:"center"}} ><strong><span className='fa fa-rupee'></span> {product.sp}</strong><strong><strike style={{color:"grey"}}>{product.mrp}</strike></strong></p></div>
    <div className="cart2">
    <div className="cart-line"><button className=" cartbutton addtocart2" onClick={handledecrement}>-</button><span className="quantity" style={{fontSize:"1rem"}}><b >{count}</b></span><button className=" cartbutton addtocart2" onClick={handleincrement}>+</button></div>
           
            </div>
        </CardBody>
</Card>*/

<div className="new-card">
<Card className='prod-card1' >
<span style={{textAlign:'left'}}><Badge style={{marginLeft:'8px'}} className='bg-primary'>{Math.ceil((1-(product.sp/product.mrp))*100)} %OFF</Badge></span>
  <CardImg  className="prod-img1"  src={img}/>
  <CardBody className="prod-card-body1">
<div className="cart1">
<CardText className='prod-text1' ><strong  >{product.productname}</strong><strong >{' '}{product.quantity}</strong></CardText>
<CardText className='prod-text2' ><strong><span className='fa fa-rupee'></span> {product.sp}</strong><strong ><strike style={{color:"grey"}}>{product.mrp}</strike></strong></CardText>
</div>
<div className="cart2 col-12">
    
           <div className="cart-line row"><div className="col-1"><button className=" addtocart2 cartbutton" onClick={handledecrement}>-</button></div><div className="quantity col-1" style={{fontSize:"1rem"}}><b >{count}</b></div><div className="col-1"><button className="cartbuttonr  addtocart2 " onClick={handleincrement}>+</button></div></div>
              
      
      </div>
  </CardBody>
</Card>
</div>

    )}
    else{
        return(
           <div style={{display:"hidden"}}>
         </div>
        

        )
    }
}


function RenderPaymentSummary(props)
{
   
 
    return(
        
             <div className="col-sm">
                    <div className="paysummarycard">
                        <h3 className="card-header text-black summary">Order Summary</h3>
                        <div className="card-body">
                            <div className="row">
                            <div className="col-6">Total MRP</div>
                                <div className="col-6"><img src="/images/rupee.png" className="icons" alt="icons"></img>{totalmrp}</div>
                                <div className="col-6">Total Payable Amount</div>
                                <div className="col-6"><img src="/images/rupee.png" className="icons" alt="icons"></img>{totalsp}</div>
                                <div className="col-6"></div>
                                <div className="col-6"></div>
                                <div className="col-6">Delivery charges</div>
                                <div className="col-6"><span style={{color:'green'}}><strong>FREE</strong></span></div>
                                <div className="col-6"></div>
                                <div className="col-6"></div>
                                <div className="col-6">Total Savings</div>
                                <div className="col-6"><img src="/images/rupee.png" className="icons" alt="icons"></img>{totalsavings +"("+ discount +"%"+")"}</div>
                                
                            </div>
                        </div>                   
                    </div>
                    <br></br>
                   <Link to='/delivery'> <button className="pthemebutton col-sm" style={{height:"50px"}}>
                        Proceed to Checkout
                    </button>    </Link>            
                </div>
            
           )
}



function Item(props)
  {
    
    const checkoutHandler = () => {
      props.history.push("/delivery");
    }

//const cartItems=JSON.parse(localStorage.getItem('cartItems'));
const cartItems=JSON.parse(localStorage.getItem('newcart'));
const totalamount=JSON.parse(localStorage.getItem('totalsp'));


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


if(cartItems)
{
    if(cartItems.length>0)
    {
    const items=cartItems.map((item)=>
    {
        totalsp=(totalsp+item.sp*item.count)
        totalmrp=(totalmrp+item.mrp*item.count)
        totalsavings=totalmrp-totalsp
        discount=((totalsavings/totalmrp)*100).toFixed(2)
      return(
        <div key={item._id} className="col-10 offset-1 offset-sm-0 col-md-4 col-lg-3">
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
    <div className="container">
    <div className="row row-content">
      <div className='col-12 mt-3'>
           <div className="allpageheader">
               <h1><img src="/images/mycart.png" className="icons ml-2" alt="icons"></img> My Cart</h1>
           </div>
           <br/>
           </div>
        
    </div>
    <div className="container overlay-container "style={{backgroundColor:'white'}}>
                <h5 className='all-prod'>ALL PRODUCTS</h5>
              <div className="row">
                 
                  {items}
                
                </div>
    </div>


                  

      <div className='container ordersummary'>
         
      <div className="offset-sm-1 col-12 col-sm-10">
                    <div className="paysummarycard">
                        <h3 className="card-header text-black summary">Order Summary</h3>
                        <div className="card-body">
                            <div className="row">
                            <div className="col-6">Total MRP</div>
                                <div className="col-6"><img src="/images/rupee.png" className="icons" alt="icons"></img>{totalmrp}</div>
                                <div className="col-6">Total Payable Amount</div>
                                <div className="col-6"><img src="/images/rupee.png" className="icons" alt="icons"></img>{totalsp}</div>
                                <div className="col-6"></div>
                                <div className="col-6"></div>
                                <div className="col-6">Delivery charges</div>
                                <div className="col-6"><span style={{color:'green'}}><strong>FREE</strong></span></div>
                                <div className="col-6"></div>
                                <div className="col-6"></div>
                                <div className="col-6">Total Savings</div>
                                <div className="col-6"><img src="/images/rupee.png" className="icons" alt="icons"></img>{totalsavings +"("+ discount +"%"+")"}</div>
                                
                            </div>
                        </div>                   
                    </div>
                    <br></br>
                  <a href="/delivery"> <button className="pthemebutton col-sm" style={{height:"50px"}}>
                        Proceed to Checkout
                    </button></a>
                </div>
     
     </div>
     </div>
     </>
       )}
       else
       {
        return( <div className="" >
        <img className="emptycart mt-5" src={`${process.env.PUBLIC_URL}/images/emptycart.jpg`}/>
        <p style={{color:"orangered"}}><strong>No items in your cart</strong></p>
        <p>Your favourite items are just a click away</p>
        <Link to={{
            pathname: "/",
            
          }}>
        <p><Button className="emptycartbutton">Start Shopping</Button></p>
        </Link>
    </div>)
       }

  }
  
       else
    {
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
        <div className="" >
        <img className="emptycart mt-5" src={`${process.env.PUBLIC_URL}/images/emptycart.jpg`}/>
        <p style={{color:"orangered"}}><strong>No items in your cart</strong></p>
        <p>Your favourite items are just a click away</p>
        <Link to={{
            pathname: "/",
            
          }}>
        <p><Button className="emptycartbutton">Start Shopping</Button></p>
        </Link>
    </div>
    </>
    )
    }
      }
 export default Item

 



 