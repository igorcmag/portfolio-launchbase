const express = require('express');
const nunjucks = require('nunjucks');

const server = express();
const videos = require('./data.js');

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
        role: "Instrutor Rocketseat",
        description: 'Programador full-stack, focado em trazer o melhor ensino para iniciantes na programação. Colaborador da <a href="https://rocketseat.com.br" target="_blank">Rocketseat</a>',
        links: [
            {name: "Github", url: "/"},
            {name: "Linkedin", url: "/"},
            {name: "Lattes", url: "/"}
        ]
    };
    return res.render('about', {about});
});

server.get('/portfolio', function(req, res){
    return res.render('portfolio', {items: videos});
});

server.get('/video', function(req, res){
    const id = req.query.id;

    const video = videos.find(function(video){
        if(video.id == id){
            return true;
        };
    });
    if(!video){
        res.send('Video not found');
    }
    res.render('video', {item: video});
});

server.listen(5002, function(){
    console.log('server is running');
});