import {useSelector} from "react-redux";
import {useState, useMemo} from "react";
import {Link} from "react-router-dom";

function formatDate(timestamp) {
  if (!timestamp) {
    return ""
  }

  const date = new Date(timestamp);

  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return `${day < 10 ? '0' : ''}${day}/${month < 10 ? '0' : ''}${month}/${year}`;
}

function sortEmployees({ employees, sortColumn, sortOrder }) {
  return employees.sort((a, b) => {
    const aValue = a[sortColumn];
    const bValue = b[sortColumn];
    const sortOrderFactor = sortOrder === "asc" ? 1 : -1;

    if (sortColumn === "startDate" || sortColumn === "birthDay") {
      return sortOrderFactor * (new Date(aValue) - new Date(bValue));
    }

    if (aValue < bValue) {
      return sortOrderFactor * -1;
    } else if (aValue > bValue) {
      return sortOrderFactor * 1;
    } else {
      return 0;
    }
  });
}

function ListEmployee() {
  const employees = useSelector((state) => state.employees.employees);
  const [sortOrder, setSortOrder] = useState("asc");
  const [sortColumn, setSortColumn] = useState("firstName");
  const sortedEmployees = useMemo(() => sortEmployees({ employees: [...employees], sortColumn, sortOrder }), [employees, sortColumn, sortOrder]);

  function handleSort(column) {
    if (column === sortColumn) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortOrder("asc");
    }
  }

  const columns = [
    { label: 'First Name', onClick: () => handleSort('firstName') },
    { label: 'Last Name', onClick: () => handleSort('lastName') },
    { label: 'Start Date', onClick: () => handleSort('startDate') },
    { label: 'Department', onClick: () => handleSort('department') },
    { label: 'Date of birth', onClick: () => handleSort('birthDay') },
    { label: 'Street', onClick: () => handleSort('street') },
    { label: 'City', onClick: () => handleSort('city') },
    { label: 'State', onClick: () => handleSort('state') },
    { label: 'Zip code', onClick: () => handleSort('zipCode') },
  ]

  return (
    <div className="employee-list_container">
      <h1>Current employees</h1>
      <Link to="/">
        Home
      </Link>
      <table className="data-table">
        <thead>
          <tr>
            {columns.map(({ label, onClick }, index) => (
              <th key={index}>
                <div onClick={onClick}>
                  <span>
                    {label}
                  </span>

                  <span className="data-table_sort-icons">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                         stroke="currentColor" style={{height: 12, width: 12}}>
                      <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5"/>
                    </svg>

                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                         stroke="currentColor" style={{height: 12, width: 12}}>
                      <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5"/>
                    </svg>
                  </span>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody id="table-content">
          {sortedEmployees.map((employee, index) => (
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
    </div>
  )
}

export default ListEmployee