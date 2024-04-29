import { Pagination } from "react-bootstrap";

function PaginationWp() {
  return (
    <Pagination className="my-5 d-flex justify-content-center">
      <Pagination.Prev />
      <Pagination.Item active>{12}</Pagination.Item>
      <Pagination.Item>{13}</Pagination.Item>
      <Pagination.Next />
    </Pagination>
  );
}

export default PaginationWp;
