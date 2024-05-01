import { useEffect, useState } from "react";
import { apiUrl } from "../constants";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

function CategoryWp() {
  const [categories, setCategories] = useState([]);

  const getCategories = () => {
    fetch(apiUrl + "/categories")
      .then(res => res.json())
      .then(data => {
        setCategories(data);
      })
      .catch(err => console.log("C'è un errore:", err));
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <Card className="mt-5">
      <Card.Header>Categorie</Card.Header>
      <Card.Body>
        {categories.map((category, i) => (
          <Link
            key={i}
            to={`/category/${category.id}=${category.name}`}
            className="btn categories-sidebar-style m-1 rounded-2"
          >
            {category.name}
          </Link>
        ))}
      </Card.Body>
    </Card>
  );
}

export default CategoryWp;
