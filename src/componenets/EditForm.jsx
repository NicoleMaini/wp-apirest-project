import { Button, Form } from "react-bootstrap";
import { apiUrl, passwordUser } from "../constants";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ModalConfirm from "./ModalConfirm";

function EditForm() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [post, setPost] = useState(null);

  const [image, setImage] = useState(null);

  const [imageId, setImageId] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState(1);

  const [categories, setCategories] = useState("");
  const [selected, setSelected] = useState("");
  const [status, setStatus] = useState(null);

  const [showDelete, setShowDelete] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  const urlPost = `${apiUrl}/posts/${id}?_embed`;
  const urlCategories = `${apiUrl}/categories`;

  const getDetails = (url, set) => {
    fetch(url)
      .then(res => res.json())
      .then(data => {
        set(data);
      })
      .catch(err => console.log("C'è un errore:", err));
  };

  useEffect(() => {
    id && getDetails(urlPost, setPost);
    getDetails(urlCategories, setCategories);
  }, []);

  useEffect(() => {
    console.log("POST", post);
    if (post) {
      setTitle(post.title.rendered);
      setContent(post.content.rendered);
      setCategory(post.categories[0]);
      setImageId(post.featured_media);
      setSelected(post._embedded["wp:term"][0][0].name);
    }
  }, [post]);

  function addPost(url, method, imageId) {
    fetch(apiUrl + url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${passwordUser}`,
      },
      body: JSON.stringify({
        title: title,
        content: content,
        categories: category,
        featured_media: imageId,
        status: "publish",
      }),
    })
      .then(resp => {
        return resp.json();
      })
      .then(data => {
        console.log("post mod", data);
        setStatus("Operazione completata con successo");
        if (id) {
          setTimeout(() => {
            navigate(`/post/${id}`);
          }, 1500);
        } else {
          setTitle("");
          setContent("");
          setCategory(1);
          setImageId(null);
          setSelected("");
        }
      })
      .catch(err => setStatus("Ops qualcosa è andato storto nel salvatggio del post"));
  }

  const fetchAdd = (url, method) => {
    const imageData = new FormData();
    imageData.append("file", image);

    fetch(apiUrl + "/media", {
      method: "POST",
      headers: {
        Authorization: `Basic ${passwordUser}`,
      },
      body: imageData,
    })
      .then(resp => {
        return resp.json();
      })
      .then(data => {
        if (data.id !== imageId) {
          setImageId(data.id);
          addPost(url, method, data.id);
        } else {
          addPost(url, method, imageId);
        }
      })
      .catch(err => setStatus("Ops qualcosa è andato storto nell'inserimento dell'immagine"));
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
      .then(resp => setStatus("Post eliminato"))
      .catch(err => setStatus("Ops, c'è stato un errore nell'eliminazione del post"));
  };

  return (
    <>
      <Form>
        <Form.Group className="position-relative mb-3">
          <Form.Label>File</Form.Label>
          <Form.Control type="file" onChange={e => setImage(e.target.files[0])} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="text">
          <Form.Label>Titolo</Form.Label>
          <Form.Control type="text" autoFocus value={title} onChange={e => setTitle(e.target.value)} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="textarea">
          <Form.Label>Contenuto</Form.Label>
          <Form.Control as="textarea" rows={6} value={content} onChange={e => setContent(e.target.value)} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="btn">
          <p>Aggiungi categorie: {categories && selected}</p>
          {categories &&
            categories.map((cat, i) => (
              <Button
                key={i}
                variant="light"
                className="btn categories-sidebar-style m-1"
                onClick={() => {
                  setCategory(cat.id);
                  setSelected(cat.name);
                }}
              >
                {cat.name}
              </Button>
            ))}
        </Form.Group>

        {id ? (
          <>
            <Button variant="danger" onClick={() => setShowDelete(true)}>
              Cancella post
            </Button>{" "}
            <Button variant="success" onClick={() => setShowEdit(true)}>
              Modifica
            </Button>
          </>
        ) : (
          <>
            <Link to="/">Torna in home</Link>
            <Button variant="success" onClick={() => setShowAdd(true)}>
              Salva
            </Button>
          </>
        )}
      </Form>
      <ModalConfirm
        show={showDelete}
        hide={() => setShowDelete(false)}
        text="Sei sicuro di voler eliminare questo post?"
        func={deletePost}
        status={status}
        btn="Elimina"
        id={id}
      />
      <ModalConfirm
        show={showAdd}
        hide={() => setShowAdd(false)}
        text="Sei sicuro di voler aggiungere questo post?"
        func={fetchAdd}
        status={status}
        btn="Aggiungi"
        url="/posts"
        method="POST"
      />
      <ModalConfirm
        show={showEdit}
        hide={() => setShowEdit(false)}
        text="Sei sicuro di voler modificare questo post?"
        func={fetchAdd}
        status={status}
        btn="Modifica"
        id={id}
        url={`/posts/${id}`}
        method="PUT"
      />
    </>
  );
}

export default EditForm;
