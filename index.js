const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const categorias = require('./routes/categorias')
const publicacoes = require('./routes/publicacoes')

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded())

const port = process.env.PORT || 3000

const resolver = async (req, res) => {
  res.render('index')
}

app.get('/', resolver)

app.use('/categorias', categorias)
app.use('/publicacoes', publicacoes)

app.listen(port, (err) => {
  if (err) {
    console.log('Error!', err)
  } else {
    console.log('Como-fazer server is running on port:', port)
  }
})
