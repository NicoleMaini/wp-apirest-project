import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import NavWp from "./componenets/NavWp";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomeWp from "./componenets/HomeWp";
import SinglePostWp from "./componenets/SinglePostWp";

// GAly 563N CSk2 Lt3R T19W Xd26 password API

function App() {
  return (
    <BrowserRouter>
      <div>
        <NavWp />
        <Routes>
          <Route path="/" element={<HomeWp />} />
          <Route path="/post/:id" element={<SinglePostWp />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
