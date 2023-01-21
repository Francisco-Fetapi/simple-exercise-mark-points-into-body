import { ButtonGroup, Button } from "@mui/material";
import { useState } from "react";
import "./App.css";

function App() {
  return (
    <div className="App">
      <ButtonGroup variant="contained" color="primary">
        <Button>Desfazer</Button>
        <Button>Refazer</Button>
      </ButtonGroup>
      <div className="container"></div>
    </div>
  );
}

export default App;
