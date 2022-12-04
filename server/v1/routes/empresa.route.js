const {Router} = require('express');
const router = Router();
const empresaControllers = require('../../controllers/empresa.controller');

router.post('/create/empresa', empresaControllers.creationEmpresa);
router.put('/update/empresa/:ID', empresaControllers.updateEmpresa);
router.post('/create/area', empresaControllers.createArea);
router.get('/get/areas', empresaControllers.areasGet)
router.put('/update/area/:AREA_ID', empresaControllers.updateArea);
router.delete('/delete/area/:AREA_ID', empresaControllers.deleteArea);

module.exports = router;