
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { formatEuro } from '../../data/mockData'
import {
  gautiUžsakymus,
  atnaujintiUžsakymusIšServerio,
} from '../../data/mockOrder'

function OrderListPage() {
  const [orders, setOrders] = useState(() =>
    [...gautiUžsakymus()].sort(
      (a, b) => Number(b.id) - Number(a.id)
    )
  )

  useEffect(() => {
    function atnaujintiSąrašą() {
      setOrders(
        [...gautiUžsakymus()].sort(
          (a, b) => Number(b.id) - Number(a.id)
        )
      )
    }

    async function gautiAtnaujintusUžsakymus() {
      await atnaujintiUžsakymusIšServerio()
      atnaujintiSąrašą()
    }

    window.addEventListener('orders-updated', atnaujintiSąrašą)

    gautiAtnaujintusUžsakymus()

    return () => {
      window.removeEventListener('orders-updated', atnaujintiSąrašą)
    }
  }, [])

  return (
    <section className="orders-page">
      <div className="page-heading">
        <h1>Mano užsakymai</h1>
        <p>Peržiūrėkite savo užsakymus ir jų būsenas.</p>
      </div>

      <div className="orders-table-container">
        <div className="orders-table-heading">
          <h2>Užsakymų istorija</h2>
          <span>
            {orders.length} {orders.length === 1 ? 'užsakymas' : 'užsakymai'}
          </span>
        </div>

        <table className="orders-table">
          <thead>
            <tr>
              <th>Sukūrimo data</th>
              <th>Siuntos kodas</th>
              <th>Suma</th>
              <th>Nuolaida</th>
              <th>Būsena</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.creationDate}</td>
                <td>{order.shipmentCode || '-'}</td>
                <td>{formatEuro(order.productSum - order.discount)}</td>
                <td>{formatEuro(order.discount)}</td>

                <td>
                  <span className="order-status">
                    {order.status}
                  </span>
                </td>

                <td>
                  <Link
                    to={`/orders/${order.id}`}
                    className="order-details-link"
                  >
                    Peržiūrėti
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Link to="/" className="secondary-button">
        Į pagrindinį puslapį
      </Link>
    </section>
  )
}

export default OrderListPage
