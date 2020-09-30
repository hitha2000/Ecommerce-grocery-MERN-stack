var mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
var Schema = mongoose.Schema;
var x=100;
var userSchema = new Schema({
    custId:{
        type:Number,
        default:''
    },  
    name:{
        type: String,
        default: ''
    },
    phone:{
        type: Number,
        default: ''
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    address:{
        type: String,
        default: ''
    },
    isAdmin:{ 
        type: Boolean,
        default: false
    },
    facebookId : String,
    username:
    {
        type:String
    }
},

    {timestamps:true}
);
userSchema.plugin(AutoIncrement, {inc_field: 'custId'});
Users= mongoose.model('User', userSchema);
module.exports = Users