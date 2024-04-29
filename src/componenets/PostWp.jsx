import { useEffect, useState } from "react";
import { Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";

function PostWp({ post }) {
  const urlImg = post._links["wp:featuredmedia"][0].href;
  console.log(urlImg);

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
  console.log(description);

  return (
    post && (
      <Col sm={2} md={3} lg={4}>
        <Card>
          <Card.Img variant="top" src={img} className="" />
          <Card.Body>
            <Card.Title>{post.title.rendered}</Card.Title>
            <Card.Text dangerouslySetInnerHTML={{ __html: description }} />
            <Link to="" variant="primary">
              Leggi di più
            </Link>
          </Card.Body>
        </Card>
      </Col>
    )
  );
}
export default PostWp;
