const HttpError = require('../models/http-error');
const { validationResult } = require('express-validator')
const Customer = require('../models/customer');
const User = require('../models/user');


//Create customer model
/* 1. I validate the request entry from the user, if request is invalid, i throw an error with HttpError*/
/* 2. destructure the request body */
/* 3. use the Customer model created to insert document into the collection */
const createCustomer = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
            return next(
                    new HttpError('Invalid inputs passed, please check your data.', 422)
                );
            }

    const { name, mobile, email, address, city, gps, image} = req.body;

    const createdCustomer = new Customer({
        name,
        mobile,
        email,
        address,
        city,
        gps,
        image:"https://via.placeholder.com/25",
        creator : "Kofi"
    })

let user
// try{
//   user = await User.findById(creator);
// }catch(err){        
//   const error = new HttpError('Creating Customer Failed', 500);
//   return next(error)
// }

// if(!user){
//   const error = new HttpError('We could not find the userr ID', 404)
//   return next(error);
// }else{
//   console.log(user)
// }


try {
   // const sess = await mongoose.startSession();
    
    //sess.startTransaction()

    // await createdCustomer.save({session: sess}) ;
    await createdCustomer.save() ;

   // user.customer.push(createdCustomer)

    //await user.save({session : sess})

    //await sess.commitTransaction ();


}catch (err){
    const error = new HttpError('Creating Customer Failed', 500);
    return next(error)
}
res.status(201).json({msg: "Customer added successfully"})
};


//Get all customer documents from the collection
const getAllCustomers  = async (req, res, next) => {
    let customer;
        try {
          customer = await Customer.find().sort({"name":1} );
        } catch (err) {
          const error = new HttpError(
            'Something went wrong, could not find the customer.',
            500
          );
          return next(error);
        }
      
        if (!customer) {
          const error = new HttpError(
            'You have no contacts',
            404
          );
          return next(error);
        }
      
        res.json({ customer }); 
};


//Search customer with their names
const getCustomerByName =async  (req, res, next) => {
    const errors = validationResult(req);
        if (!errors.isEmpty()) {
             return next(
                      new HttpError('Invalid inputs passed, please check your data.', 422)
                 );
             }

        const userName = req.params.name ;
        let customer;
       console.log({name:`/.*${userName}.*/`})
        try {
//             customer = await Customer.find({name:userName});
         customer = await Customer.find({name: userName});
        //customer = await Customer.find({name:/.*userName.*/});
    } catch (err) {
          const error = new HttpError(
            'Something went wrong, could not find the customer.',
            500
          );
          return next(error);
        }
      
        if (!customer) {
          const error = new HttpError(
            'Could not find the user for the provided name.',
            404
          );
          return next(error);
        }
      
        res.json({ customer }); 


};


//Update a customer details
const updateCustomer = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new HttpError('Invalid inputs passed, please check your data.', 422);
    }
  
    const { name, mobile, email, address, city, gps, image } = req.body;
    const customerId = req.params.id;
  
    let customer;
    try {
        customer = await Customer.findById(customerId);
    } catch (err) {
      const error = new HttpError(
        'Something went wrong, could not update the Customer details.',
        500
      );
      return next(error);
    }
  
    customer.name = name;
    customer.mobile = mobile;
    customer.email = email;
    customer.address = address;
    customer.city = city;
    customer.gps = gps;
    customer.image = image;

  
    try {
      await customer.save();
    } catch (err) {
      const error = new HttpError(
        'Something went wrong, could not update the customer.',
        500
      );
      return next(error);
    }
  
    res.status(200).json({ customer });
  };


//Delete a customer with the ID provided by the user
const deleteCustomer = async (req, res, next) => {
    const errors = validationResult(req);
        if (!errors.isEmpty()) {
             return next(
                      new HttpError('Invalid inputs passed, please check your data.', 422)
                 );
             }

        const id = req.params.id ;
    

        let customer;
        try {
            customer = await Customer.findById(id);
        } catch (err) {
          const error = new HttpError(
            'Something went wrong, could not update the Customer details.',
            500
          );
          return next(error);
        }
      
        try {
          await customer.remove();
        } catch (err) {
          const error = new HttpError(
            'Something went wrong, could not update the customer.',
            500
          );
          return next(error);
        }
      
        res.status(200).json({ msg: "Contact deleted successfully"});
    
};


exports.createCustomer = createCustomer;
exports.getAllCustomers = getAllCustomers;
exports.getCustomerByName = getCustomerByName;
exports.updateCustomer = updateCustomer;
exports.deleteCustomer = deleteCustomer;
