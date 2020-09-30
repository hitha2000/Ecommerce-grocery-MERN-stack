/*import React , {useState, useEffect} from 'react';
import { Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input, Button, Card, CardHeader, CardBody } from 'reactstrap';
import Cookie from 'js-cookie';
import axios from 'axios'
function UserInfo () {






    const [isPassword, setPassword] = useState(false);
    const [isAddress, setAddress] = useState('');
    var logintype=Cookie.getJSON('modeoflogin')||false
    var userinform=''

   
 
    userinform=(Cookie.getJSON('userInfo'))
    const [data, setdata] = useState('')
    
    
    var login=Cookie.getJSON('login')

    
    useEffect(() => {
       
        const fetchuserdetails=async()=>{
            let config
            if(logintype=="normal")
            {
             config = {
                
                params: {
                    email: userinform.email
                }
              }
            }
            else
            {
               
                 config = {
                   
                    params: {
                        email: userinform.user.email
                    }
                  }
               

            }

           

         const d = await axios.get('http://localhost:5000/users/userinfo',config)
        setdata(d.data)
        }
        
     fetchuserdetails() 
        console.log(data)
    
    
      }, [])

      console.log(data)
    
    
    function togglePassword() {
        
        setPassword(!isPassword);

    }
    function handleSubmit(e) {
        togglePassword();
        const fetchuserdetails=async()=>{
            let config = {
                //headers: {'Authorization': 'JWT ' + this.$store.state.token},
                params: {
                    email: userinform.email
                },
                data:
                {
                    password: isPassword
                }
              }

         const d = await axios.put('http://localhost:5000/users/password',config,{isPassword })
        setAddress(d.password)
        }
        fetchuserdetails();
        e.preventDefault();
    }

    function toggleAddress() {
        setAddress(!isAddress);
    }
    function submitHandler(e) {
      
        const fetchuserdetails=async()=>{
            let config = {
                //headers: {'Authorization': 'JWT ' + this.$store.state.token},
                params: {
                    email: userinform.email
                },
                data:
                {
                    address:isAddress
                }
              }

         const d = await axios.put('http://localhost:5000/users/address',config,{isAddress })
        setAddress(d.address)
        }
        fetchuserdetails();
        toggleAddress();
        e.preventDefault();
        window.location.reload(false);
    }

    if(data)
    { 
    return(
        <div className='container'>
            <Card className='info-card'>
                <CardHeader className='info-head'>
                   
                        <h style={{fontSize:'35px'}}><strong>Customer Information</strong></h>
                       
                </CardHeader>
                <CardBody className='info-card-head'>
                    <Form>
                        <FormGroup>
                            <div className='row'>
                                <div className='col-4 col-sm-4  offset-sm-1'>
                                    <Label htmlFor='name' style={{fontSize:'20px'}}><strong>Name</strong></Label>
                                </div>
                                <div className='col-8 col-sm-4'>        
                                <Input type='text' name='name'disabled='disabled' value={data[0].name}></Input>
                                </div>
                            </div>
                        </FormGroup>
                
                        <FormGroup>
                            <div className='row'>
                                <div className='col-4 col-sm-4  offset-sm-1'>
                                    <Label htmlFor='name' style={{fontSize:'20px'}}><strong>Contact Number</strong></Label>
                                </div>
                                <div className='col-8 col-sm-4'>
                                    <Input type='text' name='name'disabled='disabled' value={data[0].phone}></Input>
                                </div>
                            </div>
                        </FormGroup>
                        <FormGroup>
                            <div className='row'>
                                <div className='col-4 col-sm-4  offset-sm-1'>
                                    <Label htmlFor='name' style={{fontSize:'20px'}}><strong>Email Address</strong></Label>
                                </div>
                                <div className='col-8 col-sm-4'>
                                    <Input type='text' name='name'disabled='disabled' value={data[0].email}></Input>
                                </div>
                            </div>
                        </FormGroup> 
                        <FormGroup>
                            <div className='row'>
                                <div className='col-4 col-sm-4  offset-sm-1'>
                                    <Label htmlFor='name' style={{fontSize:'20px'}}><strong>Password</strong></Label>
                                </div>
                                <div className='col-8 col-sm-4'>
                                    <Input type='password' name='name' value='Dsfghfgj'></Input>
                                </div>
                            </div>
                        </FormGroup>
                        <FormGroup>
                            <div className='row'>
                                <div className='col-6  offset-4 col-sm-10  offset-sm-1'>
                                    <Button  className='info-button' onClick={togglePassword}>Change Password</Button>
                                </div>
                            </div>
                        </FormGroup>
                        
                        <FormGroup>
                            <div className='row'>
                                <div className='col-4 col-sm-4 offset-sm-1'>
                                    <Label htmlFor='name'  style={{fontSize:'20px'}}><strong>Address</strong></Label>
                                </div>
                                <div className='col-8 col-sm-4'>
                                    <Input type='textarea' name='name' rows='10' value={data[0].address}></Input>
                                </div>
                            </div>
                        </FormGroup>
                        <FormGroup>
                            <div className='row'>
                                <div className='col-6 offset-4 col-sm-10 offset-sm-1'>
                                    <Button className='info-button' onClick={toggleAddress}>Edit Address</Button>
                                </div>
                            </div>
                        </FormGroup>
                    
                
                    </Form>
                </CardBody>
            </Card>
            
            
            <Modal isOpen={isPassword} toggle={togglePassword}>
                <ModalHeader toggle={togglePassword}>
                    Change Password
                </ModalHeader>
                <ModalBody>
                   <Form onSubmit={handleSubmit}>
                        <FormGroup>
                            <Label htmlFor='password'><strong>Current Password</strong></Label>
                            <Input type='password' id='password' name='password' placeholder='Current Password' onChange={(e)=>setPassword(e.target.value)}></Input>
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor='newpassword'><strong>New Password</strong></Label>
                            <Input type='password' id='newpassword' name='newpassword' placeholder='New Password' onChange={(e)=>setPassword(e.target.value)}></Input>
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor='repassword'><strong>Confirm Password</strong></Label>
                            <Input type='password' id='repassword' name='repassword' placeholder='Confirm Password' onChange={(e)=>setPassword(e.target.value)}></Input>
                        </FormGroup>
                        <FormGroup className='offset-4'>
                            <Button type='submit' name='submit' id='submit' className='info-button btn-lg'> Submit </Button>
                        </FormGroup>
                   </Form>
                </ModalBody>
            </Modal>

            <Modal isOpen={isAddress} toggle={toggleAddress}>
                <ModalHeader toggle={toggleAddress}>Edit Address</ModalHeader>
                <ModalBody>
                    <Form onSubmit={submitHandler}>
                        <FormGroup>
                            <Label htmlFor='address'><strong>New Address</strong></Label>
                            <Input type='textarea' id='address' name='address' onChange={(e)=>setAddress(e.target.value)}></Input>
                        </FormGroup>
                        <FormGroup className='offset-4'>
                            <Button type='submit' name='submit' id='submit' className='info-button btn-lg'> Submit </Button>
                        </FormGroup>
                    </Form>
                </ModalBody>
            </Modal>

           
        </div>
    )}

    else
    {
        return(
            <>
           NO  Orders
            </>
        )
       
    }
}

export default UserInfo;*/

import React , {useState, useEffect} from 'react';
import { Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input, Button, Card, CardHeader, CardBody } from 'reactstrap';
import Cookie, { set } from 'js-cookie';
import axios from 'axios'
function UserInfo () {
    var logintype=Cookie.getJSON('modeoflogin')||false
  return(<User/>)



function User()

{
    const [isPassword, setPassword] = useState(false);
    const [isAddress, setAddress] = useState('');
    var logintype=Cookie.getJSON('modeoflogin')||false
    var userinform=''

   
 
    userinform=(Cookie.getJSON('userInfo'))
    const [data, setdata] = useState('')
    var logintype=Cookie.getJSON('modeoflogin')||false

    
    useEffect(() => {
       
        if(logintype)
        {const fetchuserdetails=async()=>{
            let config
            if(logintype=="normal")
            {
             config = {
                
                params: {
                    email: userinform.email
                }
              }
            }
            else
            {
               
                 config = {
                   
                    params: {
                        email: userinform.user.email
                    }
                  }
               

            }

           

         const d = await axios.get('http://localhost:5000/users/userinfo',config)
        setdata(d.data)
    
    }
    fetchuserdetails() 
        }
    else
    {
        setdata(false)
    }
        
    
        console.log(data)
    
    
      }, [])

      console.log(data)
    
    
    function togglePassword() {
        
        setPassword(!isPassword);

    }
    function handleSubmit(e) {
        togglePassword();
        const fetchuserdetails=async()=>{
            let config = {
                //headers: {'Authorization': 'JWT ' + this.$store.state.token},
                params: {
                    email: userinform.email
                },
                data:
                {
                    password: isPassword
                }
              }

         const d = await axios.put('http://localhost:5000/users/password',config,{isPassword })
        setAddress(d.password)
        }
        fetchuserdetails();
        e.preventDefault();
    }

    function toggleAddress() {
        setAddress(!isAddress);
    }
    function submitHandler(e) {
      
        const fetchuserdetails=async()=>{
            let config = {
                //headers: {'Authorization': 'JWT ' + this.$store.state.token},
                params: {
                    email: userinform.email
                },
                data:
                {
                    address:isAddress
                }
              }

         const d = await axios.put('http://localhost:5000/users/address',config,{isAddress })
        setAddress(d.address)
        }
        fetchuserdetails();
        toggleAddress();
        e.preventDefault();
        window.location.reload(false);
    }

    if(data)
    { 
    return(
        <div className='container'>
            <Card className='info-card'>
                <CardHeader className='info-head'>
                   
                        <h style={{fontSize:'35px'}}><strong>Customer Information</strong></h>
                       
                </CardHeader>
                <CardBody className='info-card-head'>
                    <Form>
                        <FormGroup>
                            <div className='row'>
                                <div className='col-4 col-sm-4  offset-sm-1'>
                                    <Label htmlFor='name' style={{fontSize:'20px'}}><strong>Name</strong></Label>
                                </div>
                                <div className='col-8 col-sm-4'>        
                                <Input type='text' name='name'disabled='disabled' value={data[0].name}></Input>
                                </div>
                            </div>
                        </FormGroup>
                
                        <FormGroup>
                            <div className='row'>
                                <div className='col-4 col-sm-4  offset-sm-1'>
                                    <Label htmlFor='name' style={{fontSize:'20px'}}><strong>Contact Number</strong></Label>
                                </div>
                                <div className='col-8 col-sm-4'>
                                    <Input type='text' name='name'disabled='disabled' value={data[0].phone}></Input>
                                </div>
                            </div>
                        </FormGroup>
                        <FormGroup>
                            <div className='row'>
                                <div className='col-4 col-sm-4  offset-sm-1'>
                                    <Label htmlFor='name' style={{fontSize:'20px'}}><strong>Email Address</strong></Label>
                                </div>
                                <div className='col-8 col-sm-4'>
                                    <Input type='text' name='name'disabled='disabled' value={data[0].email}></Input>
                                </div>
                            </div>
                        </FormGroup> 
                        <FormGroup>
                            <div className='row'>
                                <div className='col-4 col-sm-4  offset-sm-1'>
                                    <Label htmlFor='name' style={{fontSize:'20px'}}><strong>Password</strong></Label>
                                </div>
                                <div className='col-8 col-sm-4'>
                                    <Input type='password' name='name' value='Dsfghfgj'></Input>
                                </div>
                            </div>
                        </FormGroup>
                        <FormGroup>
                            <div className='row'>
                                <div className='col-6  offset-4 col-sm-10  offset-sm-1'>
                                    <Button  className='info-button' onClick={togglePassword}>Change Password</Button>
                                </div>
                            </div>
                        </FormGroup>
                        
                        <FormGroup>
                            <div className='row'>
                                <div className='col-4 col-sm-4 offset-sm-1'>
                                    <Label htmlFor='name'  style={{fontSize:'20px'}}><strong>Address</strong></Label>
                                </div>
                                <div className='col-8 col-sm-4'>
                                    <Input type='textarea' name='name' rows='10' value={data[0].address}></Input>
                                </div>
                            </div>
                        </FormGroup>
                        <FormGroup>
                            <div className='row'>
                                <div className='col-6 offset-4 col-sm-10 offset-sm-1'>
                                    <Button className='info-button' onClick={toggleAddress}>Edit Address</Button>
                                </div>
                            </div>
                        </FormGroup>
                    
                
                    </Form>
                </CardBody>
            </Card>
            
            
            <Modal isOpen={isPassword} toggle={togglePassword}>
                <ModalHeader toggle={togglePassword}>
                    Change Password
                </ModalHeader>
                <ModalBody>
                   <Form onSubmit={handleSubmit}>
                        <FormGroup>
                            <Label htmlFor='password'><strong>Current Password</strong></Label>
                            <Input type='password' id='password' name='password' placeholder='Current Password' onChange={(e)=>setPassword(e.target.value)}></Input>
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor='newpassword'><strong>New Password</strong></Label>
                            <Input type='password' id='newpassword' name='newpassword' placeholder='New Password' onChange={(e)=>setPassword(e.target.value)}></Input>
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor='repassword'><strong>Confirm Password</strong></Label>
                            <Input type='password' id='repassword' name='repassword' placeholder='Confirm Password' onChange={(e)=>setPassword(e.target.value)}></Input>
                        </FormGroup>
                        <FormGroup className='offset-4'>
                            <Button type='submit' name='submit' id='submit' className='info-button btn-lg'> Submit </Button>
                        </FormGroup>
                   </Form>
                </ModalBody>
            </Modal>

            <Modal isOpen={isAddress} toggle={toggleAddress}>
                <ModalHeader toggle={toggleAddress}>Edit Address</ModalHeader>
                <ModalBody>
                    <Form onSubmit={submitHandler}>
                        <FormGroup>
                            <Label htmlFor='address'><strong>New Address</strong></Label>
                            <Input type='textarea' id='address' name='address' onChange={(e)=>setAddress(e.target.value)}></Input>
                        </FormGroup>
                        <FormGroup className='offset-4'>
                            <Button type='submit' name='submit' id='submit' className='info-button btn-lg'> Submit </Button>
                        </FormGroup>
                    </Form>
                </ModalBody>
            </Modal>

           
        </div>
    )}

    else
    {
        if(logintype)
        {
            return(<>Loading</>)
        }
        return(
            <>
          Login to see the details
            </>
        )
       
    }
}
}

export default UserInfo;