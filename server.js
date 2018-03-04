var express = require('express');
var app = express();
var hbs = require('hbs');
var fs = require('fs');


hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    fs.appendFile('server.log', log + '\n', (error)=>{
        if (error){
            console.log('there has been an error')
           
        } 
    })
    next();
})


app.use((req, res, next)=>{
    res.render('maintenance.hbs')
})

app.use(express.static(__dirname + '/public'));


hbs.registerHelper('getCurrentYear',() => {
    return new Date().getFullYear()
});

hbs.registerHelper('screamIT', (text) => {
    return text.toUpperCase();
});


app.get('/', (req, res)=>{
    
    res.render('home.hbs',{
        pageTitle: 'Home Page',
        welcomeMessage: 'welcome to my message'
    });
})

app.get('/about',(req, res)=>{
    res.render('about.hbs', {
        pageTitle: 'About Page'
    });
})

app.get('/bad', (req,res)=>{
    res.send({
        error: 'Error Message'
    })
});

app.listen(3000);