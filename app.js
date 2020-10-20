const express = require ('express');
const app = express();

const bodyParser = require('body-parser');
const cors = require ('cors');
const mongoose = require ('mongoose');
const port = process.env.PORT || 5000
require('dotenv').config();
const HttpError = require('./models/http-error');

const customerRoutes = require('./routes/customers')

app.use(bodyParser.json()); 
app.use(cors());
const mongoConfig ={
    useUnifiedTopology: true,
    useNewUrlParser: true  
}
mongoose.connect(process.env.MONGO_URI, mongoConfig )
        .then( response=>{
            console.log("Connected to the database")
        })
        // .catch(response => {
        // console.error("Something wrong happened")
        //  })

        app.use('/api/customers', customerRoutes);
 
        app.use(( req, res, next)=> { 
            const error = new HttpError('Could not find Customer', 404);
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
  app.listen(port, (req, res) => {  console.log( `server listening on port: ${port}`);})
  