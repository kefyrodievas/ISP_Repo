
import FormField from '../../components/forms/FormField'

function LoginPage() {
  function handleSubmit(event) {
    event.preventDefault()
  }

  return (
    <section className="register-page">
      <form className="register-form" onSubmit={handleSubmit}>
        <h1>Prisijungimas</h1>

        <p className="register-description">
          Prisijunk prie savo PCBuilder paskyros.
        </p>

        <FormField
          id="email"
          label="El. paštas"
          type="email"
          placeholder="vardas@example.com"
        />

        <FormField
          id="password"
          label="Slaptažodis"
          type="password"
          placeholder="Įveskite slaptažodį"
        />

        <button type="submit" className="register-submit">
          Prisijungti
        </button>

        <p className="register-login">
          Dar neturite paskyros? <a href="/register">Registruokitės</a>
        </p>
      </form>
    </section>
  )
}

export default LoginPage
