"use strict";

const io = require("socket.io-client");
const socket = io.connect("http://localhost:3020/caps");

const faker = require("faker");

 function order() {
  const store = "ACME-widgets";
  const orderID = faker.datatype.uuid();
  const customer = faker.name.findName();
  const address = faker.address.country();

  const payload = {
    store,
    orderID,
    customer,
    address
}
socket.emit('pickUp', payload)
}
order();

socket.on('delivered', thanksMSG)
 function thanksMSG(payload){
    console.log(`VENDOR: Thank You For Delivering ${payload.orderID}`);
}
socket.on('addToQueue', (payload)=>{
    console.log(`VENDOR: ${payload.orderID} in ${payload.store} Queue`);
})

module.exports = thanksMSG;