import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";

function App() {
  const [activities, setactivities]: any = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/Activities").then((response) => {
      console.log(response.data);
      setactivities(response.data);
    });
  }, []);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <ul>
          {activities.map((item: any) => (
            <li key={item.id}>
              {item.date}:{item.title}
            </li>
          ))}
        </ul>
      </header>
    </div>
  );
}

export default App;
