const express = require('express');
const router = express.Router();
const listController = require('../controllers/listController')
const itemController = require('../controllers/itemController')

router.get('/new', listController.createForm)

router.post('/new', listController.createList)

router.get('/', listController.getLists)

router.get('/:id', listController.getListById)

router.post('/:id', itemController.createItem, listController.getListById)

router.post('/:id/edit', listController.updateList)

router.get('/:id/book_face_to_face', listController.bookFaceToFaceOnListCompleted)

module.exports = router;
