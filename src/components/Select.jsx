function Select({ label, id, value, onChange, options }) {
  return (
    <div className="form-select">
      <label htmlFor={id}>
        {label}
      </label>
      <select value={value} onChange={(event) => onChange(event.target.value)} id={id}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}

export default Select