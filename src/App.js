import React, { useState } from "react";
import io from "socket.io-client";
import { Container, Header, Form, Input, Button } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";

const socket = io("http://localhost:3333"); // replace with your websocket server URL

function App() {
  const [name, setName] = useState("");
  const [nameSubmitted, setNameSubmitted] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setNameSubmitted(true);
    socket.emit("nameEntered", name);
  };

  const handleAnswerClick = () => {
    socket.emit("buttonPressed");
  };

  return (
    <Container
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
      }}
    >
      <Header as="h1" textAlign="center">
        Trivia
      </Header>
      {!nameSubmitted && (
        <Form onSubmit={handleSubmit}>
          <Form.Field>
            <label>Enter your name:</label>
            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Field>
          <Button type="submit">Submit</Button>
        </Form>
      )}
      {nameSubmitted && (
        <div>
          <p>Hello, {name}!</p>
          <Button onClick={handleAnswerClick}>Answer</Button>
        </div>
      )}
    </Container>
  );
}

export default App;
