const http = require('http').createServer();
const io = require('socket.io')(http, {
    cors: { origin: "*" }
});



let nb_players=0

io.on('connection', (socket) => {
    console.log('a user connected id:  ',socket.id);

    socket.on("add user",(user)=>{
        socket.broadcast.emit("add user",user)
        nb_players++
        console.log(nb_players)
    })

    socket.on("move made",(move)=>{
        console.log(move)
        socket.broadcast.emit('move made', move)

    })

    //joining a room
    socket.on("join room",(roomID)=>{
        socket.join(roomID)
    })

    // Handle incoming chat messages
    socket.on('new-message', (msg,roomId) => {
        console.log('Message:', msg);
        // Broadcast the message to all connected clients
        socket.broadcast.emit('new-message', msg);
        //socket.to(roomId).emit('new-message', msg)
    });



    // Handle disconnections
    socket.on('disconnect', () => {
        console.log('A user has disconnected.');
        //git
        //send a message user has left the game

    });

    
});

http.listen(8080, () => console.log('listening on http://localhost:8080') );