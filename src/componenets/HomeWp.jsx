import { useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import { apiUrl } from "../constants";
import PostWp from "./PostsWp";
import PaginationWp from "./PaginationWp";

function HomeWp() {
  //settiamo la pagina iniziale
  const [posts, setPosts] = useState([]);
  const [lastPage, setLastPage] = useState(null);
  console.log(lastPage);

  useEffect(() => {
    fetch(apiUrl + "/posts")
      .then(resp => {
        setLastPage(parseInt(resp.headers.get("X-WP-TotalPages")));
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
      <PaginationWp />
    </Container>
  );
}
export default HomeWp;
