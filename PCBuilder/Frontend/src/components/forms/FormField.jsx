
function FormField({ id, label, type = 'text', placeholder, required = true }) {
  return (
    <>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        name={id}
        type={type}
        placeholder={placeholder}
        required={required}
      />
    </>
  )
}

export default FormField
