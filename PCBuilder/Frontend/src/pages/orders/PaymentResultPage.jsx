import { Link, useParams } from 'react-router-dom'

function PaymentResultPage() {
  const { id } = useParams()

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

        <Link to="/" className="primary-button">
          Grįžti į pagrindinį puslapį
        </Link>
      </div>
    </section>
  )
}

export default PaymentResultPage