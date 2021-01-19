require('dotenv').config()
const express = require('express')
const app = express()


// const ShopItem = require('./models/designshop')


app.listen(process.env.PORT,()=> console.log(`http://localhost:${process.env.PORT}`))


app.use(express.static('public'))
app.set('view engine','ejs')
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.get('/' , (req, res) =>{
    res.render('index')
})