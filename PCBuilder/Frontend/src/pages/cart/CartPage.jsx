import { useState } from 'react'
import { Link } from 'react-router-dom'
import { formatEuro } from '../../data/mockData'
import { gautiKrepšelį, pašalintiKrepšelį } from '../../data/demoCart'

function CartPage() {
  const [krepšelis, setKrepšelis] = useState(gautiKrepšelį)

  function pašalinti() {
    pašalintiKrepšelį()
    setKrepšelis(null)
  }

  if (!krepšelis) {
    return (
      <section className="cart-page">
        <div className="page-heading">
          <h1>Krepšelis</h1>
          <p>Čia matysite savo pasirinktą prekę.</p>
        </div>
        <div className="cart-panel">
          <p>Krepšelis tuščias. Pasirinkite prekę kataloge.</p>
          <Link to="/catalog" className="primary-button">Į komponentų katalogą</Link>
        </div>
      </section>
    )
  }

  const { dalis, kiekis, vienetoKaina, suma } = krepšelis

  return (
    <section className="cart-page">
      <div className="page-heading">
        <h1>Krepšelis</h1>
        <p>Peržiūrėkite pasirinktą kompiuterio dalį ir kiekį.</p>
      </div>
      <div className="cart-panel">
        <div className="cart-table-wrapper">
          <table className="cart-table">
            <thead>
              <tr>
                <th>Prekė</th>
                <th>Kiekis</th>
                <th>Vieneto kaina</th>
                <th>Suma</th>
                <th>Veiksmai</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><Link to={`/catalog/${dalis.id}`} className="cart-product-link">{dalis.pavadinimas}</Link></td>
                <td>{kiekis} vnt.</td>
                <td>{formatEuro(vienetoKaina)}</td>
                <td><strong>{formatEuro(suma)}</strong></td>
                <td><button type="button" className="danger-button" onClick={pašalinti}>Pašalinti</button></td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="cart-total">
          <span>Iš viso</span>
          <strong>{formatEuro(suma)}</strong>
        </div>
        <div className="cart-actions">
          <Link to={`/catalog/${dalis.id}`} className="secondary-button">Grįžti į prekę</Link>
          <Link to="/orders/cart/payment" className="primary-button">Pereiti prie apmokėjimo</Link>
        </div>
      </div>
    </section>
  )
}

export default CartPage
