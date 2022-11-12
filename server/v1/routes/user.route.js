const {Router} = require('express');
const router = Router();
const auth = require('../../controllers/auth.controller.js');

router.post('/',auth);

module.exports = router;