import React from 'react';
import {Link} from 'react-router-dom'
function CategScroll()
{ 
    return(
        <div className="container" >
            <div className="row">
    <div className="box  col-12">
        <div className="itemsscroll">
            <Link  to='/groceryandstaples'><img  src={`${process.env.PUBLIC_URL}/images/grocery.png`}></img><h6>Grocery & Staples</h6></Link>

        </div>
        <div className="itemsscroll">
           <Link to='/beverages'> <img   src={`${process.env.PUBLIC_URL}/images/tea1.jpg`}></img><h6>Beverages</h6></Link>

        </div>
        <div className="itemsscroll">
          <Link to ='/personalcare'><img   src={`${process.env.PUBLIC_URL}/images/dove.jpeg`}></img><h6>Personal Care</h6></Link>  

        </div>
        <div className="itemsscroll">
            <Link to="/household"><img  src={`${process.env.PUBLIC_URL}/images/lizol.jpg`}></img><h6>Household Items</h6></Link>

        </div>
        <div className="itemsscroll">
           <Link to='/snacks'><img  src={`${process.env.PUBLIC_URL}/images/goodday.png`}></img><h6 className="pl-4">Snacks</h6></Link> 
            

        </div>
        </div>
    </div>
    </div>)

}
export default CategScroll