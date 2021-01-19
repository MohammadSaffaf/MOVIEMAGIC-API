require('dotenv').config()
const express = require('express')
const app = express()
const fetch = require('node-fetch');
const mongoose = require('mongoose')
mongoose.connect(process.env.dbUri,{useNewUrlParser: true, useUnifiedTopology: true})
.then(result =>{
app.listen(process.env.PORT,()=> console.log(`http://localhost:${process.env.PORT}`))
})
.catch(err => console.log(err))


app.use(express.static('public'))
app.set('view engine','ejs')
app.use(express.json())
app.use(express.urlencoded({extended: false}))


app.get('/' , (req, res) =>{
    let mydata;
  fetch(process.env.mvUriKay)
    .then((res) => res.json())
    .then((data) => {
        // console.log(data);
        mydata = data;
      res.render("index", { mydata : mydata});
      console.log(mydata);
    })
    .catch((err) => console.log(err));
})

// app.listen(process.env.PORT,()=> console.log(`http://localhost:${process.env.PORT}`))