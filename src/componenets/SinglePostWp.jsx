import { Container, Spinner } from "react-bootstrap";
import { apiUrl } from "../constants";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function SinglePostWp() {
  const { id } = useParams();

  const [post, setPost] = useState(null);
  const [author, setAuthor] = useState(null);
  const [category, setCategory] = useState(null);

  const urlPost = `${apiUrl}/posts/${id}`;
  const urlAuthor = post && post._links.author[0].href;
  const urlCategory = post && post._links["wp:term"][0].href;

  const getDetails = (url, set) => {
    fetch(url)
      .then(resp => {
        return resp.json();
      })
      .then(data => {
        set(data);
      })
      .catch(err => console.log("C'è un errore:", err));
  };

  const restart = post && post.modified;

  useEffect(() => {
    getDetails(urlPost, setPost);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, restart]);

  useEffect(() => {
    getDetails(urlAuthor, setAuthor);
    getDetails(urlCategory, setCategory);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [restart]);

  const formatDates = startDate => {
    const start = new Date(startDate).toLocaleDateString();
    return start;
  };

  return (
    <Container className="mx-auto my-5">
      {post ? (
        <>
          <h1 className="text-center" dangerouslySetInnerHTML={{ __html: post.title.rendered }}></h1>
          {author && (
            <p className="my-3 small">
              Plubbicato il <span className="fw-semibold">{formatDates(post.date)}</span> da{" "}
              <span className="fw-semibold">{author.name}</span>
            </p>
          )}
          <p dangerouslySetInnerHTML={{ __html: post.content.rendered }}></p>
          {category && (
            <p className="my-3 small">
              Categorie: <span className="fw-semibold">{category[0].name}</span>
            </p>
          )}
          <Link to={`/edit/${id}`}>Modifica</Link>
        </>
      ) : (
        <Spinner className="d-flex justify-content-center" />
      )}
    </Container>
  );
}
export default SinglePostWp;
