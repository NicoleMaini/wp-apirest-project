import { useEffect, useState } from "react";
import { Col } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";

function PostsWp({ post }) {
  const urlImg = post._links["wp:featuredmedia"] ? post._links["wp:featuredmedia"][0].href : "";

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const description = post.excerpt.rendered.substring(0, 150) + "...";

  return (
    post && (
      <Col md={6} lg={4} xl={3} className="mt-5">
        <Card className="h-100 rounded-0">
          {img && (
            <Card.Img
              variant="top"
              src={img}
              className="w-100 object-fit-cover rounded-0"
              style={{ height: "15rem" }}
            />
          )}
          <Card.Body className="d-flex flex-column">
            <Card.Title dangerouslySetInnerHTML={{ __html: post.title.rendered }}></Card.Title>
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
export default PostsWp;
