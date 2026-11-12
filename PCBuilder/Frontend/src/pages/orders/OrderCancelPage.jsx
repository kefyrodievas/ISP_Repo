
import { useParams, Link, useNavigate } from 'react-router-dom'
import { formatEuro } from '../../data/mockData'
import { gautiUžsakymą, atšauktiUžsakymą } from '../../data/mockOrder'

function OrderCancelPage() {
  const { id } = useParams()
  const order = gautiUžsakymą(id)
  const navigate = useNavigate()

  const galimaAtšaukti =
    (order?.status === 'Nesumokėtas' || order?.status === 'Sumokėtas') &&
    !order?.deliveryDate

  function handleCancel() {
    const atšaukta = atšauktiUžsakymą(id)

    if (atšaukta) {
      navigate(`/orders/${id}`)
    }
  }

  return (
    <section className="order-cancel-page">
      <div className="page-heading">
        <h1>Užsakymo atšaukimas</h1>
        <p>Patvirtinkite, ar tikrai norite atšaukti užsakymą.</p>
      </div>

      {order ? (
        <div className="order-cancel-confirmation">
          <h2>Ar tikrai norite atšaukti užsakymą?</h2>

          <p>
            <strong>Sukūrimo data:</strong> {order.creationDate}
          </p>

          <p>
            <strong>Suma:</strong> {formatEuro(order.productSum - order.discount)}
          </p>

          <p>
            <strong>Siuntos kodas:</strong> {order.shipmentCode || 'Nesukurta'}
          </p>

          <p>
            Atšaukus užsakymą, jo būsena bus pakeista į „Atšauktas“.
          </p>

          {galimaAtšaukti ? (
            <div className="order-cancel-actions">
              <Link to={`/orders/${order.id}`} className="secondary-button">
                Grįžti į užsakymą
              </Link>

              <button
                type="button"
                className="danger-button"
                onClick={handleCancel}
              >
                Atšaukti užsakymą
              </button>
            </div>
          ) : (
            <p>Šio užsakymo atšaukti nebegalima.</p>
          )}
        </div>
      ) : (
        <div className="order-cancel-confirmation">
          <h2>Užsakymas nerastas</h2>
          <p>Pasirinktas užsakymas neegzistuoja.</p>
        </div>
      )}
    </section>
  )
}

export default OrderCancelPage
