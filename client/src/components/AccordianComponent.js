import {Nav, NavItem, Navbar, Button,Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input} from 'reactstrap'
import React, { useState, useEffect } from 'react';
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


function Accord()
{
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
                <Card className='acc-card'>
                    <CardImg className='acc-img' width='100%' src={item.image} alt={item.name}></CardImg>
                    <CardBody style={{height:'60px'}}>
                    <CardText style={{fontSize:'12px'}}><strong>{item.name}</strong></CardText>
                    </CardBody>
                </Card>
            );
        }

    return(
        <>
        <div>
         <Accordion>
            <AccordionItem >
                <AccordionItemHeading >
                    <AccordionItemButton className='container jumbotron'>
                    
                            <div className='row'>
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
                    
                            <div className='row'>
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
                <div className='row' style={{justifyContent:'center'}}>
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
        </div>
        </>
    )
}
export default Accord