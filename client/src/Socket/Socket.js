
import io from "socket.io-client";
const ENDPOINT = "http://steven-tower:5000"

const socket = io(ENDPOINT);


socket.on('connect', () => {
  //console.log(`connected as ${socket.id}`)
  socket.emit("userJoin", "public")
})

socket.on("greeting", greeting => console.log(greeting))

socket.on("serverMessage", (data, id) => {
  //dispatch(messageReducer(data))
  console.log(`from ${id}: ${data}`)
})

socket.on("PM", data => {
  //dispatch(messageReducer(data))
  console.log(`from server: ${data}`)
})

socket.on("userLeft", (exit) => {
  console.log(exit);

});

export default socket