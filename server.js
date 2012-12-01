var app = require('http').createServer(handler),
  io = require('socket.io').listen(app),
  fs = require('fs');

app.listen(3000);

function handler(request, response){
  fs.readFile(__dirname + "/client.html", function(error, data){
    response.writeHead(200);
    response.end(data);
  });
}

io.sockets.on('connection', function(socket){
  socket.emit('origin', {text: 'origin text'});
  socket.on('change', function(data){
    io.sockets.emit('new', data);
  });
});

