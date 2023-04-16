import {useSelector} from "react-redux";
import {Link} from "react-router-dom";

function ListEmployee() {
  const employees = useSelector((state) => state.employees.employees)
  const rows = employees.map((employee, index) => {
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
            <div id="table-first-name">First Name</div>
          </th>
          <th>
            <div id="table-last-name">Last Name</div>
          </th>
          <th>
            <div id="table-start-date">Start Date</div>
          </th>
          <th>
            <div id="table-department">Department</div>
          </th>
          <th>
            <div id="table-date-of-birth">Date of birth</div>
          </th>
          <th>
            <div id="table-street">Street</div>
          </th>
          <th>
            <div id="table-city">City</div>
          </th>
          <th>
            <div id="table-state">State</div>
          </th>
          <th>
            <div id="table-zip-code">Zip code</div>
          </th>
        </tr>
        </thead>
        <tbody id="table-content">{rows}</tbody>
      </table>
    </div>
  )
}

export default ListEmployee