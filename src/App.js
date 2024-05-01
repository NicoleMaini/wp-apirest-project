import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import NavWp from "./componenets/NavWp";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomeWp from "./componenets/HomeWp";
import SinglePostWp from "./componenets/SinglePostWp";
import EditForm from "./componenets/EditForm";

function App() {
  return (
    <BrowserRouter>
      <div>
        <NavWp />
        <Routes>
          <Route path="/" element={<HomeWp />} />
          <Route path="/post/:id" element={<SinglePostWp />} />
          <Route path="/add" element={<EditForm />} />
          <Route path="/edit/:id" element={<EditForm />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
