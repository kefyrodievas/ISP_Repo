
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { formatEuro } from '../../data/mockData'
import { gautiKrepšelį, pašalintiKrepšelį } from '../../data/demoCart'
import { createOrder } from '../../data/mockOrder'

function CartPage() {
  const [cart, setCart] = useState(gautiKrepšelį)
  const navigate = useNavigate()

  function handleRemove() {
    pašalintiKrepšelį()
    setCart(null)
  }

  function handleProceedToPayment() {
    const order = createOrder()

    if (!order) return

    setCart(null)
    navigate(`/orders/${order.id}/payment`)
  }

  if (!cart) {
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

  const { dalis, kiekis, vienetoKaina, suma } = cart

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
                <td>
                  <Link to={`/catalog/${dalis.id}`} className="cart-product-link">
                    {dalis.pavadinimas}
                  </Link>
                </td>
                <td>{kiekis} vnt.</td>
                <td>{formatEuro(vienetoKaina)}</td>
                <td><strong>{formatEuro(suma)}</strong></td>
                <td>
                  <button type="button" className="danger-button" onClick={handleRemove}>
                    Pašalinti
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="cart-total">
          <span>Iš viso</span>
          <strong>{formatEuro(suma)}</strong>
        </div>
        <div className="cart-actions">
          <Link to={`/catalog/${dalis.id}`} className="secondary-button">
            Grįžti į prekę
          </Link>

          <button type="button" className="primary-button" onClick={handleProceedToPayment}>
            Pereiti prie apmokėjimo
          </button>
        </div>
      </div>
    </section>
  )
}

export default CartPage
