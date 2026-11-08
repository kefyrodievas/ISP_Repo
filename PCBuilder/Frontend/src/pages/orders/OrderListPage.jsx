const orders = [
  {
    id: '0',
    creationDate: '2026-10-28',
    configurations: ['Žaidimų kompiuteris'],
    parts: ['Papildomas SSD 1 TB'],
    total: '1 849,00 €',
    discount: '0,00 €',
    status: 'Nesumokėtas',
  },
]

function OrderListPage() {
  return (
    <section className="orders-page">
      <div className="page-heading">
        <h1>Mano užsakymai</h1>
        <p>Peržiūrėkite savo užsakymus ir jų būsenas.</p>
      </div>

      <div className="orders-table-container">
        <div className="orders-table-heading">
          <h2>Užsakymų istorija</h2>
          <span>{orders.length} užsakymas</span>
        </div>

        <table className="orders-table">
          <thead>
            <tr>
              <th>Sukūrimo data</th>
              <th>Užsakytos prekės</th>
              <th>Prekių suma</th>
              <th>Nuolaida</th>
              <th>Būsena</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.creationDate}</td>
                <td>
                  <strong>{order.configurations.join(', ')}</strong>
                  <span className="order-components">
                    {order.parts.join(', ')}
                  </span>
                </td>
                <td>{order.total}</td>
                <td>{order.discount}</td>
                <td>
                  <span className="order-status">
                    {order.status}
                  </span>
                </td>
                <td>
                  <a
                    href={`/orders/${order.id}`}
                    className="order-details-link"
                  >
                    Peržiūrėti
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <a href="/" className="secondary-button">
        Į pagrindinį puslapį
      </a>
    </section>
  )
}

export default OrderListPage