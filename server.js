let express = require('express');
let app = express();
let port = process.env.port || 3000;
require('./dbConnection');
let router = require('./routers/router');
const { Socket } = require('socket.io');
let http = require('http').createServer(app);
let io = require('socket.io')(http);

app.use(express.static(__dirname + '/'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use('/api/Notes',router);

/* Creating the socket */
io.on('connection',(socket)=>{
    console.log('User Connected');
    socket.on('disconnect', () => {
        console.log('User Disconnected');
    });
    /* Emitting a random number below 10 in the log to verify 
    the socket with a 1000 mili second interval*/
    setInterval(()=>{
        x = parseInt(Math.random()*10);
        socket.emit('number', x);
        console.log('Emitting Number ' + x);
    }, 1000)
});

http.listen(port, ()=>{
    console.log('Express Server Started');
});