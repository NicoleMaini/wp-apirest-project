import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";

function ModalConfirm({ show, hide, text, func, btn, status, id, url, method }) {
  //   const handleClose = () => setShow(false);
  //   const handleShow = () => setShow(true);
  //   const [stat, setStat] = useState(status);

  const navigate = useNavigate();

  const funct = red => {
    func();
    red();
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
        <Modal.Body>{status ? status : text}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={hide}>
            Close
          </Button>
          <Button variant="primary" onClick={() => funct(redirect)}>
            {btn}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalConfirm;
