function Input({ label, type, id, value, onChange }) {
  return (
    <div className="form-input">
      <label htmlFor={id}>
        {label}
      </label>

      <input type={type} id={id} value={value} onChange={(event) => onChange(event.target.value)} />
    </div>
  )
}

export default Input
