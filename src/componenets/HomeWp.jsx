import { useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import { apiUrl } from "../constants";
import PostWp from "./PostWp";

function HomeWp() {
  //settiamo la pagina iniziale
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch(apiUrl + "/posts")
      .then(resp => {
        return resp.json();
      })
      .then(data => {
        console.log(data);
        setPosts(data);
      })
      .catch(err => console.log("C'è un errore:", err));
  }, []);

  return (
    <Container>
      <Row>
        {posts.map(post => (
          <PostWp key={post.id} post={post} />
        ))}
      </Row>
    </Container>
  );
}
export default HomeWp;
