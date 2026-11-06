
function Header() {
  return (
    <header className="navbar">
      <a className="logo" href="/">
        PC<span>Builder</span>
      </a>

      <nav className="nav-links">
        <a href="/">Pagrindinis</a>
        <a href="/catalog">Komponentai</a>
        <a href="/configurations">Komplektacijos</a>
        <a href="/orders">Mano užsakymai</a>
      </nav>

      <div className="nav-actions">
        <a className="login-button" href="/login">
          Prisijungti
        </a>
        <a className="register-button" href="/register">
          Registruotis
        </a>
      </div>
    </header>
  )
}

export default Header
