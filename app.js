const express = require ('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require ('mongoose');
const cors = require ('cors');
require('dotenv').config();
const port = process.env.PORT 

app.use(bodyParser.json()); 
app.use(cors()); 

//Allowing Cross Origin Resource Sharing
app.use( (req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers', 
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
        );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE')
    next();
  })

//Importing Routes
const customerRoutes = require('./routes/customer')
const userRoutes = require('./routes/user')
const smsRoutes = require('./routes/sms')
const HttpError = require('./models/http-error');

//Using Routes
app.use('/api/customers', customerRoutes);
app.use('/api/user', userRoutes);
app.use('/api/', smsRoutes);

//Redirect to Indalid URL 
app.use(( req, res, next)=> { 
    const error = new HttpError('Invalid URL', 404);
    throw error
});

app.use((error, req, res, next)=>{ 
    if (res.headerSent) {
        return next(error);
      }
      res.status(error.code || 500)
      res.json({message: error.message || 'An unknown error occurred!'});
    
});

//start server
const mongoConfig ={
    useUnifiedTopology: true,
    useNewUrlParser: true  
}
mongoose
    .connect(process.env.MONGO_URI, mongoConfig )
    .then( ()=>{
            app.listen(port, (req, res) => {  console.log( `server listening on port: ${port}`);})
            console.log("Connected to the database");
        })
    .catch(err => {
        console.log( err )
         })
  