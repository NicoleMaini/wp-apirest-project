import { Button, Form } from "react-bootstrap";
import { apiUrl, passwordUser } from "../constants";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function EditForm() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [post, setPost] = useState(null);
  console.log(post);

  //   const [image, setImage] = useState(null);

  //   const [imageId, setImageId] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState(1);

  const [categories, setCategories] = useState("");
  const [selected, setSelected] = useState("");

  const urlPost = `${apiUrl}/posts/${id}`;
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
    if (post) {
      setTitle(post.title.rendered);
      setContent(post.content.rendered);
      setCategory(post.categories[0]);
    }
  }, [post]);

  useEffect(() => {
    if (post) {
      categories && categories.filter(cat => cat.id === category && setSelected(cat.name));
    }
  }, [category]);

  const fetchAdd = (url, method) => {
    // const imageData = new FormData();
    // imageData.append("file", image);
    // fetch(apiUrl + "/media", {
    //   method: "POST",
    //   headers: {
    //     Authorization: `Basic ${passwordUser}`,
    //   },
    //   body: imageData,
    // })
    //   .then(resp => {
    //     return resp.json();
    //   })
    //   .then(data => {
    //     console.log("Immagine caricata del post", data);
    //     setImageId(data.id);
    //   })
    //   .catch(err => console.log("C'è un errore:", err));

    // if (imageId) {
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
        //   featured_media: imageId,
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
    // }
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
          <Form.Control type="file" onChange={e => setImage(e.target.files[0])} />
        </Form.Group> */}
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
