import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import NavWp from "./componenets/NavWp";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomeWp from "./componenets/HomeWp";
import SinglePostWp from "./componenets/SinglePostWp";
import EditForm from "./componenets/EditForm";
import { Row, Col } from "react-bootstrap";
import CategoryWp from "./componenets/CategoryWp";
import CategoryPageWp from "./componenets/CategoryPageWp";

function App() {
  return (
    <BrowserRouter>
      <div>
        <NavWp />
        <Row className="w-100">
          <Col md={9}>
            <Routes>
              <Route path="/" element={<HomeWp />} />
              <Route path="/post/:id" element={<SinglePostWp />} />
              <Route path="/add" element={<EditForm />} />
              <Route path="/edit/:id" element={<EditForm />} />
              <Route path="/category/:id" element={<CategoryPageWp />} />
            </Routes>
          </Col>
          <Col md={3}>
            <CategoryWp />
          </Col>
        </Row>
      </div>
    </BrowserRouter>
  );
}

export default App;
