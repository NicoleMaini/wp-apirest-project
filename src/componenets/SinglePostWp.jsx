import { Container, Spinner } from "react-bootstrap";
import { apiUrl } from "../constants";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function SinglePostWp() {
  const { id } = useParams();

  const [post, setPost] = useState(null);
  console.log("POST SINGLE PAGE", post);

  const urlPost = `${apiUrl}/posts/${id}?_embed`;

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

  useEffect(() => {
    getDetails(urlPost, setPost);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const formatDates = startDate => {
    const start = new Date(startDate).toLocaleDateString();
    return start;
  };

  return (
    <>
      {post && post._embedded["wp:featuredmedia"] && (
        <img src={post._embedded["wp:featuredmedia"][0].source_url} alt="" />
      )}
      {post ? (
        <Container className="mx-auto my-5">
          <h1 className="text-center" dangerouslySetInnerHTML={{ __html: post.title.rendered }}></h1>
          <p className="my-3 small">
            Plubbicato il <span className="fw-semibold">{formatDates(post.date)}</span> da{" "}
            <span className="fw-semibold">{post._embedded["author"][0].name}</span>
          </p>
          <p dangerouslySetInnerHTML={{ __html: post.content.rendered }}></p>
          <p className="my-3 small">
            Categorie: <span className="fw-semibold">{post._embedded["wp:term"][0][0].name}</span>
          </p>
          <Link to={`/edit/${id}`}>Modifica</Link>
        </Container>
      ) : (
        <Spinner className="d-flex justify-content-center" />
      )}
    </>
  );
}
export default SinglePostWp;
