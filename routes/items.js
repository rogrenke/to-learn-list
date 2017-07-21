const express = require('express');
const router = express.Router();
const listController = require('../controllers/listController')
const itemController = require('../controllers/itemController')


router.get('/edit', itemController.updateItem, listController.getListById)


module.exports = router;
