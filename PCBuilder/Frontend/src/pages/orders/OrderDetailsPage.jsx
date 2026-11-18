
import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { formatEuro } from '../../data/mockData'
import {
  gautiUžsakymą,
  atnaujintiUžsakymusIšServerio,
} from '../../data/mockOrder'

function OrderDetailsPage() {
  const { id } = useParams()
  const [order, setOrder] = useState(() => gautiUžsakymą(id))

  useEffect(() => {
    function atnaujintiUžsakymą() {
      setOrder(gautiUžsakymą(id))
    }

    async function sinchronizuotiUžsakymą() {
      await atnaujintiUžsakymusIšServerio()
      atnaujintiUžsakymą()
    }

    window.addEventListener('orders-updated', atnaujintiUžsakymą)

    sinchronizuotiUžsakymą()

    const interval = window.setInterval(
      sinchronizuotiUžsakymą,
      3000
    )

    return () => {
      window.removeEventListener('orders-updated', atnaujintiUžsakymą)
      window.clearInterval(interval)
    }
  }, [id])

  if (!order) {
    return (
      <section className="order-details-page">
        <div className="page-heading">
          <h1>Užsakymo peržiūra</h1>
          <p>Peržiūrėkite išsamią užsakymo informaciją.</p>
        </div>

        <div className="order-details-empty">
          <h2>Užsakymas nerastas</h2>
          <p>Pasirinktas užsakymas neegzistuoja arba nebėra pasiekiamas.</p>

          <Link to="/orders" className="secondary-button">
            Grįžti į užsakymus
          </Link>
        </div>
      </section>
    )
  }

  const total = order.productSum - order.discount

  const galimaAtšaukti =
    (order.status === 'Nesumokėtas' || order.status === 'Sumokėtas') &&
    !order.deliveryDate

  return (
    <section className="order-details-page">
      <div className="page-heading">
        <h1>Užsakymo peržiūra</h1>
        <p>Peržiūrėkite išsamią užsakymo informaciją.</p>
      </div>

      <div className="orders-table-container">
        <div className="orders-table-heading">
          <span className="order-status">{order.status}</span>
        </div>

        <div className="order-details-empty">
          <h3>Užsakymo informacija</h3>

          <table className="orders-table">
            <tbody>
              <tr>
                <td>Sukūrimo data</td>
                <td>{order.creationDate}</td>
              </tr>
              <tr>
                <td>Apmokėjimo data</td>
                <td>{order.paymentDate || 'Neapmokėtas'}</td>
              </tr>
              <tr>
                <td>Pristatymo data</td>
                <td>{order.deliveryDate || 'Nepristatytas'}</td>
              </tr>
              <tr>
                <td>Siuntos kodas</td>
                <td>{order.shipmentCode || 'Nesukurta'}</td>
              </tr>
              {order.address && (
                <tr>
                  <td>Pristatymo adresas</td>
                  <td>
                    {Object.values(order.address).filter(Boolean).join(', ')}
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          <h3>Užsakytos komplektacijos</h3>

          <table className="orders-table">
            <thead>
              <tr>
                <th>Komplektacija</th>
                <th>Kiekis</th>
              </tr>
            </thead>
            <tbody>
              {order.configurations.map((configuration) => (
                <tr key={configuration.name}>
                  <td>{configuration.name}</td>
                  <td>{configuration.quantity} vnt.</td>
                </tr>
              ))}
            </tbody>
          </table>

          <h3>Užsakytos dalys</h3>

          <table className="orders-table">
            <thead>
              <tr>
                <th>Kompiuterio dalis</th>
                <th>Kiekis</th>
              </tr>
            </thead>
            <tbody>
              {order.parts.map((part) => (
                <tr key={part.name}>
                  <td>{part.name}</td>
                  <td>{part.quantity} vnt.</td>
                </tr>
              ))}
            </tbody>
          </table>

          <h3>Užsakymo suma</h3>

          <table className="orders-table">
            <tbody>
              <tr>
                <td>Prekių suma</td>
                <td>{formatEuro(order.productSum)}</td>
              </tr>
              <tr>
                <td>Nuolaida</td>
                <td>{formatEuro(order.discount)}</td>
              </tr>
              <tr>
                <td><strong>Galutinė suma</strong></td>
                <td><strong>{formatEuro(total)}</strong></td>
              </tr>
            </tbody>
          </table>

          <div className="order-cancel-actions">
            {order.status === 'Nesumokėtas' && (
              <Link
                to={`/orders/${order.id}/payment`}
                className="primary-button"
              >
                Apmokėti užsakymą
              </Link>
            )}

            {galimaAtšaukti && (
              <Link
                to={`/orders/${order.id}/cancel`}
                className="danger-button"
              >
                Atšaukti užsakymą
              </Link>
            )}

            <Link to="/orders" className="secondary-button">
              Grįžti į užsakymus
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default OrderDetailsPage
