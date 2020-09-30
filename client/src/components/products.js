/*import React,{useEffect,useState} from 'react';
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
  const[count,setcount]=useState(1);
  //const[count,setcount]=useState(0);

  useEffect(()=>
  {

    const fetchcount=async()=>
    {
       var countfetch= await JSON.parse(localStorage.getItem(JSON.stringify(product.productid)))
       if(countfetch.count>=1)
       {
        setcount(countfetch.count) 
        setstate(countfetch.state)
       }
    }
    fetchcount()
  },[])
  
// dispacthing the product initially 
  useEffect(() => {
    dispatch(addToCart(
      product.productid,
     product.productname,
      product.mrp,
      product.sp,
      product.quantity,
      product.category,
      product.subcategory,
      product.image,
      count))

   
     localStorage.setItem(JSON.stringify(product.productid),JSON.stringify({state,count}));

     
  },[count,state])
 
  function handlestate()
  {
    setstate(false)
  }
  function handleincrement()
  {
    
    setcount(count+1)
  }
  
  function handledecrement()
  {
    if(count<=1 || count==0)
    {
      setstate(true)
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
  <Card className=' prod-card' >
  <span style={{textAlign:'left'}}><Badge style={{marginLeft:'8px'}} className='bg-primary'>{Math.ceil((1-(product.sp/product.mrp))*100)} %OFF</Badge></span>
    <CardImg  className="prod-img" width="100%"  src={img}/>
    <CardBody>
<CardTitle style={{fontSize:"1rem"},{textAlign:"center"}}><strong><span className='fa fa-rupee'></span>
  {product.sp}</strong><strong><strike style={{fontSize:"0.7rem"},{padding:"3px"},{color:"grey"}}>{product.mrp}</strike></strong></CardTitle>
<CardSubtitle style={{fontSize:"0.7rem"},{textAlign:"center"}}><strong >{product.productname}</strong><strong style={{margin:"0.5rem"}}>{product.quantity}</strong></CardSubtitle>
        {state?(<button onClick={handlestate}><span>ADD TO CART</span></button>)
        :(      <p><button className="cartbutton" onClick={handledecrement}>-</button><span style={{fontSize:"0.7rem"}}><b>{count}</b></span><button className="cartbutton" onClick={handleincrement}>+</button></p>
        )}
    </CardBody>
  </Card>)
}

function  Item (props)
{
  
   
    const productsList = useSelector((state) => state.productsList);
    const{loading}=productsList
    const dispatch = useDispatch();
    
    useEffect(() => {
      const fetchproducts=async()=>{
       await dispatch(listProducts(props.location.search.split('?subcategory=')[1]))
       // const {products,error} =  await productsList;

      }
     fetchproducts()
      console.log(props.location.search.split('?subcategory='))
      console.log("dispacthed")
    }, [])
    

    
    const {products,error} =  productsList;
 
    if(loading)
    {console.log(loading)
    return(<div>loading</div>)}

    else
    {
    console.log(loading)
    console.log(props.location.search.split('?subcategory=')[1])
    console.log(products)
    console.log(props.location.search.split('?subcategory=')[0].split('?category=')[1])
    if(products.product)
   { const items=products.product.map((item)=>
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
   <Searchbar back={re} heading={props.location.search.split('?subcategory=')[1]}/>
   <div className="container">
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
}
  export default Item*/

/*
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
   
    dispatch(addToCart(
      product.productid,
     product.productname,
      product.mrp,
      product.sp,
      product.quantity,
      product.category,
      product.subcategory,
      product.image,
      count))
      localStorage.setItem(JSON.stringify(product.productid),JSON.stringify({state,count}));

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
    
    function handledecrement()
    {
      if(count<=1 || count==0)
      {
        setstate(true)
        setcount(0)
        dispatch(addToCart(
          product.productid,
         product.productname,
          product.mrp,
          product.sp,
          product.quantity,
          product.category,
          product.subcategory,
          product.image,
          count))
    
       
         localStorage.setItem(JSON.stringify(product.productid),JSON.stringify({state,count}));

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
    <Card className=' prod-card' >
    <span style={{textAlign:'left'}}><Badge style={{marginLeft:'8px'}} className='bg-primary'>{Math.ceil((1-(product.sp/product.mrp))*100)} %OFF</Badge></span>
      <CardImg  className="prod-img" width="100%"  src={img}/>
      <CardBody>
  <CardTitle style={{fontSize:"1rem"},{textAlign:"center"}}><strong><span className='fa fa-rupee'></span>
    {product.sp}</strong><strong><strike style={{fontSize:"0.7rem"},{padding:"3px"},{color:"grey"}}>{product.mrp}</strike></strong></CardTitle>
  <CardSubtitle style={{fontSize:"0.7rem"},{textAlign:"center"}}><strong >{product.productname}</strong><strong style={{margin:"0.5rem"}}>{product.quantity}</strong></CardSubtitle>
          {state?(<button onClick={handlestate}><span>ADD TO CART</span></button>)
          :(      <p><button className="cartbutton" onClick={handledecrement}>-</button><span style={{fontSize:"0.7rem"}}><b>{count}</b></span><button className="cartbutton" onClick={handleincrement}>+</button></p>
          )}
      </CardBody>
    </Card>)
  }
  
  function  Item (props)
  {
    
     
      const productsList = useSelector((state) => state.productsList);
      const{loading}=productsList
      const dispatch = useDispatch();
      
      useEffect(() => {
        const fetchproducts=async()=>{
         await dispatch(listProducts(props.location.search.split('?subcategory=')[1]))
         // const {products,error} =  await productsList;
  
        }
       fetchproducts()
        console.log(props.location.search.split('?subcategory='))
        console.log("dispacthed")
      }, [])
      
  
      
      const {products,error} =  productsList;
   
      if(loading)
      {console.log(loading)
      return(<div>loading</div>)}
  
      else
      {
      console.log(loading)
      console.log(props.location.search.split('?subcategory=')[1])
      console.log(products)
      console.log(props.location.search.split('?subcategory=')[0].split('?category=')[1])
      if(products.product)
     { const items=products.product.map((item)=>
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
     <Searchbar back={re} heading={props.location.search.split('?subcategory=')[1]}/>
     <div className="container">
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
  }
    export default Item*/



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
    import { slide as Menu } from 'react-burger-menu'
    
    
    
    
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
      <Card className='prod-card1' >
      <span style={{textAlign:'left'}}><Badge style={{marginLeft:'8px'}} className='bg-primary'>{Math.ceil((1-(product.sp/product.mrp))*100)} %OFF</Badge></span>
        <CardImg  className="prod-img1"  src={img}/>
        <CardBody className="prod-card-body1">
    <div className="cart1">
    <CardText className='prod-text1' ><strong  >{product.productname}</strong><strong >{' '}{product.quantity}</strong></CardText>
    <CardText className='prod-text2' ><strong><span className='fa fa-rupee'></span> {product.sp}</strong><strong ><strike style={{color:"grey"}}>{product.mrp}</strike></strong></CardText>
    </div>
    <div className="cart2 col-12">
            {state?(<p><button className="addtocart" onClick={handlestate}><span style={{textAlign:"center"}}><strong>ADD TO CART</strong></span></button></p>)
            :(      <div className="cart-line row"><div className="col-1"><button className=" addtocart2 cartbutton" onClick={handledecrement}>-</button></div><div className="quantity col-1" style={{fontSize:"1rem"}}><b >{count}</b></div><div className="col-1"><button className="cartbuttonr  addtocart2 " onClick={handleincrement}>+</button></div></div>
                    
            )}
            </div>
        </CardBody>
      </Card>
      </div>)
    }
    
    function  Item (props)
    {
      console.log(props.location.state.name)
      const [isOpen, setSide] = useState(true)
      function handleClick()
      {
        setSide(!isOpen)
      }
       
        const productsList = useSelector((state) => state.productsList);
        const{loading}=productsList
        const dispatch = useDispatch();
        
        useEffect(() => {
          const fetchproducts=async()=>{
           await dispatch(listProducts(props.location.search.split('?subcategory=')[1]))
           // const {products,error} =  await productsList;
    
          }
         fetchproducts()
          console.log(props.location.search.split('?subcategory='))
          console.log("dispacthed")
        }, [])
        
        
        
        const {products,error} =  productsList;
     
        if(loading)
        {
            console.log(loading)
            return(
            <>
              <div className="text-center m-5 ">
              <div className="spinner-border" role="status">
                <span className="sr-only align-middle">Loading...</span>
              </div>
              </div>
            </>)
        }
    
        else
        {
          console.log(loading)
          console.log(props.location.search.split('?subcategory=')[1])
          console.log(products)
          console.log(props.location.search.split('?subcategory=')[0].split('?category=')[1])
          if(products.product)
          {
             const items=products.product.map((item)=>
            {
              return(
                
                <div key={item._id} className="col-10 offset-1  offset-sm-0 col-md-4 col-lg-3">
                  <RenderItem product={item}/>
                  </div>
        
            
                )
        
            })
    
            const re='/'+props.location.search.split('?subcategory=')[0].split('?category=')[1]
            var open=true
            if(window.innerWidth<1100)
            {
              open=false
              
              return(

                    <>
                     <div className=''>
              <Searchbar back={re} heading={props.location.search.split('?subcategory=')[1]}/>
              
              <div className="container"style={{backgroundColor:'white'}}>
              <div className="sub-header"><h2>{props.location.state.name}</h2></div>
                <h5 className='all-prod'>ALL PRODUCTS</h5>
              <div className="row card-columns">
                  {items}
                  </div>
                  </div>
                  </div>
       
            </> )
        }
    
        else{
          console.log(window.innerWidth)
              return(

                <>
         {/* <div className='overlay'>
         <Searchbar back={re} heading={props.location.search.split('?subcategory=')[1]}/>
                       :(      <div className="cart-line"><button className=" addtocart2 cartbutton" onClick={handledecrement}>-</button><span className="quantity" style={{fontSize:"1rem"}}><b >{count}</b></span><button className="cartbuttonr  addtocart2 " onClick={handleincrement}>+</button></div>

         <Menu className="sidebar1" isOpen={true} customBurgerIcon={false} width={ '11rem' } noOverlay>
              <div className="container">
                <div className="row">
              <div></div>
            <div className="side-items">
            <div className="col-12 container"><a href ='/groceryandstaples'className="menu-item row"><span className="  col-12 col-sm-12">Grocery</span></a></div> 
            <div className="col-12 container"><a href ='/beverages'className="menu-item row"><span className=" col-12 col-sm-12"> Beverages</span></a></div> 
            <div className="col-12 container"><a href ='/personalcare'className="menu-item row"><span className=" col-12 col-sm-12"> Personal Care</span></a></div> 
            <div className="col-12 container"><a href ='/household'className="menu-item row"><span className="col-12 col-sm-12">Household</span></a></div> 
            <div className="col-12 container"><a href ='/snacks'className="menu-item row"><span className=" col-12 col-sm-12">Snacks</span></a></div> 
            
            </div>
          </div>
          </div>
          </Menu>
          
         <div className="container overlay-container mt-5 mr-1"style={{backgroundColor:'white'}}>
         <div className="sub-header"><h2>{props.location.state.name}</h2></div>
        
           <h5 className='all-prod'>ALL PRODUCTS</h5>
         <div className="row">
            {items}
            </div>
            </div>
            </div>
              */}
   <Searchbar back={re} heading={props.location.search.split('?subcategory=')[1]}/>
              
            <div className="container-fluid">
               <div className="row">
                 <div className="col-2 fixed-sidebar">
                 <div className="side-items">
            <div className="col-12 container"><a href ='/groceryandstaples'className="menu-item row"><span className="  col-12 col-sm-12">Grocery</span></a></div> 
            <div className="col-12 container"><a href ='/beverages'className="menu-item row"><span className=" col-12 col-sm-12"> Beverages</span></a></div> 
            <div className="col-12 container"><a href ='/personalcare'className="menu-item row"><span className=" col-12 col-sm-12"> Personal Care</span></a></div> 
            <div className="col-12 container"><a href ='/household'className="menu-item row"><span className="col-12 col-sm-12">Household</span></a></div> 
            <div className="col-12 container"><a href ='/snacks'className="menu-item row"><span className=" col-12 col-sm-12">Snacks</span></a></div> 
            
            </div>
                 </div>
                 
                
                 <div className="col-10 new-prod-card">
                 <div className="sub-header"><h2>{props.location.state.name}</h2></div>
        
        <h5 className='all-prod'>ALL PRODUCTS</h5>
      <div className="row">
         {items}
         </div>
         
           
              </div>
              </div>
              </div>
             

            
       
            </>)
    }
  }
  else
  {
    return(
    <div className="spinner-grow text-secondary" role="status">
          <span className="sr-only">Loading...</span>
        </div>
        )
    }
        
      
    }
  }

  
export default Item
    
     
    
     
  
   

  
  
   
  
   

 

 