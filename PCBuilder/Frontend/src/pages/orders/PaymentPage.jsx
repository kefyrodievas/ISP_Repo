
import { Link, useNavigate, useParams } from 'react-router-dom'
import { formatEuro } from '../../data/mockData'
import {
  getOrder,
  updateOrderAddress,
} from '../../data/mockOrder'

function PaymentPage() {
  const navigate = useNavigate()
  const { id } = useParams()

  const order = getOrder(id)

  const canPay = order && order.status === 'Nesumokėtas'

  function handleSubmit(event) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)

    const address = {
      country: formData.get('country'),
      city: formData.get('city'),
      street: formData.get('street'),
      houseNumber: formData.get('houseNumber'),
      apartmentNumber: formData.get('apartmentNumber'),
      postalCode: formData.get('postalCode'),
      bank: formData.get('bank'),
    }

    const updated = updateOrderAddress(id, address)

    if (!updated) return

    navigate(`/orders/${id}/payment/result`)
  }

  if (!order) {
    return (
      <section className="payment-page">
        <div className="page-heading">
          <h1>Užsakymo apmokėjimas</h1>
        </div>
        <div className="payment-order-summary">
          <p>Užsakymas nerastas arba nebėra pasiekiamas.</p>
          <Link to="/orders" className="primary-button">
            Mano užsakymai
          </Link>
        </div>
      </section>
    )
  }

  if (!canPay) {
    return (
      <section className="payment-page">
        <div className="page-heading">
          <h1>Užsakymo apmokėjimas</h1>
        </div>
        <div className="payment-order-summary">
          <p>Šio užsakymo apmokėti nebegalima.</p>
          <p>Užsakymo būsena: {order.status}</p>
          <Link to={`/orders/${order.id}`} className="primary-button">
            Peržiūrėti užsakymą
          </Link>
        </div>
      </section>
    )
  }

  const total = order.productSum
  const discount = order.discount
  const payableAmount = total - discount

  return (
    <section className="payment-page">
      <div className="page-heading">
        <h1>Užsakymo apmokėjimas</h1>
        <p>Įveskite pristatymo adresą ir pasirinkite banką.</p>
      </div>

      <form className="payment-form" onSubmit={handleSubmit}>
        <div className="payment-section">
          <h2>Pristatymo adresas</h2>

          <p className="payment-section-description">
            Nurodykite adresą, kuriuo norite gauti užsakymą.
          </p>

          <div className="payment-fields">
            <div className="payment-field">
              <label htmlFor="country">Šalis</label>
              <input id="country" name="country" type="text" defaultValue="Lietuva" required />
            </div>

            <div className="payment-field">
              <label htmlFor="city">Miestas</label>
              <input id="city" name="city" type="text" placeholder="Pvz., Vilnius" required />
            </div>

            <div className="payment-field payment-field-wide">
              <label htmlFor="street">Gatvė</label>
              <input id="street" name="street" type="text" placeholder="Gatvės pavadinimas" required />
            </div>

            <div className="payment-field">
              <label htmlFor="houseNumber">Namo numeris</label>
              <input id="houseNumber" name="houseNumber" type="text" placeholder="Namo numeris" required />
            </div>

            <div className="payment-field">
              <label htmlFor="apartmentNumber">
                Buto numeris <span>(neprivaloma)</span>
              </label>
              <input id="apartmentNumber" name="apartmentNumber" type="text" placeholder="Buto numeris" />
            </div>

            <div className="payment-field payment-field-wide">
              <label htmlFor="postalCode">Pašto kodas</label>
              <input id="postalCode" name="postalCode" type="text" placeholder="LT-00000" required />
            </div>
          </div>
        </div>

        <div className="payment-section">
          <h2>Mokėjimo bankas</h2>

          <p className="payment-section-description">
            Pasirinkite banką, per kurį atliksite mokėjimą.
          </p>

          <div className="payment-field">
            <label htmlFor="bank">Bankas</label>
            <select id="bank" name="bank" defaultValue="" required>
              <option value="" disabled>Pasirinkite banką</option>
              <option value="SEB">SEB</option>
              <option value="Swedbank">Swedbank</option>
              <option value="Luminor">Luminor</option>
              <option value="Artea">Artea</option>
              <option value="Citadele">Citadele</option>
              <option value="Urbo bankas">Urbo bankas</option>
            </select>
          </div>
        </div>

        <div className="payment-order-summary">
          <h2>Užsakymo suma</h2>

          {[...order.configurations, ...order.parts].map((item) => (
            <div className="payment-summary" key={item.name}>
              <span>{item.name} × {item.quantity}</span>
            </div>
          ))}

          <div className="payment-summary">
            <span>Prekių suma</span>
            <strong>{formatEuro(total)}</strong>
          </div>

          <div className="payment-summary">
            <span>Nuolaida</span>
            <strong>{formatEuro(discount)}</strong>
          </div>

          <div className="payment-summary payment-summary-total">
            <span>Mokėtina suma</span>
            <strong>{formatEuro(payableAmount)}</strong>
          </div>
        </div>

        <div className="payment-actions">
          <Link to={`/orders/${id}`} className="secondary-button">
            Grįžti į užsakymą
          </Link>

          <button type="submit" className="primary-button">
            Apmokėti užsakymą
          </button>
        </div>
      </form>
    </section>
  )
}

export default PaymentPage
