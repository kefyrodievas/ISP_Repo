import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { formatEuro } from '../../data/mockData'
import { getCart, removeCart } from '../../data/demoCart'
import { createOrder } from '../../data/mockOrder'

function CartPage() {
  const [cart, setCart] = useState(getCart)
  const navigate = useNavigate()

  function remove() {
    removeCart()
    setCart(null)
  }

  function proceedToPayment() {
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

  const { part, quantity, unitPrice, total } = cart

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
                  <Link to={`/catalog/${part.id}`} className="cart-product-link">
                    {part.name}
                  </Link>
                </td>
                <td>{quantity} vnt.</td>
                <td>{formatEuro(unitPrice)}</td>
                <td><strong>{formatEuro(total)}</strong></td>
                <td>
                  <button type="button" className="danger-button" onClick={remove}>
                    Pašalinti
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="cart-total">
          <span>Iš viso</span>
          <strong>{formatEuro(total)}</strong>
        </div>
        <div className="cart-actions">
          <Link to={`/catalog/${part.id}`} className="secondary-button">
            Grįžti į prekę
          </Link>
          <button type="button" className="primary-button" onClick={proceedToPayment}>
            Pereiti prie apmokėjimo
          </button>
        </div>
      </div>
    </section>
  )
}

export default CartPage