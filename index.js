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

//Home page____________
app.get('/' , (req, res) =>{
    
  fetch(process.env.mvUriKay)
  .then(res => res.json())
  .then(json => {
      // console.log(json)
      res.render("index", { mydata: json.results  })
  })
.catch(err=>console.log(err))
})

//search _____________
//link zu search https://developers.themoviedb.org/3/search/search-movies
// nach (en-US&) soll mann (query=${req.body.mySearch}) fügen

app.post('/movie-search' , (req, res) =>{
    
  fetch(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.myKey}&language=en-US&query=${req.body.mySearch}&page=1&include_adult=false`)
  .then(res => res.json())
  .then(json => {
      // console.log(json)
      res.render("index", { mydata: json.results  })
  })
.catch(err=>console.log(err))
})

app.get('/moviesdetails/:id' , (req, res) =>{
    
  fetch(`https://api.themoviedb.org/3/movie/${req.params.id}?api_key=${process.env.myKey}&language=en-US`)
  // .findById(req.params.id)
  .then(res => res.json())
  .then(json => {
      console.log(json)
      res.render("moviesdetails", { mydata2: json })
  })
.catch(err=>console.log(err))
})
