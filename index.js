const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const axios = require('axios')
const api = require('./api')

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded())

const port = process.env.PORT || 3000

const resolver = async (req, res) => {
  const content = await axios.get('https://como-fazer-tj.firebaseio.com/teste.json')
  console.log(content.data)

  res.render('index', { i: content.data })
}
const novaCategoria = (req, res) => {
  res.render('categorias/nova')
}
const adicionarCategoria = async (req, res) => {
  await api.create('categorias', {
    'categoria': req.body.categoria
  })
  res.redirect('/categorias')
}
const listarCategorias = async (req, res) => {
  const categorias = await api.listar('categorias')
  if (categorias) {
    res.render('categorias/index', { categorias: categorias })
  } else {
    res.render('categorias/index', { categorias: [] })
  }
}

const excluirCategoria = async (req, res) => {
  await api.apagar('categorias', req.params.id)
  res.redirect('/categorias')
}

const editarCategoria = async (req, res) => {
  const categoria = await api.get('categorias', req.params.id)
  res.render('categorias/editar', {
    categoria
  })
}

const modificarCategoria = async (req, res) => {
  await api.update('categorias', req.params.id, {
    categoria: req.body.categoria
  })
  res.redirect('/categorias')
}

app.get('/', resolver)
app.get('/categorias', listarCategorias)
app.get('/categorias/nova', novaCategoria)
app.get('/categorias/editar/:id', editarCategoria)
app.get('/categorias/excluir/:id', excluirCategoria)

app.post('/categorias/nova', adicionarCategoria)
app.post('/categorias/editar/:id', modificarCategoria)

app.listen(port, (err) => {
  if (err) {
    console.log('Error!', err)
  } else {
    console.log('Como-fazer server is running on port:', port)
  }
})
