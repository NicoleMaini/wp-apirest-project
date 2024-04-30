import { Container, Spinner } from "react-bootstrap";
import { apiUrl } from "../constants";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

function SinglePostWp() {
  const { id } = useParams();

  const [post, setPost] = useState(null);
  const [author, setAuthor] = useState(null);
  const [category, setCategory] = useState(null);

  const [add, setAdd] = useState("");
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const urlAuthor = post && post._links.author[0].href;
  const urlCategory = post && post._links["wp:term"][0].href;

  const urlPost = `${apiUrl}/posts/${id}`;

  const getPost = () => {
    fetch(urlPost)
      .then(res => res.json())
      .then(data => {
        setPost(data);
        setTitle(data.title.rendered);
        setContent(data.content.rendered);
      })
      .catch(err => console.log("C'è un errore:", err));
  };

  const getDetails = (url, setState) => {
    fetch(url)
      .then(res => res.json())
      .then(data => {
        setState(data);
      })
      .catch(err => console.log("C'è un errore:", err));
  };

  useEffect(() => {
    getPost();
  }, [id]);

  useEffect(() => {
    getDetails(urlAuthor, setAuthor);
    getDetails(urlCategory, setCategory);
  }, [post]);

  const formatDates = (startDate, endDate) => {
    const start = new Date(startDate).toLocaleDateString();
    return `${start}`;
  };

  const fetchAdd = e => {
    e.prevent.default();
    const nameUser = "Nico_le:GAly 563N CSk2 Lt3R T19W Xd26";
    const passwordUser = btoa(nameUser);
    fetch(apiUrl + `/posts/${id}`, {
      method: "PUT",
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
    getPost();
    handleClose();
  };
  const handleClickDelete = e => {
    fetchAdd(e);
    getPost();
    handleClose();
  };

  return (
    <Container className="mx-auto my-5">
      {post ? (
        <>
          <h1 className="text-center" dangerouslySetInnerHTML={{ __html: post.title.rendered }}></h1>
          {author && (
            <p className="my-3 small">
              Plubbicato il <span className="fw-semibold">{formatDates(post.date)}</span> da{" "}
              <span className="fw-semibold">{author.name}</span>
            </p>
          )}
          <p dangerouslySetInnerHTML={{ __html: post.content.rendered }}></p>
          {category && (
            <p className="my-3 small">
              Categorie: <span className="fw-semibold">{category[0].name}</span>
            </p>
          )}
          <Button variant="outline-warning" onClick={handleShow}>
            Aggiungi articolo
          </Button>
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
              <Button variant="danger" onClick={handleClickDelete}>
                Cancella post
              </Button>
              <Button variant="success" onClick={e => handleClickAdd(e)}>
                Salva
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      ) : (
        <Spinner className="d-flex justify-content-center" />
      )}
    </Container>
  );
}
export default SinglePostWp;
