import React, {useEffect, useState} from 'react';
//import { Link} from 'react-router-dom';
import { Form, Button} from 'react-bootstrap';
import {Modal, ModalHeader, ModalBody, FormGroup, Label, Input} from 'reactstrap';
import axios from 'axios'
import Cookie from 'js-cookie'
import { Link } from 'react-router-dom';
import { slide as Menu } from 'react-burger-menu'

function PaymentComponent(props)
{ 

    var props1=props;

    function red()
    {
        localStorage.clear();
      props1.history.push('/');
    }

    const [isSuccessOpen1, setSuccessOpen1] = useState(false);
    function toggleSuccessModal1(prevState) {
        setSuccessOpen1(!isSuccessOpen1)
        setpay(true)}
    

    const [isSuccessOpen2 , setSuccessOpen2] = useState(false);
    function toggleSuccessModal2(prevState) {
        setSuccessOpen2(!isSuccessOpen2)
        setpay(true)
    } 
    
    const [isSuccessOpen3 , setSuccessOpen3] = useState(false);
    function toggleSuccessModal3(prevState) {
        setSuccessOpen3(!isSuccessOpen3)
        setpay(true)
    } 

    const [isSuccessOpen4 , setSuccessOpen4] = useState(false);
    function toggleSuccessModal4(prevState) {
        setSuccessOpen4(!isSuccessOpen4)
        setTimeout(()=>
        {
            red();
        },2000)
    } 

    const [isSuccessOpen5 , setSuccessOpen5] = useState(false);
    function toggleSuccessModal5(prevState) {
        setSuccessOpen5(!isSuccessOpen5)
    } 

    const [isSuccessOpen6 , setSuccessOpen6] = useState(false);
    function toggleSuccessModal6(prevState) {
        setSuccessOpen6(!isSuccessOpen6)
    } 

    var userinform=''
    var logintype=Cookie.getJSON('modeoflogin')||false
    

    var signup="SignIn"
 
    var logincoookie=(Cookie.getJSON('login'))||false
    console.log(logincoookie)
    if(logincoookie)
    {
      console.log("bye")
      const logintype=(Cookie.getJSON('modeoflogin'))||''
      if(logintype==="normal")
      {const signup1=(Cookie.getJSON('userInfo'))||{name:"SignIn"}
      signup=signup1.name}
  
     
      else
      {
        const signup1=(Cookie.getJSON('userInfo'))||{user:{name:"SignIn"}}
        signup=signup1.user.name
      }
    }
    const [isOpen, setSide] = useState(false)
    function handleClick()
    {
      setSide(!isOpen)
    }
    function logout()
  {
      localStorage.clear()
      Cookie.remove('userInfo')
      Cookie.remove('modeoflogin')
      Cookie.remove('login')
     // localStorage.setItem('login',JSON.stringify(false))
   
      window.location.reload(false)
      
      
  }
  

    if(logintype==="normal")
     {userinform=(Cookie.getJSON('userInfo'))||false}
     else
     {
         userinform=(Cookie.getJSON('userInfo'))
     }
    
   




  
    var totalamount1=JSON.parse(localStorage.getItem(JSON.stringify("amount")));
    totalamount1=totalamount1.totalsp
    

   
    const [cardnumber, setCardNumber] = useState('');
    const [cardname , setCardName] = useState('');
    const [date , setExpiry] = useState('');
    const [cvv , setCvv] = useState('');
    const [isModalOpen , setToggle] = useState(false);
    const [isinfoOpen,setInfo]=useState(false);

    const [inputField, setInputField] = useState('');

    const[state,setstate]=useState({cardnumber:'', cardname:'', date:'', cvv:'', inputField:''});
    const[isSubmit,setSubmit] = useState(false);
    const[pay,setpay]=useState(false)

    const[data,setdata]=useState('')
    function handleChange(e)
     {
         setstate({...state,[e.target.name]:e.target.value}) // while updating the state when using multiple values set state creates a new value so to prevent it 
         // from removing the previously stored value we have to copy all values of the past state and then update it.
     }  



   function toggleModal(prevState) {
       setToggle(!isModalOpen)
   } 

   function submitHandler(e) {
       toggleModal();
       setInfo(true);
      
       e.preventDefault();

   }
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
    

    


  }, [])
var data1=data

  console.log(data)

   async function proceedtopay()
   {
    
 
   var products1=JSON.parse(localStorage.getItem('newcart')); 

    const products=[]
    
     const p=products1.map((item)=>
     
    {
        
        if(item.count!=0)
        products.push(item)
    })
   


    if(userinform)

      { 
        var d = new Date();
        var n = d.toString().split('GMT')[0];
          if(logintype==='normal')
          
        {var totalamount=JSON.parse(localStorage.getItem(JSON.stringify("amount")));
       totalamount=totalamount.totalsp
       var delivery=JSON.parse(localStorage.getItem(JSON.stringify("delivery")));
       var scheduledon=(delivery.date+" "+delivery.time);
     
       var name= data1[0].name
        var phone= data1[0].phone
        var email= userinform.email;
        var placedon= n;
        var scheduledon=scheduledon;
    var address=data1[0].address}

    else
    {

        var totalamount=JSON.parse(localStorage.getItem(JSON.stringify("amount")));
        totalamount=totalamount.totalsp
        var delivery=JSON.parse(localStorage.getItem(JSON.stringify("delivery")));
        var scheduledon=(delivery.date+" "+delivery.time);
       
        var name= userinform.user.name
         var phone= data1[0].phone
         var email= userinform.user.email;
         var placedon= n;
         var scheduledon=scheduledon
        var address=data1[0].address
    }
      }
    
   
    const config={
        headers:
        {
            'Content-Type':"application/json",
            
                'Authorization': 'bearer '+ userinform.token
            
        }
      
    }
    if(pay)
   {
    console.log(products)
   
        const { data } = await axios.post("http://localhost:5000/orders", {products,totalamount,scheduledon,placedon,name,phone,email,address},config
       );
        console.log(data)

        if(data.message=="Order Placed Successfully")
        {
            toggleSuccessModal4()
        }
        else
        {
            toggleSuccessModal5()
        }
   }
   else{
       toggleSuccessModal6()
   }

   
       
   }
   if(logintype)
  
    {return(

       
        <div>
        <div className='container'>
        <Modal isOpen = {isModalOpen} toggle={toggleModal}>
            <ModalHeader toggle={toggleModal} className='modal-text'> <strong>CARD-DETAILS</strong> </ModalHeader>
            <ModalBody>
                <Form onSubmit={submitHandler}>
                    <FormGroup>
                        <Label htmlFor='cardnumber'><strong>Card Number</strong> </Label>
                        <Input type='cardnumber' name='cardnumber' id='cardnumber' placeholder='Enter 16 digit card number'  onChange= {(e)=> setCardNumber(e.target.value)}></Input>
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor='text'> <strong>Name on Card</strong></Label>
                        <Input type='cardname' name='cardname' id='cardname' placeholder='Enter your name as on card' onChange={(e)=> setCardName(e.target.value)}></Input>
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor='date'> <strong>Card Expiry</strong></Label>
                        <Input type='date' name='date' id='date' placeholder='Enter card expiry date' onChange={(e)=> setExpiry(e.target.value)}></Input>
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor='number'><strong>CVV</strong> </Label>
                        <Input type='cvv' name='cvv' id='cvv' placeholder='Enter 3 digit CVV'  onChange= {(e)=> setCvv(e.target.value)}></Input>
                    </FormGroup>
                    <FormGroup className='row'>
                        <Button className='col-10 col-sm-6 offset-sm-3' type='submit' value='submit' color='primary'>Proceed to Pay</Button>
                    </FormGroup>                   
                </Form>
            </ModalBody>
        </Modal>
        </div>

        <div className="container">
            <Modal className='success-modal' isOpen = {isSuccessOpen1} toggle={toggleSuccessModal1}>
                    <ModalHeader toggle={toggleSuccessModal1} className='success-modal-text'> <strong>SCAN TO PAY</strong> </ModalHeader>
                    <ModalBody>
                        
                            <p><img src={`${process.env.PUBLIC_URL}/images/paytmpay.jpg`} className="scanimg"/></p>                                
                        
                    </ModalBody>
            </Modal>
        </div>    

        <div className="container">
            <Modal className='success-modal' isOpen = {isSuccessOpen2} toggle={toggleSuccessModal2}>
                    <ModalHeader toggle={toggleSuccessModal2} className='success-modal-text'> <strong>SCAN TO PAY</strong></ModalHeader>
                    <ModalBody>
                        
                            <p><img src={`${process.env.PUBLIC_URL}/images/phonepepay.png`} className="scanimg"/></p>                                
                        
                    </ModalBody>
            </Modal>
        </div>   

        <div className="container">
            <Modal className='success-modal' isOpen = {isSuccessOpen3} toggle={toggleSuccessModal3}>
                    <ModalHeader toggle={toggleSuccessModal3} className='success-modal-text'> <strong>SCAN TO PAY</strong> </ModalHeader>
                    <ModalBody>
                        
                            <p><img src={`${process.env.PUBLIC_URL}/images/gpaypay.jpg`} className="scanimg"/></p>                                
                        
                    </ModalBody>
            </Modal>
        </div>   

        <div className="container">
    <Modal className='success-modal' isOpen = {isSuccessOpen4} toggle={toggleSuccessModal4}>
            <ModalHeader toggle={toggleSuccessModal4} className='success-modal-text'> <p><strong> Thank You!!</strong></p> </ModalHeader>
            <ModalBody>
                
                    <p>Order Placed Succesfully</p>
                    <p><img src={`${process.env.PUBLIC_URL}/images/tick.png`} className="icons" alt="icons"/></p>                                
                
            </ModalBody>
        </Modal>
    </div> 

    <div className="container">
    <Modal className='success-modal' isOpen = {isSuccessOpen5} toggle={toggleSuccessModal5}>
            <ModalHeader toggle={toggleSuccessModal5} className='success-modal-text'> <p><strong> Sorry</strong></p> </ModalHeader>
            <ModalBody>
                
                    <p>Order Not Placed Try Again</p>
                    <p><img src={`${process.env.PUBLIC_URL}/images/cross.png`} className="icons" alt="icons"/></p>                                
                
            </ModalBody>
        </Modal>
    </div> 
    <div className="container">
    <Modal className='success-modal' isOpen = {isSuccessOpen6} toggle={toggleSuccessModal6}>
            <ModalHeader toggle={toggleSuccessModal6} className='success-modal-text'> <p style={{textAlign:"center"}}><strong></strong></p> </ModalHeader>
            <ModalBody>
                
                    <h3>Please Select Payment Method.</h3>
                                                  
                
            </ModalBody>
        </Modal>
    </div> 

    <Menu className="sidebar" isOpen={ isOpen } customBurgerIcon={false}>
        <div className="container">
          <div className="row">
        <div className="col-12 navtop"><div className="row"><div className="offset-1 col-7">{logincoookie?(<p  style={{cursor:"pointer"}}><span className="fa fa-user" style={{marginRight:"2px"}}></span>{signup}</p>):(<p  style={{cursor:"pointer"}}><span className="fa fa-sign-in"></span>Signin</p>)}</div><p onClick={handleClick} className=" col-2 fa fa-arrow-left "style={{cursor:"pointer"}}></p></div></div>
       <div className="side-items">
       <div className="col-12 container"><a href ='/home'className="menu-item row"><span className="fa fa-home fa-lg offset-1 offset-sm-2  offset-lg-2 col-1 p-1"></span><span className="offset-1 offset-sm-2  col-7 col-sm-6">Home</span></a></div> 
       <div className="col-12 container" onClick={()=>setSide(false)}><a href ='#accordian'className="menu-item row"><span className="fa fa-th-large fa-lg offset-1 offset-sm-2 offset-lg-2 col-1 p-1"></span><span className="offset-1 offset-sm-2 col-7 col-sm-6"> Categories</span></a></div> 
       <div className="col-12 container"><a href ='/myorders'className="menu-item row"><span className="fa fa-th-list fa-lg offset-1 offset-sm-2 offset-lg-2 col-1 p-1"></span><span className="offset-1 offset-sm-2 col-7 col-sm-6">  MyOrders</span></a></div> 
       <div className="col-12 container"><a href ='/myaccount'className="menu-item row"><span className="fa fa-user fa-lg offset-1 offset-sm-2 offset-lg-2 col-1 p-1"></span><span className="offset-1 offset-sm-2 col-7 col-sm-6"> MyAccount</span></a></div> 
       <div className="col-12 container"><a href ='/aboutus'className="menu-item row"><span className="fa fa-info fa-lg offset-1 offset-sm-2 offset-lg-2 col-1 p-1"></span><span className="offset-1 offset-sm-2 col-7 col-sm-6"> AboutUs</span></a></div> 
       <div className="col-12 container"><a href ='/developedby'className="menu-item row"><span className="fa fa-connectdevelop fa-lg offset-1 offset-sm-2 offset-lg-2 col-1 p-1"></span><span className="offset-1 offset-sm-2 col-7 col-sm-6"> DevelopedBy</span></a></div> 
       <div className="col-12 container"><a onClick={logout} style={{cursor:"pointer"}} className="menu-item row"><span className="fa fa-sign-out fa-lg offset-1 offset-sm-2 offset-lg-2 col-1 p-1"></span><span className="offset-1 offset-sm-2 col-7 col-sm-6"> LogOut</span></a></div> 
    
     
       </div>
     </div>
     </div>
    </Menu>
    
    <nav className="navbar fixed-top navbar-light bg-dark">
    <a className="navbar-brand"  onClick={handleClick}><span className="fa fa-bars fa-lg navicon" style={{color:"white"}}></span>
    
    </a>
    
    <ul className="navbar-nav">
    <li className="nav-item col-1 col-lg-5">
     <a className="nav-link" href="/"><img src={`${process.env.PUBLIC_URL}/images/logo.jpg`}style={{width:"2.7rem"},{height:"2.7rem"}}></img>
    </a>
    </li>
      
    </ul>
    <span className="nav-item col-7 col-lg-7 font-name" >Sri Balaji Stores</span>
    </nav>
    <div className="container spacingforheader"> 
    <div className="row">
        <div className="col-12">bye</div>
        <div className="col-12">        
     </div><div className="col-12"></div>
      
    </div>
    </div>


        <div className="container">  
            <div className="row row-content">
                <div className="col-sm-6 mt-2 align-items-center justify-content-between">
                <div className="allpageheader">
                    <h1 className="ml-4" style={{marginBottom:"20px"}}>Payment</h1>
                </div>
                    <form>
                    <div className="payform flex-container">
                        <div className="col-sm-6 ml-2 flex-child">
                            <input type="radio" id="paytm" name="radio" value="paytm" onClick={toggleSuccessModal1}/>
                            <img src="/images/paytm.png" className="payicons" alt="payicons" onClick={toggleSuccessModal1}></img>
                            <label for="paytm" onClick={toggleSuccessModal1}>Paytm Wallet</label><br></br>
                        <br></br>
                            <input type="radio" id="phonepe" name="radio" value="phonepe" onClick={toggleSuccessModal2}/>
                            <img src="/images/phonepe.png" className="payicons" alt="payicons" onClick={toggleSuccessModal2}></img>
                            <label for="phonepe" onClick={toggleSuccessModal2}>PhonePe Wallet</label><br></br>
                        <br></br>
                            <input type="radio" id="gpay" name="radio" value="gpay" onClick={toggleSuccessModal3}/>
                            <img src="/images/gpay.png" className="payicons" alt="payicons" onClick={toggleSuccessModal3}></img>
                            <label for="gpay" onClick={toggleSuccessModal3}>Google Pay</label><br></br>
                        <br></br>
                            <input type="radio" id="upi" name="radio" value="upi"/>
                            <img src="/images/upi.png" className="payicons" alt="payicons"></img>
                            <label for="upi">UPI</label><br></br>
                        </div>
                        <div className="col-sm-6 ml-2 flex-child">
                            <input type="radio" id="sodexo" name="radio" value="sodexo"  onClick={(e)=>setpay(true)}/>
                            <img src="/images/sodexo.png" className="payicons" alt="payicons"></img>
                            <label for="sodexo">Sodexo</label><br></br>
                        <br></br>                   
                            <input type="radio" id="creditcard" name="radio" value="creditcard" onClick={toggleModal}/>                           
                            <img src="/images/creditcard.png" className="payicons" alt="payicons"></img>                           
                            <label for="creditcard">Credit Card</label><br></br>                                                                            
                        <br></br>                       
                            <input type="radio" id="debitcard" name="radio" value="debitcard" onClick={toggleModal}/>
                            <img src="/images/debitcard.png" className="payicons" alt="payicons"></img>                            
                            <label for="debitcard">Debit Card</label><br></br>                            
                        <br></br>
                            <input type="radio" id="cash" name="radio" value="cash" onClick={(e)=>setpay(true)}/>
                            <img src="/images/cash.png" className="payicons" alt="payicons"></img>
                            <label for="cash">Cashon Delivery</label><br></br>
                        </div>
                    </div>
                    </form>
                </div>
                <div className="col-sm mt-4">
                <div className="paymentcard">
                    <h3 className="card-header text-black summary">Order Summary</h3>
                    <div className="card-body">
                        <dl className="row">
                            
                            <dt className="col-6"></dt>
                            <dd className="col-6"></dd>
                            <dt className="col-6">Cart value</dt>
                            <dd className="col-6"><img src="/images/rupee.png" className="icons" alt="icons"></img>{totalamount1}</dd>
                            <dt className="col-6"></dt>
                            <dd className="col-6"></dd>
                            <dt className="col-6">Delivery charges</dt>
                            <dd className="col-6"><span style={{color:'green'}}><strong>FREE</strong></span></dd>
                            <dt className="col-6"></dt>
                            <dd className="col-6"></dd>
                           
                            <dt className="col-6"></dt>
                            <dd className="col-6"></dd>
                            <dt className="col-6">Total Payable Amount</dt>
                            <dd className="col-6"><img src="/images/rupee.png" className="icons" alt="icons"></img>{totalamount1}</dd>
                        </dl>
                    </div>                    
                </div>
                <br></br>
                <button onClick={proceedtopay} className="pdelthemebutton btn-lg" style={{width:"100%"}}>
                    Proceed to Pay
                </button>                
            </div>
            </div>           
        </div>
        </div>
    );
    }
    else
    {
        return(<><Link to="/signup"><button>To Place Order Login</button></Link></>)
    }
}

export default PaymentComponent;