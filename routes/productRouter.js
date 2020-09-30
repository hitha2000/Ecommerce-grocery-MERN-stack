var express = require('express');
var Products = require('../models/product');
const bodyParser = require('body-parser');
const multer=require('multer');
const router = express.Router();
const fs = require('fs');


const {getToken, isAdmin}=require('../authenticate')
const {isAuth}= require('../authenticate')


router.put('/', isAuth, isAdmin,async(req , res) => {
  console.log('hi');
  const productid= req.body.updateproductid
  const product= await Products.findOne({productid:productid});
  if (product) {
   product.mrp=req.body.updatemrp;
   product.sp=req.body.updatesp;
   
    const updatedproduct = await product.save();
    res.send({
     productid: updatedproduct.updateproductid,
     mrp: updatedproduct.updatemrp,
     sp:updatedproduct.updatesp
    });
  } else {
    res.status(404).send({ message: 'Product Not Found' });
  }
})

router.post('/', isAuth, isAdmin,async (req, res) => {
 
    var product = new Products({
    productid:req.body.productid,
      productname: req.body.productname,
      mrp: req.body.mrp,
      sp: req.body.sp,
      category: req.body.category,
      subcategory:req.body.subcategory,
      quantity:req.body.quantity,
      featured:req.body.featured,
      keywords:req.body.productname+" "+req.body.category+" "+req.body.subcategory
      
    });
    product.image.data=fs.readFileSync(req.body.image.path)
    product.image.contentType = 'image/png';

    const newProduct = await product.save();
    console.log(newProduct)
    if (newProduct) {
      return res
        .status(201)
        .send({ message: 'New Product Created', data: newProduct });
    }
    return res.status(500).send({ message: ' Error in Creating Product.' });
  });

  

  
  module.exports=router;