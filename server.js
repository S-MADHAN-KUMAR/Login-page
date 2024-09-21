const express = require('express');
const app = express();
const hbs = require('hbs');
const session = require('express-session');
const nocache = require('nocache');

const username = 'admin';
const userpassword = 'admin123';

// Middleware
app.use(express.static('public'));
app.set('view engine', 'hbs');
app.use(express.urlencoded({ extended: true }));
app.use(nocache());
app.use(session({
  secret: 'Keyboard cat',
  resave: true,
  saveUninitialized: true,
}));


//Login Check

app.get('/', (req, res) => {
  if (req.session.user) {
    res.render('home'); 
  } else {
    res.render('login'); 
  }
});

//Login validation 

app.post('/verify', (req, res) => {
  if (req.body.name === username && req.body.password === userpassword) {
    req.session.user = req.body.name;  
    res.redirect('/home');  
  } 
  else if (req.body.name === "" || req.body.password === ""){
    res.render('login', {
      message: '☠ Enter the Details ☠ '  
    });
  }
  else {
    res.render('login', {
      message: '☠ Login failed ☠ '  
    });
  }
});

//home page 

app.get('/home', (req, res) => {
  if (!req.session.user) {
    res.redirect('/');  }
    else{
      res.render('home');
    }
}) 

//Logout 

app.get('/logout', (req, res) => {
  req.session.destroy();  
  res.redirect('/');
});


app.listen(5000, () => console.log("Server running on port 5000"));
