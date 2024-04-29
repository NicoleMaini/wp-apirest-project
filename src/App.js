import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import NavWp from "./componenets/NavWp";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomeWp from "./componenets/HomeWp";
import PostWp from "./componenets/PostWp";

// GAly 563N CSk2 Lt3R T19W Xd26 password API

function App() {
  return (
    <BrowserRouter>
      <div>
        <NavWp />
        <Routes>
          <Route path="/" element={<HomeWp />} />
          <Route path="/posts/:id" element={<PostWp />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
