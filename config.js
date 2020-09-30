var dotenv = require('dotenv');

dotenv.config();


module.exports=
{
    'mongoUrl': 'mongodb+srv://gpsuhas20:gpsuhas20@@cluster0.rsboo.mongodb.net/sbs?retryWrites=true&w=majority',
    'JWT_SECRET': process.env.JWT_SECRET || 'somethingsecret',
    'facebook': {
        clientId: '316383022969965',
        clientSecret:'2548c389e4cb37a480c8ca466b203f0f'
    }
}

/* 'mongoUrl': 'mongodb://127.0.0.1:27017/sbs',*/


