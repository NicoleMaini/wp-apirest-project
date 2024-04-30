import { useEffect, useState } from "react";
import { Container, Pagination, Row } from "react-bootstrap";
import { apiUrl } from "../constants";
import PostWp from "./PostsWp";
import PaginationWp from "./PaginationWp";

function HomeWp() {
  //settiamo la pagina iniziale
  const [posts, setPosts] = useState([]);
  // const [lastPage, setLastPage] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(6);

  useEffect(() => {
    fetch(apiUrl + `/posts?page=${currentPage}&limit=${postsPerPage}&_embed=1`)
      .then(resp => {
        // setLastPage(parseInt(resp.headers.get("X-WP-TotalPages")));
        return resp.json();
      })
      .then(data => {
        console.log(data);
        setPosts(data);
      })
      .catch(err => console.log("C'è un errore:", err));
  }, [posts, currentPage, postsPerPage]);

  // const totalPages = Math.ceil(posts.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;
  const currentPosts = posts.slice(startIndex, endIndex);

  console.log(currentPosts);

  const handleclickNext = () => {
    return setCurrentPage(currentPage + 1);
  };
  const handleclickBack = () => {
    return setCurrentPage(currentPage - 1);
  };

  return (
    <Container>
      <Row>
        {currentPosts.map(post => (
          <PostWp key={post.id} post={post} />
        ))}
      </Row>

      <Pagination className="my-5 d-flex justify-content-center">
        <Pagination.Prev onClick={handleclickBack} />
        <Pagination.Item>{currentPage - 1}</Pagination.Item>
        <Pagination.Item active>{currentPage}</Pagination.Item>
        <Pagination.Item>{currentPage + 1}</Pagination.Item>
        <Pagination.Next onClick={handleclickNext} />
      </Pagination>
    </Container>
  );
}
export default HomeWp;
