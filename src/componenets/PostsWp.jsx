import { useEffect, useState } from "react";
import { Col } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getPost } from "../redux/actions/posts";

function PostsWp({ post }) {
  console.log("questo è un post", post.id);
  const urlImg = post._links["wp:featuredmedia"][0].href;

  const [img, setImg] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    fetch(urlImg)
      .then(resp => {
        return resp.json();
      })
      .then(data => {
        setImg(data.link);
      })
      .catch(err => console.log("C'è un errore:", err));
  }, []);

  useEffect(() => {
    dispatch(getPost(post));
  }, [post]);

  const description = post.excerpt.rendered.substring(0, 150) + "...";

  return (
    post && (
      <Col sm={2} md={3} lg={4} className="mt-5">
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
