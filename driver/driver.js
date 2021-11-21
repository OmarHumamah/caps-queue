"use strict";

const io = require("socket.io-client");
const socket = io.connect("http://localhost:3020/caps");

socket.emit("getAll");

socket.on("pickUp", (payload) => {
  socket.emit("received", payload.orderID);
  setTimeout(() => {
    inTransit(payload);
  }, 1500);
  setTimeout(() => {
    delivered(payload);
  }, 3000);
});
function inTransit(payload) {
  console.log(`pickup ${payload.orderID}`);
  socket.emit("in-transit", payload);
}
function delivered(payload) {
  console.log(`delivered ${payload.orderID}`);
  socket.emit("delivered", payload);
}

module.exports = { inTransit, delivered };
