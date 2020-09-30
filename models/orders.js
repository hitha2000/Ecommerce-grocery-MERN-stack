var mongoose = require('mongoose');

const AutoIncrement = require('mongoose-sequence')(mongoose);
var Schema = mongoose.Schema;



var productSchema1 = new Schema({
    productid:{
        type:Number,
       
    },  
    productname:{
        type: String,
        required: true

    },
    mrp:{
        type: Number,
        required: true
    },
    sp:{
        type: Number,
        required: true
    },
    quantity:{
        type: String,
        required: true
    },
    category:{
        type: String,
        required:true
    },
    subcategory:{
        type: String,
        required:true
    },
   
   
    image:
    {
        data: Buffer, contentType: String
    },

   
    count:
    {
        type: Number,
        required: false
    },
   
});

var orderSchema = new Schema({
    products:[productSchema1],
    totalamount:
    {
        type:Number,
        required:true
    },
    scheduledon: {
        type: String,
        required: true
    },
    orderid: {
        type: Number,
       
    },
    placedon: {
        type:String,
        required: true
    },
   
    
    name: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    address:
    {
        type:String,
        required:true
    }
  
}, {
    timestamps: true
});
orderSchema.plugin(AutoIncrement, {inc_field: 'orderid'});
Orders= mongoose.model('Order', orderSchema);
module.exports = Orders