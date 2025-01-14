import { useEffect } from "react";
import "./App.css";
import Peer from "simple-peer";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";

function App() {
  useEffect(() => {
    console.log(new Peer({}));
  }, []);
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
