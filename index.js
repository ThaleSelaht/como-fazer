const express = require('express')
const app = express()
const axios = require('axios')
const bodyParser = require('body-parser')

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
  await axios.post('https://como-fazer-tj.firebaseio.com/categorias.json', {
    'categoria': req.body.categoria
  })
  res.redirect('/categorias')
}
const listarCategorias = async (req, res) => {
  const content = await axios.get('https://como-fazer-tj.firebaseio.com/categorias.json')
  if (content.data) {
    const categorias = Object.keys(content.data).map(key => {
      return {
        id: key,
        ...content.data[key]
      }
    })
    res.render('categorias/index', { categorias: categorias })
  } else {
    res.render('categorias/index', { categorias: [] })
  }
}

const excluirCategoria = async (req, res) => {
  await axios.delete(`https://como-fazer-tj.firebaseio.com/categorias/${req.params.id}.json`)
  res.redirect('/categorias')
}

const editarCategoria = async (req, res) => {
  const content = await axios.get(`https://como-fazer-tj.firebaseio.com/categorias/${req.params.id}.json`)
  res.render('categorias/editar', {
    categoria: {
      id: req.params.id,
      ...content.data
    }
  })
}

const modificarCategoria = async (req, res) => {
  await axios.put(`https://como-fazer-tj.firebaseio.com/categorias/${req.params.id}.json`, {
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
