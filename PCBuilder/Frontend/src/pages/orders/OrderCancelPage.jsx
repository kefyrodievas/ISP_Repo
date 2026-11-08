import { useParams } from 'react-router-dom'

const orders = [
  {
    id: '0',
    creationDate: '2026-10-28',
    total: '1 849,00 €',
    status: 'Nesumokėtas',
  },
]

function OrderCancelPage() {
  const { id } = useParams()
  const order = orders.find((order) => order.id === id)

  function handleCancel() {
    alert('Užsakymo atšaukimas bus galimas prijungus duomenų bazę.')
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
            <strong>Suma:</strong> {order.total}
          </p>

          <p>
            Atšaukus užsakymą, jo būsena bus pakeista į „Atšauktas“.
          </p>

          {order.status === 'Nesumokėtas' ? (
            <div className="order-cancel-actions">
              <a href={`/orders/${order.id}`} className="secondary-button">
                Grįžti į užsakymą
              </a>

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

      <div className="order-cancel-actions">
        <a href="/orders" className="secondary-button">
          Mano užsakymai
        </a>

        <a href="/" className="secondary-button">
          Į pagrindinį puslapį
        </a>
      </div>
    </section>
  )
}

export default OrderCancelPage