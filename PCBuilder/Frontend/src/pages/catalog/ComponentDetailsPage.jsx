
import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
  computerParts,
  formatEuro,
  getCurrentPrice,
  getActivePromotion,
  getImages,
  getVisibleReviews,
  getAverageRating,
  getAccountName,
  getPrototypeReviews,
} from '../../data/mockData'
import { saveCart } from '../../data/demoCart'

function ComponentDetailsPage() {
  const { id } = useParams()
  const [addedQuantity, setAddedQuantity] = useState(null)
  const [selectedQuantity, setSelectedQuantity] = useState(1)
  const part = computerParts.find((item) => item.id === Number(id))
  const [activeImage, setActiveImage] = useState(0)

  if (!part) {
    return (
      <section className="component-details-page">
        <div className="page-heading">
          <h1>Kompiuterio dalis</h1>
          <p>Peržiūrėkite išsamią kompiuterio dalies informaciją.</p>
        </div>

        <div className="component-info-card">
          <h2>Dalis nerasta</h2>
          <p>Pasirinkta kompiuterio dalis neegzistuoja arba nebėra pasiekiama.</p>

          <a href="/catalog" className="secondary-button">
            Į katalogą
          </a>
        </div>
      </section>
    )
  }

  const images = getImages(part.id)
  const price = getCurrentPrice(part.id)
  const promotion = price !== null ? getActivePromotion(part.id) : null
  const discountedPrice = promotion
    ? price * (1 - promotion.percentage / 100)
    : null

  const prototypeReviews = getPrototypeReviews()
  const reviews = getVisibleReviews(part.id, prototypeReviews)
    .sort((a, b) => b.publicationDate.localeCompare(a.publicationDate))
    .slice(0, 1)

  const { average, count } = getAverageRating(part.id, prototypeReviews)

  function selectconfiguration() {
    var block = document.getElementById("configuration-select-block");
    block.style.display = "block";
  }

  return (
    <section className="component-details-page">
      <div className="page-heading">
        <h1>{part.name}</h1>
        <p>Peržiūrėkite išsamią kompiuterio dalies informaciją.</p>
      </div>

      <div className="component-gallery">
        <div className="component-gallery-thumbs">
          {images.map((image, index) => (
            <button
              key={image.orderNumber}
              type="button"
              className={`component-gallery-thumb${index === activeImage ? ' is-active' : ''}`}
              onClick={() => setActiveImage(index)}
            >
              <img src={image.url} alt={image.title} />
            </button>
          ))}
        </div>

        <div className="component-gallery-main">
          {images.length > 0 && (
            <img src={images[activeImage].url} alt={part.name} />
          )}
        </div>
      </div>

      <div className="component-info-card">
        <span className="component-info-manufacturer">{part.manufacturer}</span>
        <h2 className="component-title">{part.name}</h2>

        <div className="component-price-block">
          {price === null ? (
            <span className="catalog-price-unavailable">Kaina nenurodyta</span>
          ) : promotion ? (
            <>
              <span className="catalog-price-old">{formatEuro(price)}</span>
              <span className="catalog-price-new">{formatEuro(discountedPrice)}</span>
              <span className="discount-badge">-{promotion.percentage}%</span>
            </>
          ) : (
            <span className="catalog-price">{formatEuro(price)}</span>
          )}
        </div>

        <p className="component-stock">
          Sandėlio kiekis: <strong>{part.stockQuantity} vnt.</strong>
        </p>

        <div className="order-cancel-actions cart-product-actions">
          <div className="cart-quantity-field">
            <label htmlFor="product-quantity">Kiekis</label>
            <div className="cart-quantity-control">
              <button
                type="button"
                aria-label="Sumažinti kiekį"
                disabled={selectedQuantity <= 1 || part.stockQuantity < 1}
                onClick={() => setSelectedQuantity((old) => Math.max(1, old - 1))}
              >
                −
              </button>
              <input
                id="product-quantity"
                type="number"
                min="1"
                max={Math.max(1, part.stockQuantity)}
                step="1"
                value={selectedQuantity}
                disabled={part.stockQuantity < 1}
                onChange={(event) => {
                  const value = Number(event.target.value)
                  if (Number.isFinite(value)) {
                    setSelectedQuantity(
                      Math.min(part.stockQuantity, Math.max(1, Math.floor(value)))
                    )
                  }
                }}
              />
              <button
                type="button"
                aria-label="Padidinti kiekį"
                disabled={selectedQuantity >= part.stockQuantity}
                onClick={() =>
                  setSelectedQuantity((old) => Math.min(part.stockQuantity, old + 1))
                }
              >
                +
              </button>
            </div>
          </div>
          <button
            type="button"
            className="primary-button"
            disabled={part.stockQuantity < 1 || price === null}
            onClick={() => {
              const quantity = Math.min(selectedQuantity, part.stockQuantity)
              saveCart(part.id, quantity)
              setAddedQuantity(quantity)
            }}
          >
            Į krepšelį
          </button>

          <button
            type="button"
            className="primary-button"
            onClick={() => selectconfiguration()}
          >
            Pridėti prie komplektacijos
          </button>

          <a href={`/catalog/${part.id}/price-history`} className="secondary-button">
            Kainų istorija
          </a>
        </div>

        <div id="configuration-select-block" style={{display: "none", marginTop: "15px"}}>
          <table className="orders-table" style={{width: "50%"}}>
            <tbody>
              <tr>
                <td>1</td>
                <td>Žaidimų kompiuteris</td>
              </tr>
            </tbody>
          </table>
          <button
            type="button"
            className="primary-button"
            onClick={() => {
              var block = document.getElementById("configuration-select-block");
              block.style.display = "none";
              alert("Pridėjimas į komplektaciją bus galimas tik prijungus duomenų bazę.")
            }}
          >
            Pridėti
          </button>
        </div>

        {addedQuantity !== null && (
          <p role="status" className="component-stock">Įdėta į krepšelį: {addedQuantity} vnt.</p>
        )}

        <h2 className="component-section-heading">Specifikacijos</h2>

        <table className="specs-table">
          <tbody>
            <tr>
              <td>Gamintojas</td>
              <td>{part.manufacturer}</td>
            </tr>
            <tr>
              <td>Modelis</td>
              <td>{part.model}</td>
            </tr>
            <tr>
              <td>Svoris</td>
              <td>{part.weight}</td>
            </tr>
            <tr>
              <td>Matmenys</td>
              <td>{part.dimensions}</td>
            </tr>
            <tr>
              <td>Jungtys</td>
              <td>{part.connectors.join(', ')}</td>
            </tr>
          </tbody>
        </table>

        <h2 className="component-section-heading">Atsiliepimai</h2>

        <div className="reviews-preview-toolbar">
          <div className="reviews-summary">
            {count > 0 ? (
              <>
                <span className="rating-stars">
                  {'★★★★★'.slice(0, Math.round(average))}
                  {'☆☆☆☆☆'.slice(0, 5 - Math.round(average))}
                </span>
                <span>
                  {average.toFixed(1)} iš 5 ({count} atsiliepim{count === 1 ? 'as' : 'ai'})
                </span>
              </>
            ) : (
              <span>Atsiliepimų kol kas nėra</span>
            )}
          </div>

          <Link to={`/catalog/${part.id}/reviews`} className="review-link-button">
            Visi atsiliepimai
          </Link>
        </div>

        {reviews.length === 0 ? (
          <div className="reviews-empty">Šiai daliai atsiliepimų kol kas nėra.</div>
        ) : (
          <div className="reviews-list">
            {reviews.map((review) => (
              <div key={review.id} className="review-card">
                <div className="review-card-header">
                  <span className="review-card-author">
                    {getAccountName(review.authorId)}
                  </span>
                  <span className="review-card-date">{review.publicationDate}</span>
                </div>

                <span className="rating-stars">
                  {'★★★★★'.slice(0, review.rating)}
                  {'☆☆☆☆☆'.slice(0, 5 - review.rating)}
                </span>

                <p className="review-card-text">{review.text}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      <a href="/catalog" className="secondary-button">
        Į katalogą
      </a>
    </section>
  )
}

export default ComponentDetailsPage
