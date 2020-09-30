/*import React from 'react';
import Home from './HomeComponent'
import Admin from './Admin'
import {Switch,Route,Redirect,withRouter, Router} from 'react-router-dom'
import {Card,CardImg,CardBody,CardText,CardSubtitle,Button,CardTitle, Row, Badge,Jumbotron,Form} from 'reactstrap'
import Developers from'./developers'
import Head from './NewHead'
import Groceries from './category-1';
import Beverage from './category-2';
import PersonalCare from './category-3';
import HouseHold from './category-4';
import Snacks from './category-5';
import SearchTest from './SearchTest'
import UserAdmin from './UsersAdmin'
import MyOrders from './myOrders'
import UserInfo from './userInfo';
import Item from './products';
import Aboutus from './AboutUs'
import SearchItems from './SearchItems'
import SearchComponent from './searchComponent'
import CartItem from './CartComponent'
import Payment from './PaymentComponent'
import Delivery from './DeliveryComponent'
import OrderDetails from './ViewOrder'

function Main()
{
    
    return(
        <>
       <Switch>
            <Route path="/home" component={Home}/>
            <Route path='/search' component={SearchTest}/>
            <Route path='/admin' component={Admin}/>
            <Route path='/useradmin' component={UserAdmin}/>
            <Route path='/developedby' component={Developers}/>
            <Route path='/myorders' component={MyOrders}/>
           
           
            
            <Route exact path='/groceryandstaples' component={Groceries}/>
                    <Route exact path='/grocery/:prodId' component={Item}/>
                    <Route exact path='/beverages' component={Beverage} />
                    <Route exact path='/personalcare' component={PersonalCare} />
                    <Route exact path='/household' component={HouseHold} />
                    <Route exact path='/snacks' component={Snacks}/>
                    <Route exact path='/myaccount' component={UserInfo}></Route>
                    <Route exact path='/aboutus' component={Aboutus}></Route>
                    <Route exact path='/cart' component={CartItem}/>
                    <Route exact path='/payment' component={Payment}/>
                    <Route exact path='/delivery' component={Delivery}/>
                    <Route exact path='/orderdetails' component={OrderDetails}/>
                    <Route exact path='/searchitems/:product?' component={SearchItems}/>
                    <Route exact path='/' component={Home}/>
                    <Route exact path='/items/:category?/:subcategory?' component={Item}/>
                    <Route exact path='/products/:search?' component={SearchComponent}/>
                    <Route exact path='/orders/:orderid?' component={OrderDetails}/>  
    </Switch>
       </> 
    )
}
export default Main 
*/


import React from 'react';
import Home from './HomeComponent'
import Admin from './Admin'
import {Switch,Route,Redirect,withRouter, Router} from 'react-router-dom'
import {Card,CardImg,CardBody,CardText,CardSubtitle,Button,CardTitle, Row, Badge,Jumbotron,Form} from 'reactstrap'
import Developers from'./developers'
import Head from './NewHead'
import Groceries from './category-1';
import Beverage from './category-2';
import PersonalCare from './category-3';
import HouseHold from './category-4';
import Snacks from './category-5';
import SearchTest from './SearchTest'
import UserAdmin from './UsersAdmin'
import MyOrders from './myOrders'
import UserInfo from './userInfo';
import Item from './products';
import Aboutus from './AboutUs'
import SearchItems from './SearchItems'
import SearchComponent from './searchComponent'
import CartItem from './CartComponent'
import Payment from './PaymentComponent'
import Delivery from './DeliveryComponent'
import OrderDetails from './ViewOrder'
import Logout from './logout';
import history from '../history'
import Login from './Login';
import Signup from './Signup';
import CustomerInfo from './CustomerInfo';

function Main()
{
    
    return(
        <>
       <Router history={history} >
         
            <Route exact path="/home" component={Home}/>
            <Route exact path='/search' component={SearchTest}/>
            <Route exact path='/admin' component={Admin}/>
            <Route exact path='/useradmin' component={UserAdmin}/>
            <Route exact path='/developedby' component={Developers}/>
            <Route exact path='/myorders' component={MyOrders}/>
           
            <Route exact path='/items/:category?/:subcategory?' component={Item}/>
            
            <Route exact path='/groceryandstaples' component={Groceries}/>
                   
                    <Route exact path='/beverages' component={Beverage} />
                    <Route exact path='/personalcare' component={PersonalCare} />
                    <Route exact path='/household' component={HouseHold} />
                    <Route exact path='/snacks' component={Snacks}/>
                    <Route exact path='/myaccount' component={UserInfo}></Route>
                    <Route exact path='/aboutus' component={Aboutus}></Route>
                    <Route exact path='/cart' component={CartItem}/>
                    <Route exact path='/payment' component={Payment}/>
                    <Route exact path='/delivery' component={Delivery}/>
                    <Route exact path='/orderdetails' component={OrderDetails}/>
                  
                    <Route exact path='/logout' component={Logout}/>
                    <Route exact path='/login' component={Login}/>
                    <Route exact path='/signup' component={Signup}/>
                    <Route exact path='/customerinfo' component={CustomerInfo}/>
                   
                    <Route exact path='/products/:search?' component={SearchComponent}/>
                    <Route exact path='/orders/:orderid?' component={OrderDetails}/>  
                    <Route exact path='/' component={Home}/>
                    </Router>
       </> 
    )
}
export default Main   

//<Route exact path='/searchitems/:product?' component={SearchItems}/>



/*import React from 'react';
import Home from './HomeComponent'
import Admin from './Admin'
import {Switch,Route,Redirect,withRouter, Router} from 'react-router-dom'
import {Card,CardImg,CardBody,CardText,CardSubtitle,Button,CardTitle, Row, Badge,Jumbotron,Form} from 'reactstrap'
import Developers from'./developers'
import Head from './NewHead'
import Groceries from './category-1';
import Beverage from './category-2';
import PersonalCare from './category-3';
import HouseHold from './category-4';
import Snacks from './category-5';
import SearchTest from './SearchTest'
import UserAdmin from './UsersAdmin'
import MyOrders from './myOrders'
import UserInfo from './userInfo';
import Item from './products';
import Aboutus from './AboutUs'
import SearchItems from './SearchItems'
import SearchComponent from './searchComponent'
import CartItem from './CartComponent'
import Payment from './PaymentComponent'
import Delivery from './DeliveryComponent'
import OrderDetails from './ViewOrder'
import Logout from './logout';
import history from '../history'

function Main()
{
    
    return(
        <>
       <Router history={history} >
       
            <Route  path="/home" component={Home}/>
            <Route  path='/search' component={SearchTest}/>
            <Route  path='/admin' component={Admin}/>
            <Route  path='/useradmin' component={UserAdmin}/>
            <Route  path='/developedby' component={Developers}/>
            <Route  path='/myorders' component={MyOrders}/>
           
            <Route  path='/items/:category?/:subcategory?' component={Item}/>
            
            <Route  path='/groceryandstaples' component={Groceries}/>
                   
                    <Route  path='/beverages' component={Beverage} />
                    <Route  path='/personalcare' component={PersonalCare} />
                    <Route  path='/household' component={HouseHold} />
                    <Route  path='/snacks' component={Snacks}/>
                    <Route  path='/myaccount' component={UserInfo}></Route>
                    <Route  path='/aboutus' component={Aboutus}></Route>
                    <Route  path='/cart' component={CartItem}/>
                    <Route  path='/payment' component={Payment}/>
                    <Route  path='/delivery' component={Delivery}/>
                    <Route  path='/orderdetails' component={OrderDetails}/>
                  
                    <Route  path='/logout' component={Logout}/>
                   
                    <Route  path='/products/:search?' component={SearchComponent}/>
                    <Route  path='/orders/:orderid?' component={OrderDetails}/>  
                    <Route  path='/'  component={Home}/>
                    </Router>
       </> 
    )
}
export default Main */