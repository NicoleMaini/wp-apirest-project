import { Pagination } from "react-bootstrap";

function PaginationWp({ currentPage, lastPage, changePage }) {
  function pages() {
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
    <Pagination className="my-5 d-flex justify-content-center" style={{ cursor: "pointer" }}>
      <Pagination.Prev
        className={`page-item ${currentPage === 1 && "disabled"}`}
        onClick={() => currentPage !== 1 && changePage(currentPage - 1)}
      />
      {pages().map(page => (
        <Pagination.Item
          key={page.n}
          className={`page-item ${page.active && "active"}`}
          onClick={() => changePage(page.n)}
        >
          {page.n}
        </Pagination.Item>
      ))}
      <Pagination.Next
        className={`page-item ${currentPage === "lastPage" && "disabled"}`}
        onClick={() => currentPage !== lastPage && changePage(currentPage + 1)}
      />
    </Pagination>
  );
}

export default PaginationWp;
