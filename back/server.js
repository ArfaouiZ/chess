const http = require('http').createServer();
const io = require('socket.io')(http, {
    cors: { origin: "*" }
});




let rooms={}

io.on('connection', (socket) => {
    //console.log('a user connected id:  ',socket.id);
    

    //creating a game
    socket.on("create game",(gameInfo)=>{
        let {room,client}=gameInfo
        if (!(room in rooms)) {
            rooms[room] = [client];
            socket.join(room);
        }

        console.log(rooms)
          
    })

    //joining a game

    socket.on("join game",(gameInfo)=>{
        let {room,client}=gameInfo
        if (room in rooms) {
            if (rooms[room].length < 2){
                rooms[room].push(client);
                socket.join(room);
                //io.to(room).emit('start game',{start:true,opponent:client});

                socket.emit("start game",{start:true,opponent:rooms[room][0]})
                socket.to(room).emit("start game",{start:true,opponent:client})

                console.log(rooms)
                
                //send back opponent info if user name exists send user name already exists add html warnings
                //username already taken event 
                //use socketbrodcat and socketemit to send opponents name
            }

            else{
                console.log("room is full")
                //send back to client room is full
            }
        }

        



        else
            console.log("room not found")
            //else send back to client room does not exist 

        
    })


    // Handle incoming chat messages
    socket.on('new message', (msg,room) => {
        console.log('Message:', msg);
        // Broadcast the message to all connected clients
        socket.to(room).emit('new message', msg);
        //socket.to(roomId).emit('new-message', msg)
    });



    // Handle disconnections
    socket.on('disconnect', () => {
        console.log('A user has disconnected.');
        //git
        //send a message user has left the game
        //when user disconnects remove from room

    });

    
});

http.listen(8080, () => console.log('listening on http://localhost:8080') );