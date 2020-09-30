import React, { useState, useEffect } from 'react';
import {Nav, NavItem, Navbar, Button,Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input} from 'reactstrap'
import {Link } from 'react-router-dom'
import { checkPropTypes } from 'prop-types';
import  { Redirect } from 'react-router-dom';
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
import { Card, CardHeader, CardImg, CardBody, CardTitle, CardText, CardImgOverlay } from 'reactstrap';
import Item from './products'
import axios from 'axios'
//import {Loading} from './LoadingComponent';

function RenderItem ({item}) {
    return(
        <Card className='acc-card'>
            <CardImg className='acc-img' width='100%' src={item.image} alt={item.name}></CardImg>
            <CardBody style={{height:'60px'}}>
            <CardText style={{fontSize:'12px'}}><strong>{item.name}</strong></CardText>
            </CardBody>
        </Card>
    );
}

function Home(props)
{
    const [email, setEmail] = useState('');
    const [password , setPassword] = useState('');
    const [isModalOpen , setToggle] = useState(false);
    const [isinfoOpen,setInfo]=useState(false)
   // const redirect = props.location.search ? props.location.search.split("=")[1] : '/';
    //useEffect(() => {
      //  props.history.push(redirect);
   // })

   
  const[state,setstate]=useState({name:'', phone:'', address:'' });
     const[isSubmit,setSubmit] = useState(false);

     function handleChange(e)
     {
         setstate({...state,[e.target.name]:e.target.value}) 
     }
     function submithandle(e)
     {
         e.preventDefault();
         const info=
         {
             name: state.name,
             phone:state.phone,
             address: state.address
            
         }
         setInfo(!isinfoOpen)
    }
     function handleSubmit(e) {
      
       setInfo(!isinfoOpen)
   }
    


   function toggleModal(prevState) {
       setToggle(!isModalOpen)
   } 

   function submitHandler(e) {
       toggleModal();
       setInfo(true);
       e.preventDefault();

   }
   
   
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
   

  

    return(
        <>
        <Navbar color='primary' expand='md'>
            <div className='container'>
            <Nav className='ml-auto'>
                <NavItem>
                <Button onClick={toggleModal}> <span className= "fa fa-sign-in fa-lg" ></span> Sign-In</Button>
                </NavItem>
               
            </Nav>
            </div>
            
        </Navbar>
        <div className='container'>
        <Modal isOpen = {isModalOpen} toggle={toggleModal}>
            <ModalHeader toggle={toggleModal} className='modal-text'> <strong>SIGN-IN</strong> </ModalHeader>
            <ModalBody>
                <Form onSubmit={submitHandler}>
                    <FormGroup>
                        <Label htmlFor='email'><strong> Email</strong> </Label>
                        <Input type='email' name='email' id='email' placeholder='Email'  onChange= {(e)=> setEmail(e.target.value)}></Input>
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor='password'> <strong>Password</strong></Label>
                        <Input type='password' name='password' id='password' placeholder='Password' onChange={(e)=> setPassword(e.target.value)}></Input>
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor='repassword'> <strong>Confirm Password</strong></Label>
                        <Input type='password' name='repassword' id='repassword' placeholder=' Confirm Password' onChange={(e)=> setPassword(e.target.value)}></Input>
                    </FormGroup>
                    <FormGroup className='row'>
                        <Button className='col-10 col-sm-6 offset-sm-3' type='submit' value='submit' color='primary'><span className='fa fa-paper-plane fa-lg' ></span>  Submit </Button>
                    </FormGroup>
                    <FormGroup className='row'>
                        <Button className='col-10 col-sm-6 offset-sm-3' type='submit' value='submit' color='danger'> <span className="fa fa-google fa-lg" ></span>   Sign-In with Google</Button>
                    </FormGroup>
                    <FormGroup className='row'>
                        <Button className='col-10 col-sm-6 offset-sm-3' type='submit' value='submit' color='primary'> <span className="fa fa-facebook fa-lg" ></span>   Sign-In with facebook</Button>
                    </FormGroup>
                </Form>
            </ModalBody>
        </Modal>
        </div>
        

      <div className='container'>
        <Modal isOpen={isinfoOpen} toggle={handleSubmit} >
                <ModalHeader toggle={handleSubmit}><strong>Customer Information</strong></ModalHeader>
                <ModalBody>
                    <Form onSubmit={submithandle}>
                        <FormGroup>
                            <Label htmlFor='name'><strong> Name</strong> </Label>
                            <Input type="text" name="name" value={state.name} onChange={(e)=>handleChange(e)}/>
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor='phone'><strong> Contact Number</strong> </Label>
                            <Input type="number" name="phone" value={state.phone} onChange={(e)=>handleChange(e)}/>
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor='address'><strong>Address</strong>  </Label>
                            <Input type='textarea' name='address' value={state.address} onChange={(e)=>handleChange(e)}/>
                        </FormGroup>
                        <FormGroup className='row'>
                            <Button className='col-10 col-sm-6 offset-sm-3' type='submit' value='submit'> Submit </Button>
                        </FormGroup>
                    </Form>
                </ModalBody>
            </Modal>
    </div>

    <div>
        <Item/>
    </div>

        <Accordion>
            <AccordionItem >
                <AccordionItemHeading >
                    <AccordionItemButton className=' container jumbotron'>
                    
                            <div className='row '>
                                <div className='col-5 col-sm-3'>
                                    <img  className='images' src={`${process.env.PUBLIC_URL}/images/category1.jpg`} alt='groceries'/>
                                </div>
                                <div className='col-7 col-sm-7 acc-font'>
                                    <h><strong>Groceries and Staples</strong></h>
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
                                    <h><strong>Beverages and Health Drinks</strong></h>
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
                                    <h><strong>Personal Care</strong></h>
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
                    
                            <div className='row '>
                                <div className='col-5 col-sm-3'>
                                    <img  className='images' src={`${process.env.PUBLIC_URL}/images/category4.jpg`} alt='groceries'/>
                                </div>
                                <div className='col-7 col-sm-7 acc-font'>
                                    <h><strong>Household Items</strong></h>
                                </div>
                            </div>
                    
                    </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                <div className='container card-container'>
                <div className='row ' style={{justifyContent:'center'}}>
                    {household}
                </div>
                </div>
                </AccordionItemPanel>
            </AccordionItem>
            <AccordionItem>
                <AccordionItemHeading>
                    <AccordionItemButton  className='container jumbotron'>
                    
                            <div className='row'>
                                <div className='col-5 col-sm-3'>
                                    <img  className='images' src={`${process.env.PUBLIC_URL}/images/category5.jpg`} alt='groceries'/>
                                </div>
                                <div className='col-7 col-sm-7 acc-font'>
                                    <h><strong>Snacks and Ready to Eat</strong></h>
                                </div>
                            </div>
                    
                    </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                <div className='container card-container'>
                <div className='row 'style={{justifyContent:'center'}}>
                    {snack}
                </div>
                </div>
                </AccordionItemPanel>
            </AccordionItem>
        </Accordion>

        </>
     
    )
}
export default Home