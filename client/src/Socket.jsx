import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import socket from "./Socket/Socket";

const Socket = () => {
  const [message, setMessage] = useState([]);
  const [room, setRoom] = useState("public");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(message);
    socket.emit("usermessage", room, message);
  };

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  const createRoom = () => {
    setRoom(message);
    socket.emit("join", room);
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Button onClick={createRoom}>Create Room</Button>

        <h1>{room ? room : "Public Room"}</h1>
        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            name="message"
            onChange={(e) => handleChange(e)}
          />
        </Form.Group>
      </Form>
    </>
  );
};

export default Socket;
