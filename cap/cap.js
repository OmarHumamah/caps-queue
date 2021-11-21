"use strict";

const faker = require("faker");

const PORT = process.env.PORT || 3020;
const io = require("socket.io")(PORT);

io.on("connection", (socket) => {
  console.log("socket is connected", socket.id);
});

const caps = io.of("/caps");

const messageQueue = {
    Queue: {}
  }


let time;

caps.on("connection", (socket) => {
  console.log(`client ${socket.id} is connected to  name space`);

  socket.on("pickUp", (payload) => {
      const event = "pickUp";
      const id = faker.datatype.uuid();
      messageQueue.Queue[id] = payload;
      time = new Date();
    console.log("EVENT", { event, time, payload });
    socket.emit('addToQueue', payload);
    //caps.emit('forPickup', {id:id, payload: messageQueue.Queue[id]});
    caps.emit('in-transit', payload);
    caps.emit("pickUp", payload);
  });

  socket.on("in-transit", (payload) => {
    const event = "in-transit";
    time = faker.date.soon();
  console.log("EVENT", { event, time, payload });
  });

  socket.on("delivered", (payload) => {
   const event = "delivered";
   time = faker.date.future();
  console.log("EVENT", { event, time, payload });
  caps.emit('delivered',payload);
  });

  socket.on('received', (id)=>{
      delete messageQueue.Queue[id];
  })

  socket.on('getAll', ()=>{
      Object.keys(messageQueue.Queue).forEach((id)=>{
        socket.emit('pickup',{id:id, payload: messageQueue.Queue[id]})
      })
  })
});

