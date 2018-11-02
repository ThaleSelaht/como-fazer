const express = require('express')
const app = express()

const port = process.env.PORT || 3000

const resolver = (req, res) => {
  res.send('Olá estou funcionando!')
}

app.get('/', resolver)

app.listen(port, (err) => {
  if (err) {
    console.log('Error!')
  } else {
    console.log('Como-fazer server is running on port:', port)
  }
})
