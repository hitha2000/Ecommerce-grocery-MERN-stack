import React,{useState, useEffect}  from 'react';
  import {Card,CardImg,CardBody,CardText,CardSubtitle,Button,CardTitle, Row, Badge} from 'reactstrap'
  //import data from '../shared/data1'
  import ScrollMenu from 'react-horizontal-scrolling-menu';
  
  import axios from 'axios'
  import Cookie from 'js-cookie'
  import {
    addToCart,
    
  } from '../redux/actions/cartactions';
  import { useSelector, useDispatch} from 'react-redux';

  const Arrow = ({ text, className }) => {
    return (
      <div
        className={className}
      >{text}</div>
    );
  };
   

  function arrayBufferToBase64(buffer) {
    var binary = '';
    var bytes = [].slice.call(new Uint8Array(buffer));
    bytes.forEach((b) => binary += String.fromCharCode(b));
    return window.btoa(binary);
  };

   
  const ArrowLeft = Arrow({ text: '<', className: 'arrow-prev' });
  const ArrowRight = Arrow({ text: '>', className: 'arrow-next' });
   
  
  function RenderItem({product})
  {
    const dispatch = useDispatch();
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
   
    <Card className=' prod-card2' >
    <span style={{textAlign:'left'}}><Badge style={{marginLeft:'8px'}} className='bg-primary'>{Math.ceil((1-(product.sp/product.mrp))*100)} %OFF</Badge></span>
      <CardImg  className="prod-img1"  src={img}/>
      <CardBody className="prod-card-body1">
  <div className="cart1">
  <p className='prod-text m-0' style={{textAlign:"center"}}><strong >{product.productname}</strong><strong >{' '}{product.quantity}</strong></p>
  <p className='prod-text m-0'  style={{textAlign:"center"}}><strong><span className='fa fa-rupee'></span> {product.sp}</strong><strong><strike style={{color:"grey"}}>{product.mrp}</strike></strong></p></div>
  <div className="cart2">
          {state?(<p><button className="addtocart3 addtocart4" onClick={handlestate}><span style={{textAlign:"center"}}><strong>ADD TO CART</strong></span></button></p>)
          :(      <div className="cart-line"><button className=" cartbutton3 addtocart3 " onClick={handledecrement}>-</button><span className="quantity1" style={{fontSize:"1rem"}}><b >{count}</b></span><button className=" cartbuttonr3 addtocart3" onClick={handleincrement}>+</button></div>
          )}
          </div>
      </CardBody>
    </Card>
   

)
  }
  
  function ScrollItem()
    {
      const [data, setdata] = useState('')
     
      
      
      useEffect(() => {
          
          const fetchorders=async()=>{
              let config = {
                  //headers: {'Authorization': 'Bearer ' + userinform.token}
                 
                }
  
           const d = await axios.get('http://localhost:5000/subcategory/featured')
          setdata(d.data)
          }
         fetchorders()        
         
        }, [])
  
        console.log(data)



        if(data)
      
      {  const items=data.product.map((item)=>
      {
        return(
          
          <div key={item.id} className="itemsscroll">
            <RenderItem product={item}/>
             </div>
             
          )
  
      })
    
   return(
    
    <div>
      <h2 style={{marginLeft:"3rem"}}>Best Offers</h2>
     <ScrollMenu  classname="scrollmenu"data={items}   
            transition={15} inertiaScrollingSlowdown={2} />
    </div>  
     
    )
   }
   else
   {
     return(<>loading</>)
   }
   }

    export default ScrollItem
     