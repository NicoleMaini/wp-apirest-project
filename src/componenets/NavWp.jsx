import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";

import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { apiUrl } from "../constants";

function NavWp() {
  const [show, setShow] = useState(false);
  const [add, setAdd] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const fetchAdd = e => {
    const nameUser = "Nico_le:GAly 563N CSk2 Lt3R T19W Xd26";
    const passwordUser = btoa(nameUser);
    fetch(apiUrl + `/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${passwordUser}`,
      },
      body: JSON.stringify({
        title: title,
        content: content,
        status: "publish",
      }),
    })
      .then(resp => {
        return resp.json();
      })
      .then(data => {
        console.log(data);
        setAdd(data);
      })
      .catch(err => console.log("C'è un errore:", err));
  };

  const handleClickAdd = e => {
    fetchAdd(e);
    handleClose();
  };

  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container fluid className="d-flex justify-content-center align-items-center">
          <Link className="mx-5 btn btn-outline-success" to="/">
            Home
          </Link>
          <Button variant="outline-info" onClick={handleShow}>
            Aggiungi articolo
          </Button>
        </Container>
      </Navbar>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Scrivi o modifica il tuo articolo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Titolo</Form.Label>
              <Form.Control type="text" autoFocus value={title} onChange={e => setTitle(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="...document.querySelector('.');">
              <Form.Label>Contenuto</Form.Label>
              <Form.Control as="textarea" rows={3} value={content} onChange={e => setContent(e.target.value)} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Chiudi
          </Button>
          <Button variant="danger" onClick={handleClose}>
            Cancella post
          </Button>
          <Button variant="success" onClick={e => handleClickAdd(e)}>
            Salva
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default NavWp;
