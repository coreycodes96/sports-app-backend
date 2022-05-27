import app from "./app";
import mongoose from "mongoose";
import { createServer } from "http";
import { Server } from "socket.io";

//Socket IO
const httpServer = createServer();
const io = new Server(httpServer, {
    cors: {
        //origin: '*',
        origin: 'http://192.168.1.114:3000/',
    }
});

//Connect to mongoDB database
mongoose.connect(process.env.MONGODB_URL!);

//Start socket.io
io.on("connection", socket => {
    const handshake = socket.handshake.query;

    console.log(`Connection: ${socket.id}`);

    console.log(handshake);

    //Controllers

    socket.on('disconnect', function () {
        console.log("disconnect: ", socket.id);
        //socket.handshake.query = null;
    });
});

//Start http server
httpServer.listen(3000);

//Port
const PORT = process.argv[3];

//Starting the app
app.listen(PORT, () => {
    console.log(`You are connected on port ${PORT}`);
});