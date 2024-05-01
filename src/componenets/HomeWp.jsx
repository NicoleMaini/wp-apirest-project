import { useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import { apiUrl } from "../constants";
import PostWp from "./PostsWp";
import PaginationWp from "./PaginationWp";

function HomeWp() {
  const [posts, setPosts] = useState([]);
  const [lastPage, setLastPage] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetch(apiUrl + `/posts?page=${currentPage}`)
      .then(resp => {
        setLastPage(parseInt(resp.headers.get("X-WP-TotalPages")));
        return resp.json();
      })
      .then(data => {
        setPosts(data);
      })
      .catch(err => console.log("C'è un errore:", err));
  }, [posts]);

  const changePage = page => {
    setCurrentPage(page);
  };

  return (
    <Container>
      <Row>
        {posts.map(post => (
          <PostWp key={post.id} post={post} />
        ))}
      </Row>
      <PaginationWp currentPage={currentPage} lastPage={lastPage} changePage={changePage} />
    </Container>
  );
}
export default HomeWp;
