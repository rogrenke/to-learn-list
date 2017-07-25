var express = require('express');
var router = express.Router();
const mentorController = require('../controllers/mentorController')

router.get('/new', mentorController.formMentor)

router.post('/new', mentorController.createMentor)

router.get('/', mentorController.listMentors)

module.exports = router;
