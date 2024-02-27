const express = require('express')
const { addMember } = require('../controllers/memberController')
const router = express.Router()

router.post('/', addMember)


module.exports = router