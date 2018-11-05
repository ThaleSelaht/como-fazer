const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const axios = require('axios')
const categorias = require('./routes/categorias')

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded())

const port = process.env.PORT || 3000

const resolver = async (req, res) => {
  const content = await axios.get('https://como-fazer-tj.firebaseio.com/teste.json')
  console.log(content.data)

  res.render('index', { i: content.data })
}

app.get('/', resolver)

app.use('/categorias', categorias)

app.listen(port, (err) => {
  if (err) {
    console.log('Error!', err)
  } else {
    console.log('Como-fazer server is running on port:', port)
  }
})
