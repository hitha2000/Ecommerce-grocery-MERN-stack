import React,{useState} from 'react'

import {Button,Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input} from 'reactstrap'
import {Link} from 'react-router-dom'
import { createBrowserHistory } from 'history'


const history=createBrowserHistory()

function Searchbar(props)
{
  let props1=props
    const[isOpen,togglemodal]=useState(false)
 
  const[search,setSearch]=useState('')
  function handlemodal()
  {
    togglemodal(!isOpen)
  }
function  handleSubmit()
 {
   togglemodal(!isOpen)

 }

 function search1()
 {
  
  const location = {
    pathname: '/products',
    search: '?search='+search,
  }
  console.log("clicked")
  props1.history.push({ 
  location
   
  })
}

 
return(
 <>
 
 <nav className="navbar fixed-top navbar-light bg-dark nav-size">
 {/*<Link to={(props.back)}><div className="col-3 col-sm-3 nav-item"><span onClick={back} className="fa fa-arrow-left fa-lg"></span></div></Link>*/}
 <a href={props.back}><div className="col-3 col-sm-3 nav-item"><span className="fa fa-arrow-left fa-lg"></span></div></a>

 <div className=" offset-5  col-2  offset-sm-6 col-sm-1 nav-item"><span onClick={togglemodal} className="fa fa-search fa-lg "></span></div>
 <div className="col-2   col-sm-1 nav-item"><a href="/cart"><span><img  src={`${process.env.PUBLIC_URL}/images/cart.png`} className="btn menu cart nav-item" style={{width:"1.8rem"},{height:"1.8rem"}}/></span></a></div>


    
   
</nav>
<div className="p-4 mb-3">

</div>

<div className='container'>
        <Modal isOpen ={isOpen} toggle={handlemodal} className="modal-modal-dialog-center">
            <ModalHeader className='modal-text search-modal' toggle={handlemodal} > 
           
                <div className="row">
            <div className=" offset-1 col-10"><h3 style={{textAlign:"center"}}> Search</h3></div>
            <div className="">
            <Form onSubmit={handleSubmit} className="offset-1">
                    <FormGroup>
                        <Label htmlFor='search'></Label>
                        <Input  type='search  form-control searchtextbox' name='search' id='search' placeholder="Search For Products" size="50" onChange={(e)=>setSearch(e.target.value)} ></Input> 
                    </FormGroup> 
                </Form>
               
                </div>
                <div className='searchbaricon'>
                
                
                <span className="fa fa-search fa-lg btn" onClick={search1}></span>
                </div>
                </div>
                
            </ModalHeader>
        </Modal>
        </div>


</>
    )
}
export default Searchbar