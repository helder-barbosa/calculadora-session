const path = require('path')
const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const session = require('express-session')
const port = process.env.PORT || 3000

//app.use(cookieParser())
app.use(session({
  secret: 'fullstack',
  maxAge: 5 * 60 * 1000
}))
app.use(bodyParser.urlencoded({ extended: true }))

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
  let contas = []
  console.log('[Session-ID]', req.session.id)
  if ('contas' in req.session) {
    contas = req.session.contas
  }
  res.render('index', {
    contas
  })
})

app.post('/calc', (req, res) => {
  let { num1, num2, op } = req.body
  num1 = parseInt(num1)
  num2 = parseInt(num2)
  let total = 0
  if (op === '+') {
    total = num1 + num2
  } else if (op === '-') {
    total = num1 - num2
  } else if (op === '*') {
    total = num1 * num2
  } else if (op === '/') {
    total = num1 / num2
  }
  let contas = []
  if ('contas' in req.session) {
    contas = req.session.contas
  }
  contas.push({
    num1, num2, op, total
  })
  req.session.contas = contas
  res.redirect('/')
})

app.listen(port, () => console.log('[SERVER] Running...'))
