import { useParams } from 'react-router-dom'

const orders = [
  {
    id: '0',
    creationDate: '2026-10-28',
    paymentDate: null,
    deliveryDate: null,
    configurations: [
      {
        name: 'Žaidimų kompiuteris',
        quantity: 1,
      },
    ],
    parts: [
      {
        name: 'Papildomas SSD 1 TB',
        quantity: 1,
      },
    ],
    productSum: 1849,
    discount: 0,
    status: 'Nesumokėtas',
  },
]

function OrderDetailsPage() {
  const { id } = useParams()
  const order = orders.find((order) => order.id === id)

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

          <div className="order-cancel-actions">
            <a href="/orders" className="secondary-button">
              Mano užsakymai
            </a>
            <a href="/" className="primary-button">
              Į pagrindinį puslapį
            </a>
          </div>
        </div>
      </section>
    )
  }

  const total = order.productSum - order.discount

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
                <td>{order.productSum.toFixed(2)} €</td>
              </tr>
              <tr>
                <td>Nuolaida</td>
                <td>{order.discount.toFixed(2)} €</td>
              </tr>
              <tr>
                <td><strong>Galutinė suma</strong></td>
                <td><strong>{total.toFixed(2)} €</strong></td>
              </tr>
            </tbody>
          </table>

          <div className="order-cancel-actions">
            {order.status === 'Nesumokėtas' && (
              <>
                <a
                  href={`/orders/${order.id}/payment`}
                  className="primary-button"
                >
                  Apmokėti užsakymą
                </a>

                <a
                  href={`/orders/${order.id}/cancel`}
                  className="danger-button"
                >
                  Atšaukti užsakymą
                </a>
              </>
            )}

            <a href="/orders" className="secondary-button">
              Užsakymų sąrašas
            </a>

            <a href="/" className="secondary-button">
              Į pagrindinį puslapį
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default OrderDetailsPage