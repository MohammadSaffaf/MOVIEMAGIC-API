require('dotenv').config()

const express = require('express')
const app = express()
const fetch = require('node-fetch');
const mongoose = require('mongoose')
const filmdetails = require("./models/filmdetails");
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
      // console.log( "test",json)
      res.render("index", { mydata: json.results })
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
      console.log(json)
      res.render("index", { mydata: json.results  })
  })
.catch(err=>console.log(err))
})

app.get('/moviesdetails/:id' , (req, res) =>{
    
  fetch(`https://api.themoviedb.org/3/movie/${req.params.id}?api_key=${process.env.myKey}&language=en-US`)
  // .findById(req.params.id)
  .then(res => res.json())
  .then(json => {
      // console.log(json)
      res.render("moviesdetails", { mydata2: json })
  })
.catch(err=>console.log(err))
})
app.get("/myFavuriteList", (req, res) => {
  filmdetails.find()
    .then((result) => {
      res.render("myFavuriteList", { FavItem: result });
      console.log(result);
    })
    .catch((err) => console.log(err));
});

app.get('/myFavuriteList/:id' , (req, res) =>{
    
  fetch(`https://api.themoviedb.org/3/movie/${req.params.id}?api_key=${process.env.myKey}&language=en-US`)
  
  .then(res => res.json())
  .then(json => {
    let newFavItem = new filmdetails({
      backdrop_path: json.backdrop_path,
      vote_average: json.vote_average,
      popularity: json.popularity,
      title: json.title,
      status: json.status,
      genres: json.genres,
      overview: json.overview,
      release_date: json.release_date,
      poster_path: json.poster_path,
    });
    newFavItem
      .save()
      .then((result) => {
        console.log("new Fav saved");
        res.redirect("/myFavuriteList");
      })
.catch(err=>console.log(err))
})
});




app.get('/favuriteDetails/:id', (req, res) => {
  // console.log(req.params.id);
  filmdetails.findById(req.params.id)
  
  .then(result => res.render('favuriteDetails',{Details: result}))
  .catch(err => console.log(err))
})

app.get('/favuriteDetails/:id/delete', (req, res) => {
  // console.log(req.params.id);
  filmdetails.findByIdAndDelete(req.params.id)
  // ShopItem.find()
  .then(result => res.render('favuriteDetails',{Details: result}))
  res.send("The file has benn Deleted ")
  .catch(err => console.log(err))
})

app.get('/page/:id' , (req, res) =>{
    
  fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.myKey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${req.params.id}`)
  .then(res => res.json())
  .then(json => {
      // console.log( "test",json)
      if (req.params.id > 1000) {
        req.params.id = 1000
    }
      res.render("index", { mydata: json.results })
  })
.catch(err=>console.log(err))
})