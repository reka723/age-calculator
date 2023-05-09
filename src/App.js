import logo from "./logo.svg";
import "./App.css";
import Form from "./Form";
import Result from "./Result";
import React from "react";

function App() {
  const [age, setAge] = React.useState(null);
  return (
    <div className="App">
      <div className="container">
        <Form setAge={setAge} />
        <Result age={age} />
      </div>
    </div>
  );
}

export default App;
