import { Button, Form } from "react-bootstrap";
import { apiUrl, passwordUser } from "../constants";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function EditForm() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  //   const [imagUrl, setImgUrl] = useState([]);

  const urlPost = `${apiUrl}/posts/${id}`;

  const getPost = () => {
    fetch(urlPost)
      .then(res => res.json())
      .then(data => {
        setTitle(data.title.rendered);
        setContent(data.content.rendered);
      })
      .catch(err => console.log("C'è un errore:", err));
  };

  useEffect(() => {
    id && getPost();
  }, []);

  const fetchAdd = (url, method) => {
    fetch(apiUrl + url, {
      method: method,
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
        console.log("ok");
      })
      .catch(err => console.log("C'è un errore:", err));
  };

  const handleClickEdit = () => {
    fetchAdd(`/posts/${id}`, "PUT");
    navigate(`/post/${id}`);
  };

  const deletePost = () => {
    fetch(apiUrl + `/posts/${id}`, {
      headers: {
        Authorization: `Basic ${passwordUser}`,
      },
      method: "DELETE",
    })
      .then(resp => {
        return resp.json();
      })
      .catch(err => console.log("C'è un errore:", err));
  };

  const handleClickDelete = e => {
    deletePost();
    navigate("/");
  };

  const handleClickAdd = e => {
    fetchAdd(`/posts`, "POST");
    setTitle("");
    setContent("");
  };

  return (
    <>
      <Form>
        {/* <Form.Group className="position-relative mb-3">
              <Form.Label>File</Form.Label>
              <Form.Control type="file" name="file" onChange={e => setImgUrl(e.target.files[0])} />
            </Form.Group> */}
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Titolo</Form.Label>
          <Form.Control type="text" autoFocus value={title} onChange={e => setTitle(e.target.value)} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="...document.querySelector('.');">
          <Form.Label>Contenuto</Form.Label>
          <Form.Control as="textarea" rows={3} value={content} onChange={e => setContent(e.target.value)} />
        </Form.Group>
        {id ? (
          <>
            <Button variant="danger" onClick={handleClickDelete}>
              Cancella post
            </Button>{" "}
            <Button variant="success" onClick={handleClickEdit}>
              Modifica
            </Button>
          </>
        ) : (
          <>
            <Link to="/">Torna in home</Link>
            <Button variant="success" onClick={handleClickAdd}>
              Salva
            </Button>
          </>
        )}
      </Form>
    </>
  );
}

export default EditForm;
