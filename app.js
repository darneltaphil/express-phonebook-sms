const express = require ('express');
const app = express();
const cors = require ('cors');
const mongoose = require ('mongoose');
const bodyParser = require('body-parser');
const port = process.env.PORT || 5000
require('dotenv').config();

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
         

//routing to the weather display
app.get('/', (req,res) => {
     res.send("It is working")

  });
  //start server
  app.listen(port, (req, res) => {  console.log( `server listening on port: ${port}`);})
  