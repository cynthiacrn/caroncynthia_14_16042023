function Pagination({employees, perPage, setCurrentPage, currentPage}){
  const totalPages = Math.ceil(employees.length / perPage)
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1)

  function nextPage() {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  function previousPage() {
    if (currentPage > 1 ) {
      setCurrentPage(currentPage - 1)
    }
  }

  return (
    <div className="pagination-container">
      <button
        className="pagination-button"
        id="prev-button"
        title="Previous page"
        aria-label="Previous page"
        onClick={previousPage}
      >
        &lt;
      </button>

      <div id="pagination-numbers">
        {pageNumbers.map((pageNumber) =>
          <button
            className="pagination-button"
            onClick={() => setCurrentPage(pageNumber)}
          >
            {pageNumber}
          </button>
        )}
      </div>

      <button
        className="pagination-button"
        id="next-button"
        title="Next page"
        aria-label="Next page"
        onClick={nextPage}
      >
        &gt;
      </button>
    </div>

  )
}

export default Pagination