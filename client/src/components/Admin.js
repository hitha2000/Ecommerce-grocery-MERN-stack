import React ,{useState,useEffect} from 'react'

import {
  saveProduct,
  productUpdate
} from '../redux/actions/productactions';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios'
import {Nav, NavItem, Navbar, Button,Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input} from 'reactstrap'
import { Link } from 'react-router-dom';
import Cookie from 'js-cookie'


let isAddproductidValid = false;
let isUpdateproductidValid=false;
const re = /^[0-9]*$/;

function Admin()
{

  const userinform=(Cookie.getJSON('userInfo'))||null

  const productSave = useSelector((state) => state.productSave);
  const {
    loading: loadingSave,
    success: successSave,
    error: errorSave,
  } = productSave;



  const dispatch = useDispatch();



  const [image, setImage] = useState('');
  const [uploading, setUploading] = useState(false);
  const [productname, setproductname] = useState('');
  const [productid, setproductid] = useState('');
  const [mrp, setproductmrp] = useState('');
  const [sp, setproductsp] = useState('');
  const [quantity, setproductquantity] = useState('');
  const [category, setproductcategory] = useState('');
  const [subcategory, setproductsubcategory] = useState('');

  const[updateproductid,setupdateproductid]=useState('');
  const[updatemrp,setupdatemrp]=useState('');
  const[updatesp,setupdatesp]=useState('');
  

  const [isSuccessOpen1, setSuccessOpen1] = useState(false);
    function toggleSuccessModal1(prevState) {
        setSuccessOpen1(!isSuccessOpen1)
    } 

const [isSuccessOpen2 , setSuccessOpen2] = useState(false);
    function toggleSuccessModal2(prevState) {
        setSuccessOpen2(!isSuccessOpen2)
    }    

const [addproductiderror, setaddproductiderror]= useState({})
const [updateproductiderror, setupdateproductiderror]= useState({})

const formValidation1=(e)=>{
  const addproductiderror={};

  if(!re.test(productid))
  {
    addproductiderror.notaddproductiderror="Product ID should be a number"
      isAddproductidValid=false
      setaddproductiderror(addproductiderror)
  }
  else{
      isAddproductidValid=true
  }
  
}

const formValidation2=(e)=>{
  const updateproductiderror={};

  if(!re.test(updateproductid))
  {
      updateproductiderror.notupdateproductiderror="Product ID should be a number"
      isUpdateproductidValid=false
      setupdateproductiderror(updateproductiderror)
  }
  else{
      isUpdateproductidValid=true
  }
  
}


  
  const[featured,setfeatured]=useState('')
  const[isOpen1,togglemodal1]=useState(false)
  //const[state1,setstate1]=useState({productid:'', productname:'', mrp:'',sp:'',category:'',subcategory:''});
  function handlemodal1()
  {
    togglemodal1(!isOpen1)
  }


  const config={
    headers:
    {
        'Content-Type':"application/json",
        
            'Authorization': 'bearer '+ userinform.token
        
    }
  
}
  const uploadFileHandler = (e) => {
    const file = e.target.files[0];
    const bodyFormData = new FormData();
    bodyFormData.append('image', file);
    setUploading(true);
    axios.post('http://localhost:5000/imageupload', bodyFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': 'bearer '+ userinform.token
        },
      })
      .then((response) => {
        setImage(response.data);
        setUploading(false);
      })
      .catch((err) => {
        console.log(err);
        setUploading(false);
      });
  };

  
function  handleSubmit1(e)
 {
  console.log(mrp+ sp)
  dispatch(
    saveProduct(
     productid,
     productname,
     mrp,
     sp,
     quantity,
     category,
     subcategory,
     featured,
     image
     //state1.featured 
    )
   
  );
  formValidation1();
  toggleSuccessModal1();
  
   togglemodal1(!isOpen1)
   e.preventDefault();


 }


 const[isOpen2,togglemodal2]=useState(false)
  const[state2,setstate2]=useState({productid:'', productname:'', mrp:'',sp:'',category:'',subcategory:'' });
  function handlemodal2()
  {
    
    togglemodal2(!isOpen2)
  }
function  handleSubmitupdate(e)
 {
  
   console.log('product')
   
   dispatch(productUpdate(
     updateproductid,
     updatemrp,
     updatesp
   ))
   formValidation2();
   toggleSuccessModal2();
   togglemodal2(!isOpen2)
   e.preventDefault();

 }
 function handleChange2(e)
 {
     setstate2({...state2,[e.target.name]:e.target.value}) 
 }

 const[data,setdata]=useState()
    
   var data1=0

  /* const data=[
        
    {'OrderId':100,'Name': 'Suhas',  'Address': 'Rt Nagar','Phone No':9844142094,'email':'gpsuhas20@gmail.com',Amount: 4500,'Delivery Status':'Placed'},
    {'OrderId':100,'Name': 'Suhas',  'Address': 'Rt Nagar','Phone No':9844142094,'email':'gpsuhas20@gmail.com',Amount: 4500,'Delivery Status':'Placed'},
    {'OrderId':100,'Name': 'Suhas',  'Address': 'Rt Nagar','Phone No':9844142094,'email':'gpsuhas20@gmail.com',Amount: 4500,'Delivery Status':'Placed'},
    {'OrderId':100,'Name': 'Suhas',  'Address': 'Rt Nagar','Phone No':9844142094,'email':'gpsuhas20@gmail.com',Amount: 4500,'Delivery Status':'Placed'},
    {'OrderId':100,'Name': 'Suhas',  'Address': 'Rt Nagar','Phone No':9844142094,'email':'gpsuhas20@gmail.com',Amount: 4500,'Delivery Status':'Placed'},

  
]
*/
   
   useEffect(() => {
     const fetchusers=async()=>
     {

    try{
    data1=await axios.get('http://localhost:5000/orders/allorders',config)
    var data2=data1.data.d
   
  
    console.log(data2)
   
    var d3=[]
    var dat=data2.map((item)=>
    {
      var d4={"customerid":item.orderid}
     d4.orderid=item.orderid
      d4.name=item.name
      d4.phone=item.phone
      d4.address=item.address
      d4.amount=item.totalamount
      d4.scheduledon=item.scheduledon
      d4.placedon=item.placedon
      d3.push(d4)
    }) 
   setdata(d3)
    }
    catch(error)
    {
      console.log("no orders")
    }
     
   }
   fetchusers()
  },[])

   
   
   const  getKeys = function(){
        return Object.keys(data[0]);
        }
    

// when u map the array it will be in the form of value,index
        const getHeader = function(){
            var keys = getKeys();
            keys.push('Order Details') 
            // adding a new column header
            return keys.map((key)=>{
               // console.log("index"+index+"key"+key)
            return <th key={key}>{key.toUpperCase()}</th>
            })
            }
          
            var x=1;
           function handleClick(user)// on Clicking we are getting the data
           {
             console.log(user)
           } 
           const RenderRow = (props) =>{
             // onclicking the button send the props
             const ht=<Link
             to={{
             pathname: "/orders",
             search: "?orderid="+props.data.orderid }}><span><button onClick={(e)=>handleClick(props.data)}>
              View Details</button></span></Link>
            var k= props.keys.map((key, index)=>{
           
            return <td  key={props.data[key]}>{props.data[key]}</td> })
            k.push( <td  key={x}>{ht}</td>) // adding the values to the header
            return k
           
           }
           const getRowsData = function(){
            var items = data;
            var keys = getKeys();
            return items.map((row, index)=>{
            return <tr key={index}><RenderRow key={index} data={row} keys={keys}/></tr>
            })
            }
        
if(data)
      {  return (
          <>
          
          <nav className="navbar navbar-dark bg-dark mb p-2">

            <div className="container"><div className="col-9 col-sm-11"><h4 style={{textAlign:"center"}}>Sri Balaji Stores</h4></div>
            <div className="col-3 col-sm-1"><span className="fa fa-sign-out fa-lg btn-white" style={{cursor:"pointer"}} ></span>Logout</div>
            
            </div>
          </nav>
          <div className="bg-primary" style={{color:"white"}}>
            <div className="col-11">
           
            <h2 style={{textAlign:"center"}}> <span className="fa fa-cog"></span> DashBoard</h2>
            </div>
          </div>


          <section id="actions" className="py-4 mb-4" style={{color:"black"}}>
    <div className="container  text-align-center">
      <div className="row justify-content-center">
        <div className=" offset-1  col-7 offset-md-0 col-md-3">
          <a href="#" className="btn  btn-primary admin-btn  mb-2 p-1 btn-block"  onClick={togglemodal1}>
            <i className="fa fa-plus"></i> Add Product
          </a>
        </div>
        <div className=" offset-1  col-7 offset-md-0  col-md-3">
          <a href="#" className="btn admin-btn  btn-success   mb-2 p-1 btn-block" onClick={togglemodal2}>
            <i className="fa fa-edit"></i> Edit Product Details
          </a>
        </div>
        <div className=" offset-1   col-7  offset-md-0 col-md-3">
          <a href="/useradmin" className="btn  btn-warning  admin-btn p-1 btn-block">
            <i className="fa fa-users"></i> Users
          </a>
        </div>
      </div>
    </div>
  </section>



{/* modal for add product*/}
  <div className='container'>
        <Modal isOpen ={isOpen1} toggle={handlemodal1}>
            <ModalHeader className='modal-text' toggle={handlemodal1} > <strong>ADD PRODUCT</strong> </ModalHeader>
            <ModalBody>
                <Form onSubmit={handleSubmit1}>
                    <FormGroup>
                        <Label htmlFor='productname'><strong>Product Name</strong> </Label>
                        <Input type='text' name='productname'  placeholder='Product-Name'  onChange= {(e)=> setproductname(e.target.value)}></Input>
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor='productid'> <strong>PRODUCT-ID</strong></Label>
                        <Input type='text' name='productid'   placeholder="Product-Id" onChange={(e)=>setproductid(e.target.value)} onBlur={(e)=>formValidation1()}></Input>
                        {Object.keys(addproductiderror).map((key)=>{
                                if(!isAddproductidValid)
                                return <p style={{color:"red"}}>{addproductiderror[key]}</p>
                                else
                                return <p></p>
                            })}  
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor='mrp'> <strong>MRP</strong></Label>
                        <Input type='text' name='mrp'  placeholder='MRP' onChange={(e)=> setproductmrp(e.target.value)}></Input>
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor='sp'> <strong>SELLING PRICE</strong></Label>
                        <Input type='text' name='sp'   placeholder='SP' onChange={(e)=>setproductsp(e.target.value)}></Input>
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor='quantity'> <strong>QUANTITY</strong></Label>
                        <Input type='text' name='quantity'  placeholder='QUANTITY' onChange={(e)=>setproductquantity(e.target.value)}></Input>
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor='category'> <strong>CATEGORY</strong></Label>
                        <Input type='text' name='category'  placeholder='CATEGORY' onChange={(e)=>setproductcategory(e.target.value)}></Input>
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor='subcategory'> <strong>SUB CATEGORY</strong></Label>
                        <Input type='text' name='subcategory'   placeholder='SUB-CATEGORY' onChange={(e)=>setproductsubcategory(e.target.value)}></Input>
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor='featured'> <strong>FEATURED</strong></Label>
                        <Input type='text' name='featured'   placeholder='FEATURED' onChange={(e)=>setfeatured(e.target.value)}></Input>
                    </FormGroup>
                    <FormGroup>
                    <Label htmlFor="image">Image</Label>
                <Input
                  type="text"
                  name="image"
                  value={image}
                  id="image" onChange={(e) => setImage(e.target.value)}></Input>
                        <Input type='file'  onChange={uploadFileHandler}></Input>
                    </FormGroup>
                  


                    <FormGroup className='offset-3  col-8  offset-sm-4 col-sm-8 '>
                        <Button  className="p-2" type='submit' value='submit' color='primary'><span className='fa fa-paper-plus fa-lg' ></span>ADD PRODUCT</Button>
                    </FormGroup>
                </Form>
            </ModalBody>
        </Modal>
        </div>
        
{/*Modal for edit Product*/}
<div className='container'>
        <Modal isOpen ={isOpen2} toggle={handlemodal2} className="modal-modal-dialog-center">
            <ModalHeader className='modal-text' toggle={handlemodal2} > <strong>EDIT PRODUCT DETAILS</strong> </ModalHeader>
            <ModalBody>
                <Form onSubmit={handleSubmitupdate}>
                    <FormGroup>
                        <Label htmlFor='updateproductid'> <strong>PRODUCT-ID</strong></Label>
                        <Input type='text' name='updateproductid' placeholder="Product-Id" onChange={async(e)=>await setupdateproductid(e.target.value)} onBlur={(e)=>formValidation2()}></Input>
                        {Object.keys(updateproductiderror).map((key)=>{
                                if(!isUpdateproductidValid)
                                return <p style={{color:"red"}}>{updateproductiderror[key]}</p>
                                else
                                return <p></p>
                            })} 
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor='updatemrp'> <strong>MRP</strong></Label>
                        <Input type='text' name='updatemrp'  placeholder='MRP' onChange={async(e)=>await setupdatemrp(e.target.value)}></Input>
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor='updatesp'> <strong>SELLING PRICE</strong></Label>
                        <Input type='text' name='updatesp'  placeholder='SP' onChange={async(e)=>await setupdatesp(e.target.value)}></Input>
                    </FormGroup>
                    <FormGroup className='offset-2  col-8  offset-sm-3 col-sm-8 '>
                        <Button  className="p-2" type='submit' value='submit' color='primary' onClick={handleSubmitupdate}><span className='fa fa-paper-plus fa-lg' ></span>EDIT PRODUCT DETAILS</Button>
                    </FormGroup>
                </Form>
            </ModalBody>
        </Modal>
       
        </div>

        <div className="container">
    <Modal className='success-modal' isOpen = {isSuccessOpen1} toggle={toggleSuccessModal1}>
            <ModalHeader toggle={toggleSuccessModal1} className='success-modal-text'> <strong></strong> </ModalHeader>
            <ModalBody>
                
                    <p>Product details added successfully!</p>
                    <p><img src={`${process.env.PUBLIC_URL}/images/tick.png`} className="icons" alt="icons"/></p>                                
                
            </ModalBody>
        </Modal>
    </div>  

    <div className="container">
    <Modal className='success-modal' isOpen = {isSuccessOpen2} toggle={toggleSuccessModal2}>
            <ModalHeader toggle={toggleSuccessModal2} className='success-modal-text'> <p><strong></strong></p> </ModalHeader>
            <ModalBody>
                
                    <p>Product details edited successfully!</p>
                    <p><img src={`${process.env.PUBLIC_URL}/images/tick.png`} className="icons" alt="icons"/></p>                                
                
            </ModalBody>
        </Modal>
    </div>    



          <div className="table table-striped table-bordered container table-hover table-responsive">
            <table className="m-auto">
            <thead className="thead-dark">
            <tr>{getHeader()}</tr>
            </thead>
            <tbody>
            {getRowsData()}
            </tbody>
            </table>
            </div>

            <footer id="main-footer" className="bg-dark text-white mt-5 p-5">
    <div className="container">
      <div className="row">
        <div className="col">
          <p className="lead text-center">
            Copyright &copy;
            <span id="year">2020  </span>
               Sri Balaji Stores
          </p>
        </div>
      </div>
    </div>
  </footer>
            
          </>
            
            );}

    else
    {
      return( <>
          
        <nav className="navbar navbar-dark bg-dark mb p-2">

          <div className="container"><div className="col-9 col-sm-11"><h4 style={{textAlign:"center"}}>Sri Balaji Stores</h4></div>
          <div className="col-3 col-sm-1"><span className="fa fa-sign-out fa-lg btn-white" style={{cursor:"pointer"}} ></span>Logout</div>
          
          </div>
        </nav>
        <div className="bg-primary" style={{color:"white"}}>
          <div className="col-11">
         
          <h2 style={{textAlign:"center"}}> <span className="fa fa-cog"></span> DashBoard</h2>
          </div>
        </div>


        <section id="actions" className="py-4 mb-4" style={{color:"black"}}>
  <div className="container  text-align-center">
    <div className="row justify-content-center">
      <div className=" offset-1  col-7 offset-md-0 col-md-3">
        <a href="#" className="btn  btn-primary admin-btn  mb-2 p-1 btn-block"  onClick={togglemodal1}>
          <i className="fa fa-plus"></i> Add Product
        </a>
      </div>
      <div className=" offset-1  col-7 offset-md-0  col-md-3">
        <a href="#" className="btn admin-btn  btn-success   mb-2 p-1 btn-block" onClick={togglemodal2}>
          <i className="fa fa-edit"></i> Edit Product Details
        </a>
      </div>
      <div className=" offset-1   col-7  offset-md-0 col-md-3">
        <a href="/useradmin" className="btn  btn-warning  admin-btn p-1 btn-block">
          <i className="fa fa-users"></i> Users
        </a>
      </div>
    </div>
  </div>
</section>



{/* modal for add product*/}
<div className='container'>
      <Modal isOpen ={isOpen1} toggle={handlemodal1}>
          <ModalHeader className='modal-text' toggle={handlemodal1} > <strong>ADD PRODUCT</strong> </ModalHeader>
          <ModalBody>
              <Form onSubmit={handleSubmit1}>
                  <FormGroup>
                      <Label htmlFor='productname'><strong>Product Name</strong> </Label>
                      <Input type='text' name='productname'  placeholder='Product-Name'  onChange= {(e)=> setproductname(e.target.value)}></Input>
                  </FormGroup>
                  <FormGroup>
                      <Label htmlFor='productid'> <strong>PRODUCT-ID</strong></Label>
                      <Input type='text' name='productid'   placeholder="Product-Id" onChange={(e)=>setproductid(e.target.value)}></Input>
                  </FormGroup>
                  <FormGroup>
                      <Label htmlFor='mrp'> <strong>MRP</strong></Label>
                      <Input type='text' name='mrp'  placeholder='MRP' onChange={(e)=> setproductmrp(e.target.value)}></Input>
                  </FormGroup>
                  <FormGroup>
                      <Label htmlFor='sp'> <strong>SELLING PRICE</strong></Label>
                      <Input type='text' name='sp'   placeholder='SP' onChange={(e)=>setproductsp(e.target.value)}></Input>
                  </FormGroup>
                  <FormGroup>
                      <Label htmlFor='quantity'> <strong>QUANTITY</strong></Label>
                      <Input type='text' name='quantity'  placeholder='QUANTITY' onChange={(e)=>setproductquantity(e.target.value)}></Input>
                  </FormGroup>
                  <FormGroup>
                      <Label htmlFor='category'> <strong>CATEGORY</strong></Label>
                      <Input type='text' name='category'  placeholder='CATEGORY' onChange={(e)=>setproductcategory(e.target.value)}></Input>
                  </FormGroup>
                  <FormGroup>
                      <Label htmlFor='subcategory'> <strong>SUB CATEGORY</strong></Label>
                      <Input type='text' name='subcategory'   placeholder='SUB-CATEGORY' onChange={(e)=>setproductsubcategory(e.target.value)}></Input>
                  </FormGroup>
                  <FormGroup>
                      <Label htmlFor='featured'> <strong>FEATURED</strong></Label>
                      <Input type='text' name='featured'   placeholder='FEATURED' onChange={(e)=>setfeatured(e.target.value)}></Input>
                  </FormGroup>
                  <FormGroup>
                  <Label htmlFor="image">Image</Label>
              <Input
                type="text"
                name="image"
                value={image}
                id="image" onChange={(e) => setImage(e.target.value)}></Input>
                      <Input type='file'  onChange={uploadFileHandler}></Input>
                  </FormGroup>
                


                  <FormGroup className='offset-3  col-8  offset-sm-4 col-sm-8 '>
                      <Button  className="p-2" type='submit' value='submit' color='primary'><span className='fa fa-paper-plus fa-lg' ></span>ADD PRODUCT</Button>
                  </FormGroup>
              </Form>
          </ModalBody>
      </Modal>
      </div>
      
{/*Modal for edit Product*/}
<div className='container'>
      <Modal isOpen ={isOpen2} toggle={handlemodal2} className="modal-modal-dialog-center">
          <ModalHeader className='modal-text' toggle={handlemodal2} > <strong>EDIT PRODUCT DETAILS</strong> </ModalHeader>
          <ModalBody>
              <Form onSubmit={handleSubmitupdate}>
                  <FormGroup>
                      <Label htmlFor='updateproductid'> <strong>PRODUCT-ID</strong></Label>
                      <Input type='text' name='updateproductid' placeholder="Product-Id" onChange={async(e)=>await setupdateproductid(e.target.value)}></Input>
                  </FormGroup>
                  <FormGroup>
                      <Label htmlFor='updatemrp'> <strong>MRP</strong></Label>
                      <Input type='text' name='updatemrp'  placeholder='MRP' onChange={async(e)=>await setupdatemrp(e.target.value)}></Input>
                  </FormGroup>
                  <FormGroup>
                      <Label htmlFor='updatesp'> <strong>SELLING PRICE</strong></Label>
                      <Input type='text' name='updatesp'  placeholder='SP' onChange={async(e)=>await setupdatesp(e.target.value)}></Input>
                  </FormGroup>
                  <FormGroup className='offset-2  col-8  offset-sm-3 col-sm-8 '>
                      <Button  className="p-2" type='submit' value='submit' color='primary' onClick={handleSubmitupdate}><span className='fa fa-paper-plus fa-lg' ></span>EDIT PRODUCT DETAILS</Button>
                  </FormGroup>
              </Form>
          </ModalBody>
      </Modal>
     
      </div>




          <footer id="main-footer" className="bg-dark text-white mt-5 p-5">
  <div className="container">
    <div className="row">
      <div className="col">
        <p className="lead text-center">
          Copyright &copy;
          <span id="year">2020  </span>
             Sri Balaji Stores
        </p>
      </div>
    </div>
  </div>
</footer>
      </>)
    }
}
export default Admin
/*  */