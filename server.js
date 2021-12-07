const express = require('express')
var jwt = require('jsonwebtoken')
const cors = require('cors')

const app = express()
const port = 5000

app.use(cors())

const collections = {
  collections: [
    { id: 'collection_1', label: 'The awesome NFTs' },
    { id: 'collection_2', label: 'The Bored Apes' },
    { id: 'collection_3', label: 'Cool Cats' },
    { id: 'collection_4', label: 'Crypto Punks' },
  ],
}

const TOKEN_SECRET = 'adrianssecret'

const verifyTokenMiddleware = (req, res, next) => {
  jwt.verify(req.headers['authorization'], TOKEN_SECRET, (err) => {
    if (err) {
      return res.json({
        error: 'INVALID TOKEN',
      })
    }
    next()
  })
}

app.use(express.json())

app.get('/token', (req, res) => {
  // Sign the token
  var token = jwt.sign({ foo: 'bar' }, TOKEN_SECRET)
  res.json({
    token: token,
  })
})

app.get('/options', verifyTokenMiddleware, (req, res) => {
  res.json(collections)
})

app.post('/create', verifyTokenMiddleware, (req, res) => {
  // console.log(req.body, 'response in server')
  console.log('response in server')
})

app.listen(port, () => {
  console.log(`Listening to port ${port}`)
})
