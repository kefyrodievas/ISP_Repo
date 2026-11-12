
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
  gautiUžsakymą,
  atnaujintiUžsakymoBūseną,
} from '../../data/mockOrder'

function PaymentResultPage() {
  const { id } = useParams()
  const [order, setOrder] = useState(() => gautiUžsakymą(id))

  useEffect(() => {
    if (order && order.status === 'Nesumokėtas') {
      atnaujintiUžsakymoBūseną(id, 'Sumokėtas')
      setOrder(gautiUžsakymą(id))
    }
  }, [id])

  if (!order) {
    return (
      <section className="payment-result-page">
        <div className="page-heading">
          <h1>Apmokėjimo rezultatas</h1>
          <p>Jūsų užsakymo apmokėjimo informacija.</p>
        </div>

        <div className="payment-result">
          <h2>Užsakymas nerastas</h2>
          <p>Pasirinktas užsakymas neegzistuoja.</p>
        </div>
      </section>
    )
  }

  if (order.status === 'Atšauktas') {
    return (
      <section className="payment-result-page">
        <div className="page-heading">
          <h1>Apmokėjimo rezultatas</h1>
          <p>Jūsų užsakymo apmokėjimo informacija.</p>
        </div>

        <div className="payment-result">
          <h2>Užsakymas atšauktas</h2>
          <p>Atšaukto užsakymo apmokėti negalima.</p>

          <Link to={`/orders/${id}`} className="primary-button">
            Grįžti į užsakymą
          </Link>
        </div>
      </section>
    )
  }

  return (
    <section className="payment-result-page">
      <div className="page-heading">
        <h1>Apmokėjimo rezultatas</h1>
        <p>Jūsų užsakymo apmokėjimo informacija.</p>
      </div>

      <div className="payment-result payment-result-success">
        <div className="payment-result-icon">✓</div>

        <h2>Apmokėjimas sėkmingas!</h2>

        <p>
          Užsakymas sėkmingai apmokėtas.
          Dėkojame, kad apsiperkate PCBuilder!
        </p>

        <p>
          <strong>Siuntos kodas:</strong> {order.shipmentCode || 'Nesukurta'}
        </p>

        <Link to={`/orders/${id}`} className="primary-button">
          Grįžti į užsakymą
        </Link>
      </div>
    </section>
  )
}

export default PaymentResultPage
