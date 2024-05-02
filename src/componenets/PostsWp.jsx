import { useEffect, useState } from "react";
import { Col, Row, Stack } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";

function PostsWp({ post }) {
  const img = post._embedded["wp:featuredmedia"] && post._embedded["wp:featuredmedia"][0].source_url;

  const text = post.excerpt.rendered;
  const description = text.length > 153 ? text.substring(0, 90) + "..." : text;

  return (
    post && (
      <>
        <Col md={6} lg={4} className="p-3 text-center h-100">
          <div className="bg-acquamarine h-100">
            <Link to={`/post/${post.id}`}>
              <h5
                dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                className="text-short read-more-card p-2"
              ></h5>
            </Link>
            <div className="img-card-container p-4">
              <Link to={`/post/${post.id}`}>
                {" "}
                <img src={img} alt="" className="img-card rounded-2" />
              </Link>
            </div>
            <div className="d-flex flex-column h-100 text-card-border ">
              <Link to={`/post/${post.id}`} className="text-card pb-3">
                <p
                  dangerouslySetInnerHTML={{ __html: description }}
                  className="mx-4 bg-white mb-2 p-0 p-1 rounded-2 h-100"
                ></p>
              </Link>
              <Link to={`/post/${post.id}`} className="mx-auto w-100 read-more-card py-2">
                Leggi di più &raquo;
              </Link>
            </div>
          </div>
        </Col>
      </>
    )
  );
}
export default PostsWp;
