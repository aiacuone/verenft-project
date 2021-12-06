const express = require('express')
const cors = require('cors')
var jwt = require('jsonwebtoken')

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

const users = {}
const TOKEN_SECRET = 'adrianssecret'

const verifyTokenMiddleware = (req, res, next) => {
  jwt.verify(req.body.token, TOKEN_SECRET, (err) => {
    if (err) {
      throw new Error('TOKEN ERROR')
    }

    next()
  })
}

app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/token', (req, res) => {
  // Sign the token
  var token = jwt.sign({ foo: 'bar' }, TOKEN_SECRET)
  res.send(token)
})

app.get('/options', verifyTokenMiddleware, (req, res) => {
  res.json(collections)
})

app.post('/create', verifyTokenMiddleware, (req, res) => {
  res.send('Create')
})

//create an NFT
app.post('/user', (req, res) => {})

app.listen(port, () => {
  console.log(`Listening to port ${port}`)
})
