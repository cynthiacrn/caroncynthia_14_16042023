import {useSelector} from "react-redux";
import {useState, useMemo} from "react";
import {Link} from "react-router-dom";
import {employeesTableColumns} from "../constants"
import {sortEmployees, formatDate} from "../utils";
import Pagination from "../components/Pagination";

function ListEmployee() {
  const employees = useSelector((state) => state.employees.employees);
  const [perPage, setPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState("asc");
  const [sortColumn, setSortColumn] = useState("firstName");
  const displayableEmployees = useMemo(() => {
    const sortedEmployees = sortEmployees({ employees: [...employees], sortColumn, sortOrder })

    const lastIndex = currentPage * perPage;
    const firstIndex = lastIndex - perPage;
    return sortedEmployees.slice(firstIndex, lastIndex);
  }, [employees, sortColumn, sortOrder, currentPage, perPage])

  function setSort(column) {
    if (column === sortColumn) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortOrder("asc");
    }
  }

  return (
    <div className="employee-list_container">
      <h1>Current employees</h1>

      <Link to="/">
        Home
      </Link>

      <div>
        <div className="employee-list_select-entries">
          <label htmlFor="entries-select">Show</label>
          <select name="entries" id="entries-select" onChange={(event) => setPerPage(+event.target.value)}>
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
          <div>entries</div>
        </div>
      </div>

      <table className="data-table">
        <thead>
          <tr>
            {employeesTableColumns.map(({ label, value }, index) => (
              <th key={index}>
                <div className="data-table_column-title" onClick={() => setSort(value)}>
                  <span style={{ userSelect: 'none' }}>
                    {label}
                  </span>

                  <span className="data-table_sort-container">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="3"
                      stroke="currentColor"
                      className={`data-table_sort-container_icon ${sortColumn === value && sortOrder === 'asc' ? 'data-table_sort-container_icon--active' : ''}`}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5"/>
                    </svg>

                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="3"
                      stroke="currentColor"
                      className={`data-table_sort-container_icon ${sortColumn === value && sortOrder === 'desc' ? 'data-table_sort-container_icon--active' : ''}`}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5"/>
                    </svg>
                  </span>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody id="table-content">
          {displayableEmployees.map((employee, index) => (
            <tr key={index}>
              <td>{employee.firstName}</td>
              <td>{employee.lastName}</td>
              <td>{formatDate(employee.startDate)}</td>
              <td>{employee.department}</td>
              <td>{formatDate(employee.birthDay)}</td>
              <td>{employee.street}</td>
              <td>{employee.city}</td>
              <td>{employee.state}</td>
              <td>{employee.zipCode}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <Pagination
        employees={employees}
        perPage={perPage}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
      />
    </div>
  )
}

export default ListEmployee