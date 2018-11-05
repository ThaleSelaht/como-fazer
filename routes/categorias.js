const express = require('express')
const router = express.Router()
const api = require('../api')

router.get('', async (req, res) => {
  const categorias = await api.listar('categorias')
  if (categorias) {
    res.render('categorias/index', { categorias: categorias })
  } else {
    res.render('categorias/index', { categorias: [] })
  }
})

router.get('/nova', (req, res) => {
  res.render('categorias/nova')
})

router.get('/editar/:id', async (req, res) => {
  const categoria = await api.get('categorias', req.params.id)
  res.render('categorias/editar', {
    categoria
  })
})

router.get('/excluir/:id', async (req, res) => {
  await api.apagar('categorias', req.params.id)
  res.redirect('/categorias')
})

router.post('/nova', async (req, res) => {
  await api.create('categorias', {
    'categoria': req.body.categoria
  })
  res.redirect('/categorias')
}
)
router.post('/editar/:id', async (req, res) => {
  await api.update('categorias', req.params.id, {
    categoria: req.body.categoria
  })
  res.redirect('/categorias')
})

module.exports = router
