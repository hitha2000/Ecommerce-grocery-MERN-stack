import React ,{useState} from 'react';
import Item from './itemComponent'
import {Link} from 'react-router-dom'
import { slide as Menu } from 'react-burger-menu'
function Head()
{
  const [isOpen, setSide] = useState(false)
  function handleClick()
  {
    setSide(!isOpen)
  }
  function showSettings (event) {
    event.preventDefault();
    
  }
    return(

        <div>
         <Menu className="sidebar" isOpen={ isOpen }>
           <div className="container">
             <div className="row">
            
          <div className="col-12 navtop"><div className="row"><div className="offset-1 col-7"><p style={{cursor:"pointer"}}><span className="fa fa-sign-in "></span> SignIn</p></div><p onClick={handleClick} className=" col-2 fa fa-arrow-left "style={{cursor:"pointer"}}></p></div></div>
          <div className="side-items">
          <div className="col-12 container"><a href ='/home'className="menu-item row"><span className="fa fa-home fa-lg offset-1 offset-sm-2  offset-lg-2 col-1 p-1"></span><span className="offset-1 offset-sm-2  col-7 col-sm-6">Home</span></a></div> 
          <div className="col-12 container"><a href ='#productcategories'className="menu-item row"><span className="fa fa-th-large fa-lg offset-1 offset-sm-2 offset-lg-2 col-1 p-1"></span><span className="offset-1 offset-sm-2 col-7 col-sm-6"> Categories</span></a></div> 
          <div className="col-12 container"><a href ='/myorders'className="menu-item row"><span className="fa fa-th-list fa-lg offset-1 offset-sm-2 offset-lg-2 col-1 p-1"></span><span className="offset-1 offset-sm-2 col-7 col-sm-6">  MyOrders</span></a></div> 
          <div className="col-12 container"><a href ='/myaccount'className="menu-item row"><span className="fa fa-user fa-lg offset-1 offset-sm-2 offset-lg-2 col-1 p-1"></span><span className="offset-1 offset-sm-2 col-7 col-sm-6"> MyAccount</span></a></div> 
          <div className="col-12 container"><a href ='/aboutus'className="menu-item row"><span className="fa fa-info fa-lg offset-1 offset-sm-2 offset-lg-2 col-1 p-1"></span><span className="offset-1 offset-sm-2 col-7 col-sm-6"> AboutUs</span></a></div> 
          <div className="col-12 container"><a href ='/websitedeveloped'className="menu-item row"><span className="fa fa-connectdevelop fa-lg offset-1 offset-sm-2 offset-lg-2 col-1 p-1"></span><span className="offset-1 offset-sm-2 col-7 col-sm-6"> DevelopedBy</span></a></div> 
          <div className="col-12 container"><a href ='/logout'className="menu-item row"><span className="fa fa-sign-out fa-lg offset-1 offset-sm-2 offset-lg-2 col-1 p-1"></span><span className="offset-1 offset-sm-2 col-7 col-sm-6"> LogOut</span></a></div> 

        
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
    <input type="text" className="form-control" placeholder="Search For Products" style={{width:"100%"}}/>
    <img src={`${process.env.PUBLIC_URL}/images/search.png`}className="btn menu" style={{width:"1rem"},{height:"1.5rem"}} id="searchicon"/>

    
  </form>
<img  src={`${process.env.PUBLIC_URL}/images/cart.png`} className="btn menu cart nav-item" style={{width:"2rem"},{height:"2rem"}}/>

 

</nav>


<Item/>

</div>
    )
}
export default Head