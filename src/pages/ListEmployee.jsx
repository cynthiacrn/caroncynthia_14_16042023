import {useSelector} from "react-redux";

function ListEmployee() {
  const employees = useSelector((state) => state.employees.employees)

  return (
    <div>
      <h1>Current Employees</h1>
      {employees.map((employee) => (
        <p>{employee.firstName}</p>
      ))}
    </div>
  )
}

export default ListEmployee