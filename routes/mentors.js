var express = require('express');
var router = express.Router();
const mentorController = require('../controllers/mentorController')

router.get('/new', mentorController.formMentor)

router.post('/new', mentorController.createMentor)

module.exports = router;
