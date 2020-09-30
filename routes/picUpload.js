const express = require('express');
const bodyParser = require('body-parser');
const multer=require('multer');

const storage=multer.diskStorage(
    {
        destination:(req,file,cb)=>// file is the file uploaded.
        {
            cb(null,'public/images');//err,destination folder

        },

        filename:(req,file,cb)=>
        {
            cb(null,file.originalname);// gives the original name of the file uploaded.
        }

    }

);

const imageFileFilter=(req,file,cb)=>
{
    if(!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) // we are checking if the extension is not matching any of these extesnions.
    {
        return cb(new Error("You can upload only image files!"),false)// we generating an error because ext are not matching
    }
    cb(null,true);

};

const upload =multer({storage:storage,fileFilter:imageFileFilter});// config the multer module 
// storage is where we want to store the uploaded data 
//filefilter is for the condtions imposed on the uploaded folder 
//so that only correct documents are uploaded to the server.


const uploadRouter=express.Router();

uploadRouter.use(bodyParser.json());
// only post 

//imageFile is the name of the form field on the client.
uploadRouter.post('/',upload.single('image'),(req,res)=>
{
    res.statusCode=200;
    res.setHeader("Content-Type",'application/json');
    res.json(req.file);// url of the image where the image is stored this url can used in json file.
})
module.exports=uploadRouter;