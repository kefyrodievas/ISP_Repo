
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
        <a href="/admin/accounts">Administravimas</a>
      </nav>

      <div className="nav-actions">
        <a className="cart-nav-link" href="/cart" aria-label="Atidaryti krepšelį" title="Krepšelis">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="9" cy="21" r="1" />
            <circle cx="20" cy="21" r="1" />
            <path d="M1 2h2l2.4 12.4a2 2 0 0 0 2 1.6h11.5a2 2 0 0 0 2-1.6L23 6H4" />
          </svg>
          <span>Krepšelis</span>
        </a>
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
