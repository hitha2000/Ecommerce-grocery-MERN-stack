var express = require('express');
var Products = require('../models/product');
const bodyParser = require('body-parser');
const router = express.Router();
router.use(bodyParser.json())

function escapeRegex(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}
router.get('/search', async (req, res) => {
  const productname = req.query.productname ? { productname: req.query.productname } : {};
  console.log((productname.productname))


    const regex = new RegExp(escapeRegex(req.query.productname), 'gi');
    Products.find({keywords:regex}, function(err, products){
      if(err){
          console.log(err);
      } else {
         if(products.length < 1) {
             noMatch = "Product not available,sorry.";
         }
         res.send(products)
        
      }
   });
})


router.get('/', async(req,res,next) => {
    const subcategory = req.query.subcategory ? { subcategory: req.query.subcategory } : {};
    try{
 
        const product = await Products.find({ ...subcategory})
   
        res.send({product});
    }
    catch(error) {
     res.status(404).json({ message: 'Product Not Found.' });
    }
 
 });

 router.get('/featured', async(req,res,next) => {
  
  try{

      const product = await Products.find({featured:"yes"})
 
      res.send({product});
  }
  catch(error) {
   res.status(404).json({ message: 'Product Not Found.' });
  }
});

module.exports = router;
