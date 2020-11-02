const express = require ('express');
const app = express();
require('dotenv').config();
const bodyParser = require('body-parser');
const mongoose = require ('mongoose');
const port = process.env.PORT 
const cors = require ('cors');



const customerRoutes = require('./routes/customer')
const userRoutes = require('./routes/user')
const smsRoutes = require('./routes/sms')
const HttpError = require('./models/http-error');

app.use(bodyParser.json()); 
app.use(cors()); 


        app.use('/api/customers', customerRoutes);
        app.use('/api/user', userRoutes);
        app.use('/api/', smsRoutes);
 
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
            console.log("Connected to the database")
        })
    .catch(err => {
        console.log( err )
         })
  