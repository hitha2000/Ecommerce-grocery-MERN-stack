import React, { useState } from 'react';
import {PERSONALCARE} from '../shared/personalCare';
import SearchBar from './searchbar'
import { Card, CardHeader, CardImg, CardBody, CardTitle, CardText, CardImgOverlay } from 'reactstrap';

import {Link} from 'react-router-dom'
function RenderItem ({item}) {
    return(
        <Link to={{
            pathname: "/items",
            search: "?category="+item.category+"?subcategory="+item.subcategory,
            state: {
                name: item.name
              } 
          }}>
        <Card className='card'>
            <CardImg className='img' width='100%' src={item.image} alt={item.name}></CardImg>
            <CardBody>
            <CardText className='card-text'><strong>{item.name}</strong></CardText>
            </CardBody>
        </Card>
        </Link>
    );
}

const PersonalCare = () => {
    const personalCare = PERSONALCARE.map((item) => {
       
        return(
            <div key={item.id} className='col-12 col-sm-4 p-2'>
                <RenderItem item={item}/>
            </div>
        )
        
    });

    return(
        <>
        <SearchBar back={'/home'}/>
           <div style={{backgroundColor : '#EEEEEE'}}>
            <header className='jumbotron'>
                        <div className='container'>
                            <div className='row '>
                            <div className='col-5 col-sm-3'>
                                    <img  className='images' src={`${process.env.PUBLIC_URL}/images/category3.jpg`} alt='groceries'/>
                                </div>
                                <div className='col-7 col-sm-7 '>
                                    <h2>Personal Care</h2>
                                </div>
                            </div>
                        </div>

            </header>
            
            <div className='container card-container'>
                <div className='row '>
                
                {personalCare}
            
                

                </div>
            </div>
           </div>
        </>           
    )
}

export default PersonalCare