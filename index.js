// Config inicial
require('dotev').config()
const express = require('express')
const mongoose = require('mongoose')
const app = express()




// Forma de ler JSON / miiddlewares
app.use(
  express.urlencoded({
    extended: true
  })
)
app.use(express.json())


// Rotas da API
const personRoutes = require('./routes/personRoutes')

app.use('/person', personRoutes)


// Rota inicial / endpoint
app.get('/', (req,res) => {

  // mostrar req
  res.json({message: 'Oi express!'})

})
const DB_PASSWORD = process.env.DB_PASSWORD

//entregar um porta
mongoose.connect(
`mongodb+srv://nicolas:${DB_PASSWORD}@cluster0.8xmxkgy.mongodb.net/?retryWrites=true&w=majority`
  )
.then(() => {
  console.log("Conectamos ao mongoDB");
  app.listen(3000)
})
.catch((err) => console.log(err))

