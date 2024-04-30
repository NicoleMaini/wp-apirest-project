import { useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import { apiUrl } from "../constants";
import PostWp from "./PostsWp";

function HomeWp() {
  //settiamo la pagina iniziale
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
        console.log(data);
        setPosts(data);
      })
      .catch(err => console.log("C'è un errore:", err));
  }, [posts]);

  const changePage = page => {
    setCurrentPage(page);
  };

  function generatePaginationArray() {
    let paginationArr = [];
    for (let index = 1; index <= lastPage; index++) {
      paginationArr.push({
        n: index,
        active: currentPage === index,
      });
    }
    return paginationArr;
  }

  return (
    <Container>
      <Row>
        {posts.map(post => (
          <PostWp key={post.id} post={post} />
        ))}
      </Row>

      <ul className="pagination my-5 d-flex justify-content-center">
        <li className={`page-item ${currentPage === 1 && "disabled"}`}>
          <span className="page-link" onClick={() => currentPage !== 1 && changePage(currentPage - 1)}>
            Previous
          </span>
        </li>

        {generatePaginationArray().map(page => (
          <li key={page.n} className={`page-item ${page.active && "active"}`}>
            <span className="page-link" onClick={() => changePage(page.n)}>
              {page.n}
            </span>
          </li>
        ))}

        <li className={`page-item ${currentPage === "lastPage" && "disabled"}`}>
          <span className="page-link" onClick={() => currentPage !== lastPage && changePage(currentPage + 1)}>
            Next
          </span>
        </li>
      </ul>
    </Container>
  );
}
export default HomeWp;
