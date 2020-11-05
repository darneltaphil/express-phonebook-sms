const express = require ('express');

const customerControllers = require("../controllers/customer")

const router = express.Router();

router.get('/search/:name', customerControllers.getCustomerByName )

router.get('/:uid', customerControllers.getAllCustomers )

router.post('/', customerControllers.createCustomer )

router.patch('/:id', customerControllers.updateCustomer )

router.delete('/delete/:id', customerControllers.deleteCustomer )



module.exports = router;