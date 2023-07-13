import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import { Container, Header, Form, Input, Button } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";

const socket = io("http://localhost:3333"); // replace with your websocket server URL

function App() {
  const [name, setName] = useState("");
  const [nameSubmitted, setNameSubmitted] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setNameSubmitted(true);
    socket.emit("nameEntered", name);
  };

  const handleAnswerClick = () => {
    socket.emit("buttonPressed");
  };

  const showToastMessage = (message) => {
    setToastMessage(message);
    setShowToast(true);

    setTimeout(() => {
      setShowToast(false);
    }, 3000); // Adjust the duration (in milliseconds) as per your requirement
  };

  useEffect(() => {
    socket.on("playerJoined", (playerName) => {
      showToastMessage(`${playerName.name} has joined the game.`);
    });

    socket.on("playerLeft", (playerName) => {
      showToastMessage(`${playerName.name} has left the game.`);
    });
  }, []);

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
              autoComplete="new-password"
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
      {showToast && (
        <div
          style={{
            position: "fixed",
            bottom: "20px",
            left: "50%",
            transform: "translateX(-50%)",
            background: "rgba(0, 0, 0, 0.8)",
            color: "white",
            padding: "10px 20px",
            borderRadius: "4px",
            zIndex: "9999",
          }}
        >
          {toastMessage}
        </div>
      )}
    </Container>
  );
}

export default App;
