import {useSelector} from "react-redux";
import {useState} from "react";
import {Link} from "react-router-dom";

function ListEmployee() {
  const employees = useSelector((state) => state.employees.employees)
  const [sortOrder, setSortOrder] = useState("asc");
  const [sortColumn, setSortColumn] = useState("firstName");
  const sortedEmployees = employees.sort((a, b) => {
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

  const rows = sortedEmployees.map((employee, index) => {
    const date = new Date(employee.startDate);

    function formatDate(timestamp) {
      if (!timestamp) {
        return ""
      }

      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();

      return `${day < 10 ? '0' : ''}${day}/${month < 10 ? '0' : ''}${month}/${year}`;
    }

    return (
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
    );
  });

  function handleSort(column) {
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
      <table className="data-table">
        <thead>
        <tr>
          <th>
            <div onClick={() => handleSort("firstName")} id="table-first-name">First Name</div>
          </th>
          <th>
            <div onClick={() => handleSort("lastName")} id="table-last-name">Last Name</div>
          </th>
          <th>
            <div onClick={() => handleSort("startDate")} id="table-start-date">Start Date</div>
          </th>
          <th>
            <div onClick={() => handleSort("department")} id="table-department">Department</div>
          </th>
          <th>
            <div onClick={() => handleSort("birthDay")} id="table-date-of-birth">Date of birth</div>
          </th>
          <th>
            <div onClick={() => handleSort("street")} id="table-street">Street</div>
          </th>
          <th>
            <div onClick={() => handleSort("city")} id="table-city">City</div>
          </th>
          <th>
            <div onClick={() => handleSort("state")} id="table-state">State</div>
          </th>
          <th>
            <div onClick={() => handleSort("zipCode")} id="table-zip-code">Zip code</div>
          </th>
        </tr>
        </thead>
        <tbody id="table-content">{rows}</tbody>
      </table>
    </div>
  )
}

export default ListEmployee