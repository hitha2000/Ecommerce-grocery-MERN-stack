import React,{useEffect,useState} from 'react';
import {Card,CardImg,CardBody,CardText,CardSubtitle,Button,CardTitle, Row, Badge} from 'reactstrap'
import {PRODUCTS} from '../shared/data'
import {
  listProducts
} from '../redux/actions/productactions';
import { useSelector, useDispatch} from 'react-redux';
import { element } from 'prop-types';
import Searchbar from './searchbar'
import { use } from 'passport';
import {
  addToCart,
  removeFromCart
} from '../redux/actions/cartactions';
import axios from 'axios'




function arrayBufferToBase64(buffer) {
  var binary = '';
  var bytes = [].slice.call(new Uint8Array(buffer));
  bytes.forEach((b) => binary += String.fromCharCode(b));
  return window.btoa(binary);
};
function RenderItem({product})
{const dispatch = useDispatch();
  const[img,setimg]=useState('');
  const[state,setstate]=useState(true);
 
  const[count,setcount]=useState(0);

  useEffect(()=>
  {

    const fetchcount=async()=>
    {
       var countfetch=JSON.parse(localStorage.getItem(JSON.stringify(product.productid)))
       if(countfetch && countfetch.count>=0)
       {
        setcount(countfetch.count) 
        setstate(countfetch.state)
       }
    }
    fetchcount()
  },[])
  
 useEffect(()=>
 {
 
  if(count>0)
 { dispatch(addToCart(
    product.productid,
   product.productname,
    product.mrp,
    product.sp,
    product.quantity,
    product.category,
    product.subcategory,
    product.image,
    count))


    var newcart=JSON.parse(localStorage.getItem('newcart'))

    var  d={}
    d.productid=product.productid
    d.productname=product.productname
    d.mrp=product.mrp
    d.sp=product.sp
    d.quantity=product.quantity
    d.category=product.category
    d.subcategory=product.subcategory
    d.image=product.image
    d.count=count
    var item=newcart?newcart:[]
   
   
   function checkitem(product)
   {
        if(product.productid!=d.productid)
        {
          return(product)
        }
   }

   var newitem=item.filter(checkitem)

    newitem.push(d)// adding the updated item.


  localStorage.setItem('newcart',JSON.stringify(newitem))

    localStorage.setItem(JSON.stringify(product.productid),JSON.stringify({state,count}));
 }
 },[count])

   function  handlestate()
  {
    
      setstate(false)
      setcount(count+1) 
  }
  function handleincrement()
  {
  
      setcount(count+1)
  }
  
  async function handledecrement()
  {
    const c3=0;
    if( count<=1)
    {
    
      setstate(true)
     setcount(count-1)
    
    
      dispatch(addToCart(
        product.productid,
        product.productname,
        product.mrp,
        product.sp,
        product.quantity,
        product.category,
        product.subcategory,
        product.image,
        0))

        var newcart=JSON.parse(localStorage.getItem('newcart'))

        var  d={}
        d.productid=product.productid
        d.productname=product.productname
        d.mrp=product.mrp
        d.sp=product.sp
        d.quantity=product.quantity
        d.category=product.category
        d.subcategory=product.subcategory
        d.image=product.image
        d.count=count
        var item=newcart?newcart:[]
       
       
       function checkitem(product)
       {
            if(product.productid!=d.productid)
            {
              return(product)
            }
       }

       var newitem=item.filter(checkitem)

     


      localStorage.setItem('newcart',JSON.stringify(newitem))
  
     
       localStorage.setItem(JSON.stringify(product.productid),JSON.stringify({state,c3}));

    }
    else
    {setcount(count-1)}
  }
 
  useEffect(async()=>
  {
    var base64Flag = 'data:image/png;base64,';
    var imageStr =await arrayBufferToBase64(product.image.data.data) 
   var image= await base64Flag + imageStr
   setimg(image)
},[])
 

return(
  

  <div className="new-card">
  <Card className=' prod-card1' >
  <span style={{textAlign:'left'}}><Badge style={{marginLeft:'8px'}} className='bg-primary'>{Math.ceil((1-(product.sp/product.mrp))*100)} %OFF</Badge></span>
    <CardImg  className="prod-img1"  src={img}/>
    <CardBody className="prod-card-body1">
<div className="cart1">
<CardText className='prod-text1' ><strong  >{product.productname}</strong><strong >{' '}{product.quantity}</strong></CardText>
<CardText className='prod-text2' ><strong><span className='fa fa-rupee'></span> {product.sp}</strong><strong ><strike style={{color:"grey"}}>{product.mrp}</strike></strong></CardText>
</div>
<div className="cart2">
        {state?(<p><button className="addtocarts" onClick={handlestate}><span style={{textAlign:"center"}}><strong>ADD TO CART</strong></span></button></p>)
            :(      <div className="cart-line row"><div className="col-1"><button className=" addtocart2 cartbutton" onClick={handledecrement}>-</button></div><div className="quantity col-1" style={{fontSize:"1rem"}}><b >{count}</b></div><div className="col-1"><button className="cartbuttonr  addtocart2 " onClick={handleincrement}>+</button></div></div>
            )}
        </div>
    </CardBody>
  </Card>
  </div>
  )
}

function  SearchComponent (props)
{
  const[data,setdata]=useState('')
    
  console.log(props.location.search.split('=')[1])
  
    
    useEffect(() => {
      const fetchproducts=async()=>{

  
            let config = {
                //headers: {'Authorization': 'Bearer ' + userinform.token},
                params: {
                    productname: props.location.search.split('search=')[1]
                    
                }
            }
            
          console.log(props.location.search.split('search=')[1])
         if(props.location.search.split('search=')[1])   
         {var d= await axios.get('http://localhost:5000/subcategory/search',config)
         console.log(d)
        setdata(d.data)}
        else
        {
          setdata('')
        }
        }
          fetchproducts()
      
    }, [])
    

    
   
 
    if(data)
   { const items=data.map((item)=>
    {
      return(
        
        <div key={item._id} className="col-10 offset-1 offset-sm-0 col-md-4 col-lg-3">
          <RenderItem product={item}/>
           </div>

    
        )

    })

  const re='/'+props.location.search.split('?subcategory=')[0].split('?category=')[1]
 return(
   <>
   <Searchbar back={re} heading={props.location.search.split('?products=')[1]}/>
   <div className="container">
   <h5 className='all-prod'>SEARCHED PRODUCTS:</h5>
   <div className="row">
      {items}
      </div>
      </div>
   </>
  )
    }

  
  else
  {return(<div>loading</div>)
  }
}

  export default SearchComponent