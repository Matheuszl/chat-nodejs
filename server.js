const express = require('express');
const path = require('path');
//const cors = require('cors');
const app = express();
const User = require('../database/user');

const server = require('http').createServer(app);
const io = require('socket.io')(server);


app.use((req,res,next)=>{
	res.header('Access-Control-Allow-Origin', '*');
	next();
});

app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'public'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use('/', (req, res) => {
  res.render('index.html');
});

let messages = [];

io.on('connection', socket => {
  console.log(`Socket conectado: ${socket.id}`);

  socket.emit('previousMessage', messages);


  socket.on('sendMessage', data => {

    //aqui ele salva no array
    messages.push(data);

    //stack salvar no banco de dados
    const user = User.create(data);


    socket.broadcast.emit('receivedMessage', data);
  });
});

server.listen("4200");
//6.35
