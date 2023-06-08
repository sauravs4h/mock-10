const express=require("express");
const app=express();

const http=require("http");
const httpserver=http.createServer(app);

const {user}=require("./routes/user.routes");
app.use(express.json())
app.use("/user",user)

const {Server}=require("socket.io");
const io=new Server(httpserver);
let room;
io.on("connection",(socket)=>{

    socket.on("roomvalue",(msg)=>{
        room=msg;
        //console.log(room)
        socket.join(room);
    })

    socket.on("changeroomvalue",(msg)=>{
        room=msg;
        //console.log(room)
        socket.join(room);
    })

    socket.on("msg",(msg)=>{
        //console.log(msg);

        socket.broadcast.to(room).emit("servermessage",msg);
    })


    console.log("client is connected")

})

httpserver.listen(8080,()=>{
    console.log("running on 8080")
})