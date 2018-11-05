const express = require('express')
const router = express.Router()
const controller = require('../controllers/categorias')

router.get('/', controller.list)
router.get('/nova', controller.novaForm)
router.get('/editar/:id', controller.editarForm)
router.get('/excluir/:id', controller.excluir)

router.post('/nova', controller.nova)
router.post('/editar/:id', controller.editar)

module.exports = router
