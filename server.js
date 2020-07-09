const express = require('express');
const nunjucks = require('nunjucks');

const server = express();
const projects = require('./data.js');

server.set('view engine', 'njk');

nunjucks.configure('views', {
    express: server,
    autoescape: false,
    noCache: true
});

server.use(express.static('public'));

server.get('/', function(req, res){
    const about = {
        avatar_url: "https://avatars0.githubusercontent.com/u/62859328?s=460&u=c96b4ff1cc9cbe13b6756b780fe9814587b932e8&v=4",
        name: "Igor Magalhães",
        role: "Engineering Student @ ITA",
        description: 'Third year undergraduate student. Passionate about Artificial Intelligence and Software Engineering. Learning Web Development at <a href="http://www.rocketseat.com.br" target="_blank"s>Rocketseat</a>.',
        links: [
            {name: "Github", url: "https://www.github.com/igorcmag"},
            {name: "Linkedin", url: "https://www.linkedin.com/in/igorcmag"},
            {name: "Lattes", url: "http://lattes.cnpq.br/2019990052192292"}
        ]
    };
    return res.render('about', {about});
});

server.get('/portfolio', function(req, res){
    return res.render('portfolio', {items: projects});
});

server.use(function(req, res) {
    res.status(404).render("not-found");
});

server.listen(process.env.PORT || 5002, function(){
    console.log('server is running');
});