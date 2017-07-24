const express = require('express');
const router = express.Router();
const listController = require('../controllers/listController')
const itemController = require('../controllers/itemController')



// Functionality of checking / unchecking taken out for the moment until we have checkbox implemented.
router.get('/edit', itemController.updateItem, listController.getListById)

router.get('/:id', itemController.getItemById)

module.exports = router;


//http://localhost:7777/items/edit?item=5975cc8129b6f1144c38516c&status=incomplete
//http://localhost:7777/items/edit?item=5975cc8129b6f1144c38516c&status=incomplete
