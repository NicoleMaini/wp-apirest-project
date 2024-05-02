import { useState } from "react";
import { Spinner } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";

function ModalConfirm({ show, hide, text, func, btn, status, id, url, method }) {
  //   const handleClose = () => setShow(false);
  //   const handleShow = () => setShow(true);
  const [dHidden, setDHidden] = useState(false);
  console.log(!dHidden);

  const navigate = useNavigate();

  const funct = (url, method, red) => {
    setDHidden(!dHidden);
    func(url, method);
    method === "DELETE" && red();
  };

  const redirect = () => {
    setTimeout(() => {
      navigate("/");
    }, 2000);
  };

  return (
    <>
      <Modal show={show}>
        <Modal.Header closeButton>
          <Modal.Title>Attenzione</Modal.Title>
        </Modal.Header>
        <Modal.Body className={dHidden === false ? "d-flex" : "d-none"}>{text}</Modal.Body>
        <Modal.Body className={dHidden ? "d-flex" : "d-none"}>{status ? status : <Spinner />}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={hide}>
            Close
          </Button>
          <Button variant="primary" onClick={() => funct(url, method, redirect)}>
            {btn}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalConfirm;
