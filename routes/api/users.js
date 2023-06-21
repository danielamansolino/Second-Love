const express = require('express');
const router = express.Router();
const usersCtrl = require('../../controllers/api/users');

// POST route to handle a controller function /api/users
router.post('/', usersCtrl.create);

// POST route to handle log in controller
router.post('/login', usersCtrl.login)

// we need to export our router 
module.exports = router;