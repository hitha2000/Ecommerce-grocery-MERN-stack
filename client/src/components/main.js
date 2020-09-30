import React , {Component} from 'react';
import Home from './home';
import Groceries from './category-1';
import Beverage from './category-2';
import PersonalCare from './category-3';
import HouseHold from './category-4';
import Snacks from './category-5';
import {Switch, Redirect,Route} from 'react-router-dom';
import Item from './products';
import myOrders from './myOrders';
import RenderCard from './developers'
import UserInfo from './userInfo';

class  Main extends Component {

    constructor(props) {
        super(props);
    }

    render() {

       /* const ProdWithId = ({match}) => {
            return(
              <Item prods ={Item.filter((prod) => prod.id === parseInt(match.params.prodId,10))[0]}
              
             // comments={this.props.comments.comments.filter((comment) => comment.dishId=== parseInt(match.params.dishId,10))}
             
              />
            )
          }*/


        return(
            <div>
                
                <Switch>
                    <Route path='/home' component={Home}/>
                    <Route exact path='/grocery' component={Groceries}/>
                    <Route exact path='/grocery/:prodId' component={Item}/>
                    <Route exact path='/beverage' component={Beverage} />
                    <Route exact path='/personal' component={PersonalCare} />
                    <Route exact path='/household' component={HouseHold} />
                    <Route exact path='/snacks' component={Snacks} />
                    <Route exact path='/myorders' component={myOrders} />
                    <Route exact path='/developers' component={RenderCard}/>
                    <Route exact path='/userinfo' component={UserInfo} ></Route>
                    <Route path='/' component={Home}/>
                </Switch>

                
            </div>
        )
        
    }
} 

export default Main