var express = require('express');
var Orders = require('../models/orders');

const router = express.Router();
const {getToken, isAdmin}=require('../authenticate')
const {isAuth}= require('../authenticate')
var bodyParser=require('body-parser')
var compression=require('compression')
router.use(compression())


router.use(express.json({limit: '50mb'}));
router.use(express.urlencoded({limit: '50mb',extended: true, parameterLimit:50000000000000000000000}));

router.post('/',isAuth,async (req, res) => {


  
 var order = new Orders({
    products:req.body.products,
    //orderid:req.body.orderid,
    name:req.body.name,
    phone:req.body.phone,
    address:req.body.address,
    email:req.body.email,
    placedon:req.body.placedon,
    scheduledon:req.body.scheduledon,
    totalamount:req.body.totalamount
  })


  console.log("order"+order)
  try{
    const newOrder = await order.save();
    console.log(newOrder)

    if (newOrder) {
         res
          .status(201)
          .send({ message: 'Order Placed Successfully'});
      }
  }
   catch(error)
 {
    res.send({ message: 'Order not placed' });
 }
  
  });
  router.get('/allorders', isAuth,isAdmin, async(req,res,next) => {
    
      
      try{
   
          const orders = await Orders.find({})
        var d=[]
          const order=orders.map((item)=>
          {
              var d1={}
              
              d1.custId=item.custId
              d1.orderid=item.orderid
              d1.name=item.name
              d1.phone=item.phone
              d1.address=item.address
              d1.totalamount=item.totalamount
              d1.placedon=item.placedon
              d1.scheduledon=item.scheduledon
             
             
              d.push(d1)
      
          })
      
          console.log(d)
          console.log(orders[0].orderid)
     
          res.send({d});
      }
      catch(error) {
       res.status(404).json({ message: 'Order Not Found.' });
      }
    })



router.get('/',isAuth, async(req,res,next) => {
  const orderid1 = req.query.orderid ? { orderid: req.query.orderid } : {};
    
    try{
 
        const order = await Orders.find({...orderid1})
   
        res.send({order});
    }
    catch(error) {
     res.status(404).json({ message: 'Order Not Found.' });
    }
 
 });


 router.get('/userorder',async(req,res)=>
 {
   console.log(req.query.email)
   

  try
  {
    const orders=await Orders.find({email:req.query.email})
    var d=[]

    const order=orders.map((item)=>
    {
        var d1={}
        d1.orderid=item.orderid
        d1.placedon=item.placedon
        d1.scheduledon=item.scheduledon
        d1.totalamount=item.totalamount
        d.push(d1)

    })

    console.log(d)
    console.log(orders[0].orderid)
   
   res.send(d)



  }
  catch(error)
  {
    res.status(404).json({ message: 'Orders Not Found.' });
  }


 })

module.exports=router