import { Link } from "react-router-dom"
import Input from "../components/Input";
import Select from "../components/Select";
import { useState } from "react";
import { departmentsOptions, statesOptions } from "../constants";
import { useDispatch } from "react-redux";
import { addEmployee } from "../store/reducers/employees";
import { SuccessModal } from "@cynthiaaa_crn/success-modal";

function NewEmployee() {
  const dispatch = useDispatch()
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [birthDay, setBirthDay] = useState('')
  const [startDate, setStartDate] = useState('')
  const [street, setStreet] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [zipCode, setZipCode] = useState('')
  const [department, setDepartment] = useState('')
  const [open, setOpen] = useState(false)

  function handleSubmit(event) {
    event.preventDefault()
    dispatch(addEmployee({
      firstName,
      lastName,
      birthDay,
      startDate,
      street,
      city,
      state,
      zipCode,
      department
    }))
    setOpen(true)
  }

  return (
    <div className="create-employee_container">
      <h1>HRnet</h1>
      <Link to="/employee-list">
        View Current Employees
      </Link>
      <h2>Create Employee</h2>
      <form action="#" id="create-employee" className="form" onSubmit={handleSubmit}>
        <div>
          <h3 className="form_title">Informations</h3>
          <div className="form_informations">
            <div className="form_name">
              <Input label="First Name" type="text" id="first-name" value={firstName} onChange={setFirstName} />
              <Input label="Last Name" type="text" id="last-name" value={lastName} onChange={setLastName} />
            </div>
            <div className="form_dates">
              <Input label="Date Of Birth" type="date" id="date-of-birth" value={birthDay} onChange={setBirthDay} />
            </div>
          </div>
        </div>

        <div>
          <h3 className="form_title">Address</h3>
          <div className="form_address-informations">
            <div className="form_address">
              <Input label="Street" type="text" id="street" value={street} onChange={setStreet} />
              <Input label="City" type="text" id="city" value={city} onChange={setCity} />
            </div>
            <Input label="Zip Code" type="number" id="zip-code" value={zipCode} onChange={setZipCode} />
            <Select label="State" id="state" value={state} options={statesOptions} onChange={setState} />
          </div>
        </div>

        <div>
          <h3 className="form_title">Post informations</h3>
          <div className="form_post-informations">
            <Select label="Department" id="department" value={department} options={departmentsOptions} onChange={setDepartment} />
            <Input label="Start Date" type="date" id="start-date" value={startDate} onChange={setStartDate} />
          </div>

        </div>

        <button type="submit">Save</button>
      </form>

      <SuccessModal open={open} setOpen={setOpen} />
    </div>
  )
}

export default NewEmployee