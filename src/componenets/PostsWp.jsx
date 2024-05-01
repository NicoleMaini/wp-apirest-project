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
        setImg(data.link);
      })
      .catch(err => console.log("C'è un errore:", err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const text = post.excerpt.rendered;
  const description = text.length > 153 ? text.substring(0, 150) + "..." : text;

  return (
    post && (
      <Col md={6} lg={4} className="mt-5">
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
            <Card.Title dangerouslySetInnerHTML={{ __html: post.title.rendered }} className="text-short"></Card.Title>
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
