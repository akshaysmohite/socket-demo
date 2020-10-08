const express = require('express');
const mongoose = require('mongoose');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const users = require('./routes/users');
const { exists } = require('fs');
const { exit } = require('process');
console.log(users);
mongoose.connect('mongodb+srv://dbuser:dbuser@cluster0-qnimp.mongodb.net/veefin', {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    })
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...'));

app.use(express.static(__dirname + '/public'));
app.get('/',function(req,res){
    res.sendFile(__dirname + '/public/index.html');
});

//app.use('/api/users',users);


io.on('connection',function(socket){
    socket.emit('a',{message : "Users is connected"});

    socket.on('buttonclicked',function(data){
        console.log(data);

        socket.emit('received',{message:"got ur message dear"})
    });
})


server.listen(process.env.PORT || 3000, () => console.log('server started'));