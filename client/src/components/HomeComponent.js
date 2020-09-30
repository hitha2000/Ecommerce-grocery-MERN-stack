import React,{useState}from 'react';
import {Card,CardImg,CardText,CardTitle,CardSubtitle, CardBody,Jumbotron, Row,Form,Control} from 'reactstrap'


import { slide as Menu } from 'react-burger-menu'
import Carousel from "react-elastic-carousel";
import ScrollItem from './scrollComponent'
import CategScroll from './CategoryScroll'
import HomeHeader from './HomeHeader'
import Accord from './AccordianComponent'
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from 'react-accessible-accordion';

import {GROCERIES} from '../shared/grocery';
import {BEVERAGES} from '../shared/beverage';
import {PERSONALCARE} from '../shared/personalCare';
import {HOUSEHOLD} from '../shared/householdItems';
import {SNACKS} from '../shared/snacks';

import {Link} from 'react-router-dom'
const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 550, itemsToShow: 1 },
  { width: 768, itemsToShow: 1 },
  { width: 1200, itemsToShow: 1 },
];

const grocery = GROCERIES.map((item) => {
       
  return(
          <div key={item.id} className='col-6 col-sm-2 p-2 '>
              <RenderItem item={item}/>
          </div>
      )
  
  });
  const beverage = BEVERAGES.map((item) => {
     
      return(
              <div key={item.id} className='col-6 col-sm-2 p-2 '>
                  <RenderItem item={item}/>
              </div>
          )
      
  });
  const personal = PERSONALCARE.map((item) => {
     
      return(
              <div key={item.id} className='col-6 col-sm-2 p-2 '>
                  <RenderItem item={item}/>
              </div>
          )
      
  });
  const household =HOUSEHOLD.map((item) => {
     
      return(
              <div key={item.id} className='col-6 col-sm-2 p-2 '>
                  <RenderItem item={item}/>
              </div>
          )
      
  });
  const snack = SNACKS.map((item) => {
     
      return(
              <div key={item.id} className='col-6 col-sm-2 p-2 '>
                  <RenderItem item={item}/>
              </div>
          )
      
  });

  function RenderItem ({item}) {
      return(
        <Link to={{
            pathname: "/items",
            search: "?category="+item.category+"?subcategory="+item.subcategory,
            state: {
                name: item.name
              } 
          }}>
          <Card className='acc-card'>
              <CardImg className='acc-img' width='100%' src={item.image} alt={item.name}></CardImg>
              <CardBody style={{height:'60px'}}>
              <CardText style={{fontSize:'12px'}}><strong>{item.name}</strong></CardText>
              </CardBody>
          </Card>
        </Link>
      );
  }


 

function Home()
{ 
  const [isOpen, setSide] = useState(false)
  function handleClick()
  {
    setSide(!isOpen)
  }
  function showSettings (event) {
    event.preventDefault();
    
  }

  const[accordspacing,setaccordspacing]=useState({})
  
function dynamic()
{
    var s={}
    s.padding="150px"
    setaccordspacing(s)

}



   
    return(
        <>
        
        <HomeHeader/>
        <div className="spacingcat"></div>
    
<div  className="categheight mt-4">

           <CategScroll/>
           </div>

<div>
<div className="container mt-5">
      <div>
        <Carousel breakPoints={breakPoints} style={{height:"15rem"},{backgroundcolor:"orange"}} enableAutoPlay autoPlaySpeed={2500}>
          <img src={`${process.env.PUBLIC_URL}/images/homescreen1.png`} className="d-block w-100" style={{height:"13rem"}}></img>
          <img src={`${process.env.PUBLIC_URL}/images/homescreen4.png`} className="d-block w-100"style={{height:"13rem"}}></img>
          <img src={`${process.env.PUBLIC_URL}/images/homescreen2.jpeg`} className="d-block w-100"style={{height:"13rem"}}></img>
        
          
        </Carousel>
        
         </div>
         </div>        
<ScrollItem/>
{/*<div className="accordianstyling">
         <Accordion id="accordian">
            <AccordionItem >
                <AccordionItemHeading >
                    <AccordionItemButton className='container jumbotron'>
                    
                            <div className='row'>
                                <div className='col-5 col-sm-3'>
                                    <img  className='images' src={`${process.env.PUBLIC_URL}/images/category1.jpg`} alt='groceries'/>
                                </div>
                                <div className='col-7 col-sm-7'>
                                    <h3 className='acc-align mt-4'>Groceries and Staples</h3>
                                </div>
                            </div>
                    </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel >
                <div className='container card-container '>
                <div className='row ' style={{justifyContent:'center'}}>
                    {grocery}
                </div>
                </div>
                </AccordionItemPanel>
            </AccordionItem>
            <AccordionItem>
                <AccordionItemHeading>
                    <AccordionItemButton  className='container jumbotron'>
                    
                            <div className='row '>
                                <div className='col-5 col-sm-3'>
                                    <img  className='images' src={`${process.env.PUBLIC_URL}/images/category2.jpg`} alt='groceries'/>
                                </div>
                                <div className='col-7 col-sm-7 acc-font'>
                                    <h3 className='acc-align mt-4'>Beverages and Health Drinks</h3>
                                </div>
                            </div>
                    
                    </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                <div className='container card-container' >
                <div className='row ' style={{justifyContent:'center'}}>
                    {beverage}
                </div>
                </div>
                </AccordionItemPanel>
            </AccordionItem>
            <AccordionItem>
                <AccordionItemHeading>
                    <AccordionItemButton  className='container jumbotron'>
                    
                            <div className='row ' >
                                <div className='col-5 col-sm-3'>
                                    <img  className='images' src={`${process.env.PUBLIC_URL}/images/category3.jpg`} alt='groceries'/>
                                </div>
                                <div className='col-7 col-sm-7 acc-font'>
                                    <h3 className='acc-align mt-4'>Personal Care</h3>
                                </div>
                            </div>
                    
                    </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                <div className='container card-container'>
                <div className='row ' style={{justifyContent:'center'}}>
                    {personal}
                </div>
                </div>
                </AccordionItemPanel>
            </AccordionItem>
            <AccordionItem>
                <AccordionItemHeading>
                    <AccordionItemButton  className='container jumbotron'>
                    
                            <div className='row'>
                                <div className='col-5 col-sm-3'>
                                    <img  className='images' src={`${process.env.PUBLIC_URL}/images/category4.jpg`} alt='groceries'/>
                                </div>
                                <div className='col-7 col-sm-7 '>
                                    <h3 className='acc-align mt-4'>Household Items</h3>
                                </div>
                            </div>
                    
                    </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                <div className='container card-container'>
                <div className='row' style={{justifyContent:'center'}}>
                    {household}
                </div>
                </div>
                </AccordionItemPanel>
            </AccordionItem>
            <AccordionItem>
                <AccordionItemHeading>
                    <AccordionItemButton  className='container jumbotron' onClick={dynamic}>
                    
                            <div className='row'>
                                <div className='col-5 col-sm-3'>
                                    <img  className='images' src={`${process.env.PUBLIC_URL}/images/category5.jpg`} alt='groceries'/>
                                </div>
                                <div className='col-7 col-sm-7 '>
                                    <h3 className='acc-align mt-4'>Snacks and Ready to Eat</h3>
                                </div>
                            </div>
                    
                    </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel >
                <div className='container card-container'>
                <div className='row 'style={{justifyContent:'center'}}>
                    {snack}
                </div>
                </div>
                </AccordionItemPanel>
            </AccordionItem>
        </Accordion>
    </div>*/}





        <section id="accordian">
        <details open>
            <summary  className='container jumbotron' >
            <div className='row'>
                                <div className='col-5 col-sm-3'>
                                    <img  className='images' src={`${process.env.PUBLIC_URL}/images/category1.jpg`} alt='groceries'/>
                                </div>
                                <div className='col-7 col-sm-7 '>
                                    <h2>Groceries and Staples</h2>
                                </div>
                            </div>
            </summary>
            <div>
        
             <div className='container card-container'>
                <div className='row 'style={{justifyContent:'center'}}>
                {grocery}
                </div>
                </div> 
            </div>
        </details>
        <details open>
            <summary  className='container jumbotron' >
            <div className='row'>
                                <div className='col-5 col-sm-3'>
                                    <img  className='images' src={`${process.env.PUBLIC_URL}/images/category2.jpg`} alt='groceries'/>
                                </div>
                                <div className='col-7 col-sm-7'>
                                    <h2>Beverages and Health Drinks</h2>
                                </div>
                            </div>
            </summary>
            <div>
        
            <div className='container card-container'>
                <div className='row 'style={{justifyContent:'center'}}>
                    {beverage}
                </div>
                </div> 
            </div>
        </details>
        <details open>
            <summary  className='container jumbotron' >
            <div className='row'>
                                <div className='col-5 col-sm-3'>
                                    <img  className='images' src={`${process.env.PUBLIC_URL}/images/category3.jpg`} alt='groceries'/>
                                </div>
                                <div className='col-7 col-sm-7'>
                                    <h2>Personal Care</h2>
                                </div>
                            </div>
            </summary>
            <div>
        
            <div className='container card-container'>
                <div className='row 'style={{justifyContent:'center'}}>
                    {personal}
                </div>
                </div> 
            </div>
        </details>
        <details open>
            <summary  className='container jumbotron' >
            <div className='row'>
                                <div className='col-5 col-sm-3'>
                                    <img  className='images' src={`${process.env.PUBLIC_URL}/images/category4.jpg`} alt='groceries'/>
                                </div>
                                <div className='col-7 col-sm-7'>
                                    <h2>Household Items</h2>
                                </div>
                            </div>
            </summary>
            <div>
        
            <div className='container card-container'>
                <div className='row 'style={{justifyContent:'center'}}>
                {household}
                </div>
                </div> 
            </div>
        </details>
        <details open>
            <summary  className='container jumbotron' >
            <div className='row'>
                                <div className='col-5 col-sm-3'>
                                    <img  className='images' src={`${process.env.PUBLIC_URL}/images/category5.jpg`} alt='groceries'/>
                                </div>
                                <div className='col-7 col-sm-7'>
                                    <h2>Snacks and Ready to Eat</h2>
                                </div>
                            </div>
            </summary>
            <div>
        
             <div className='container card-container'>
                <div className='row 'style={{justifyContent:'center'}}>
                    {snack}
                </div>
                </div> 
            </div>
        </details>
    </section>




<div className="footer" style={accordspacing}>
        <div className="container">
        <div className="row justify-content-center">
        
                        
               
                <div className=" offset-2 col-10 offset-sm-1 col-sm-5">
                    <h5>Our Address</h5>
                    <address>
		              4th MAIN ROAD,
		              KHM BLOCK <br />
                      RT NAGAR BANGALORE<br /><br/>
                      <h5>Contact Us</h5>
		              Store Landline: 080-2334716 <br />
		              Phone Numer : 7996293760 <br />
		              E-Mail: <a href="mailto:gpsuhas20@gmail.com" >
                         gpsuhas20@gmail.com</a>
                    </address>
                </div> 
                <div className="col-11 offset-1 col-sm-5 ">
                    
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.210696164207!2d77.58947291409599!3d13.022250590822683!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae17b0b8ca8bf7%3A0x401f13df09cce5db!2sSri%20Balaji%20Stores!5e0!3m2!1sen!2sin!4v1597945725467!5m2!1sen!2sin" ></iframe>
                </div>
            </div>
            <div className="row justify-content-center">
                <div className=" col-12 col-sm-2"><h4 style={{textAlign:"center"}}>Payments Options</h4></div>
                <div className=" col-6  col-sm-2 btn menu">
        <img src={`${process.env.PUBLIC_URL}/images/phonepefooter.png`}style={{width:"20px"},{height:"20px"}}></img>

        </div>
        <div className="col-6 col-sm-2  btn menu">
        <img src={`${process.env.PUBLIC_URL}/images/googlepay.png`}style={{width:"20px"},{height:"20px"}}></img>

        </div>
        <div className=" col-6 col-sm-2  btn menu">
        <img src={`${process.env.PUBLIC_URL}/images/amazon.png`}style={{width:"20px"},{height:"20px"}}></img>

        </div>
        <div className="col-6 col-sm-2   btn menu">
        <img src={`${process.env.PUBLIC_URL}/images/paytmfooter.png`}style={{width:"15px"},{height:"15px"}}></img>

        </div>
        <div className="offset-2  offset-sm-0 col-6 col-sm-2"><p style={{margintop:"20px"}}>Cash On Delivery</p></div>
            </div>
            <div className="row ">             
                <div className="offset-2 col-10 offset-sm-4 col-sm-6 ">
                    
                    <p>© Copyright 2020 Sri Balaji Stores</p>
                </div>
            </div>
        </div>
    </div>
    </div>

    
</>
    )
}


export default Home

//https://www.colorhexa.com/f5f5f5

