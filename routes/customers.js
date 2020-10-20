const express = require ('express');

const customerControllers = require("../controllers/customers")

const router = express.Router();

router.get('/:name', customerControllers.getCustomerByName )

router.get('/', customerControllers.getCustomer )

router.post('/', customerControllers.createCustomer )



module.exports = router;