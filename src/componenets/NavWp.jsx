import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";

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
    </>
  );
}

export default NavWp;
