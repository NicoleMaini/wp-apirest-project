import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import cover from "./papcover.png";

function NavWp() {
  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container fluid className="d-flex justify-content-center align-items-center">
          <Link className="mx-5 btn btn-outline-success" to="/">
            Home
          </Link>
          <Link to="/add">Aggiungi</Link>
        </Container>
      </Navbar>
      <div className="position-relative">
        <img src={cover} alt="" className="hvh" />
        <h1 className="position-absolute text-white top-50">benvenuti al PAPPA-BLOG</h1>
      </div>
    </>
  );
}

export default NavWp;
