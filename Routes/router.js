const express = require("express");
const router = new express.Router();
const controllers = require('../Controllers/usersController');
const upload = require("../multerconfig/storageConfig");

//routes
// router.post('/user/register',upload.single('user_profile'),controllers.userpost)

router.post('/getsitedata',controllers.getsitedata)


module.exports = router;