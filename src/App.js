import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import {
  Container,
  Header,
  Form,
  Input,
  Button,
  Card,
} from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import "./App.css";
import "setimmediate";

const socket = io("https://trivia-server.azurewebsites.net"); // replace with your websocket server URL

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
    <div className="gradient">
      <Container
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
        }}
      >
        <Card
          style={{
            padding: "15px",
            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)",
            backgroundColor: "rgba(0, 0, 0, 0.3)",
            backdropFilter: "blur(500px)",
          }}
        >
          <Header as="h1" textAlign="center" style={{ color: "white" }}>
            Trivia
          </Header>
          {!nameSubmitted && (
            <Form onSubmit={handleSubmit}>
              <Form.Field>
                <label style={{ color: "white" }}>Enter your name:</label>
                <Input
                  type="text"
                  value={name}
                  autoComplete="new-password"
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Field>
              <div style={{ textAlign: "center" }}>
                <Button type="submit" disabled={!name}>
                  Submit
                </Button>
              </div>
            </Form>
          )}
          {nameSubmitted && (
            <div style={{ textAlign: "center" }}>
              <Button onClick={handleAnswerClick} size="large">
                Answer
              </Button>
            </div>
          )}
        </Card>
      </Container>
      {showToast && (
        <div
          className="toast-container"
          onAnimationEnd={() => setShowToast(false)}
        >
          {toastMessage}
        </div>
      )}
    </div>
  );
}

export default App;
