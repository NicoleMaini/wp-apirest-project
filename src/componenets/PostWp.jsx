import { useEffect, useState } from "react";
import { Col } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";

function PostWp({ post }) {
  const urlImg = post._links["wp:featuredmedia"][0].href;

  const [img, setImg] = useState("");

  useEffect(() => {
    fetch(urlImg)
      .then(resp => {
        return resp.json();
      })
      .then(data => {
        console.log(data);
        setImg(data.link);
      })
      .catch(err => console.log("C'è un errore:", err));
  }, []);

  const description = post.excerpt.rendered.substring(0, 150) + "...";

  return (
    post && (
      <Col sm={2} md={3} lg={4} className="mt-5">
        <Card className="h-100 rounded-0">
          <Card.Img
            variant="top"
            src={img ? img : "https://www.comunianvini.it/assets/Uploads/foto-preview/birre-in-bottiglia.jpg"}
            className="w-100 h-50 object-fit-cover rounded-0"
          />
          <Card.Body className="d-flex flex-column">
            <Card.Title>{post.title.rendered}</Card.Title>
            <Card.Text dangerouslySetInnerHTML={{ __html: description }} />
            <Link to={`/post/${post.id}`} className="mt-auto">
              Leggi di più
            </Link>
          </Card.Body>
        </Card>
      </Col>
    )
  );
}
export default PostWp;
