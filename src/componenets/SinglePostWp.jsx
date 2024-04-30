import { Alert, Container, Spinner } from "react-bootstrap";
import { apiUrl } from "../constants";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function SinglePostWp() {
  const { id } = useParams();

  const [post, setPost] = useState(null);
  const [author, setAuthor] = useState(null);

  const urlAuthor = post && post._links.author[0].href;

  const urlPost = `${apiUrl}/posts/${id}`;

  const getDetails = (url, setState) => {
    fetch(url)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setState(data);
      })
      .catch(err => console.log("C'è un errore:", err));
  };

  useEffect(() => {
    getDetails(urlPost, setPost);
    post && getDetails(urlAuthor, setAuthor);
  }, [id]);

  const formatDates = (startDate, endDate) => {
    const start = new Date(startDate).toLocaleDateString();
    return `${start}`;
  };

  return (
    <Container className="mx-auto my-5">
      {post ? (
        <>
          <h1 className="text-center" dangerouslySetInnerHTML={{ __html: post.title.rendered }}></h1>
          <p className="my-3 small">
            Plubbicato il <span className="fw-semibold">{formatDates(post.date)}</span> da{" "}
            <span className="fw-semibold">{author.name}</span>
          </p>
          <p dangerouslySetInnerHTML={{ __html: post.content.rendered }}></p>
        </>
      ) : (
        <Spinner className="d-flex justify-content-center" />
      )}
    </Container>
  );
}
export default SinglePostWp;
