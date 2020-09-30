var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var productSchema = new Schema({
    productid:{
        type:Number,
        default: ''
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
    featured:{
        type: String,
        required: false
    },

    image:
    {
        data: Buffer, contentType: String
    },
    keywords:
    {
        type:String,
        default:''
    }
});

Products= mongoose.model('Product', productSchema);
module.exports = Products