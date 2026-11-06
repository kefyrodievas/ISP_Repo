
import FormField from '../../components/forms/FormField'

function RegisterPage() {
  function handleSubmit(event) {
    event.preventDefault()
  }

  return (
    <section className="register-page">
      <form className="register-form" onSubmit={handleSubmit}>
        <h1>Registracija</h1>

        <p className="register-description">
          Sukurk paskyrą ir naudokis visomis PCBuilder galimybėmis.
        </p>

        <FormField
          id="firstName"
          label="Vardas"
          placeholder="Įveskite vardą"
        />

        <FormField
          id="lastName"
          label="Pavardė"
          placeholder="Įveskite pavardę"
        />

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

        <FormField
          id="confirmPassword"
          label="Pakartokite slaptažodį"
          type="password"
          placeholder="Pakartokite slaptažodį"
        />

        <button type="submit" className="register-submit">
          Registruotis
        </button>

        <p className="register-login">
          Jau turite paskyrą? <a href="/login">Prisijunkite</a>
        </p>
      </form>
    </section>
  )
}

export default RegisterPage
