import { useParams } from "react-router-dom";
import { apiUrl } from "../constants";
import { useEffect, useState } from "react";
import PostsWp from "./PostsWp";
import { Row } from "react-bootstrap";

function CategoryPageWp() {
  const category = useParams();
  const id = parseInt(category.id);
  console.log(id);
  const categoryName = category.id.replace(/[^a-z\s]?/gi, "");

  const [posts, setPosts] = useState([]);
  console.log("CATEGORY PAGE", posts);

  const getPosts = () => {
    fetch(apiUrl + `/posts?categories=${id}&_embed`)
      .then(res => res.json())
      .then(data => {
        setPosts(data);
      })
      .catch(err => console.log("C'è un errore:", err));
  };

  useEffect(() => {
    getPosts();
  }, [id]);

  return (
    <>
      <h1>Categoria: {categoryName} </h1>
      <Row>
        {posts.map(post => (
          <PostsWp key={post.id} post={post} />
        ))}
      </Row>
    </>
  );
}
export default CategoryPageWp;
