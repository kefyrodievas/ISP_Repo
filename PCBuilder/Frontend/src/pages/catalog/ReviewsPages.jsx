
import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import {
  computerParts,
  getAccountName,
  getVisibleReviews,
  getAverageRating,
  getPrototypeReviews,
  savePrototypeReviews,
} from '../../data/mockData'

const DEMO_AUTHOR_ID = 1

function getPart(id) {
  return computerParts.find((part) => part.id === Number(id))
}

function RatingStars({ rating }) {
  return (
    <span className="rating-stars" aria-label={`${rating} iš 5 žvaigždučių`}>
      {'★★★★★'.slice(0, rating)}{'☆☆☆☆☆'.slice(0, 5 - rating)}
    </span>
  )
}

function NotFoundPage({ message }) {
  return (
    <section className="component-details-page">
      <div className="component-info-card">
        <h1>Langas nepasiekiamas</h1>
        <p>{message}</p>
        <Link to="/catalog" className="secondary-button">Į katalogą</Link>
      </div>
    </section>
  )
}

function PageHeading({ part, title, description }) {
  return (
    <div className="page-heading">
      <h1>{title}</h1>
      <p>{part.name} · {description}</p>
    </div>
  )
}

export function ReviewsPage() {
  const { id } = useParams()
  const part = getPart(id)
  if (!part) return <NotFoundPage message="Prekė nerasta." />

  const visibleReviews = getVisibleReviews(part.id, getPrototypeReviews())
    .sort((a, b) => b.publicationDate.localeCompare(a.publicationDate))
  const { average, count } = getAverageRating(part.id, getPrototypeReviews())

  return (
    <section className="component-details-page">
      <PageHeading part={part} title="Atsiliepimai" description="Visi pirkėjų atsiliepimai" />
      <div className="component-info-card">
        <div className="reviews-summary">
          {count > 0 ? (
            <>
              <RatingStars rating={Math.round(average)} /> {average.toFixed(1)} iš 5 ({count})
            </>
          ) : 'Atsiliepimų dar nėra'}
        </div>

        <div className="reviews-cta-panel">
          <div className="reviews-cta-text">
            <h2>Norite palikti atsiliepimą?</h2>
            <p>
              Čia galite peržiūrėti visus atsiliepimus, sukurti naują,
              redaguoti arba pašalinti esamą.
            </p>
          </div>

          <div className="reviews-top-actions">
            <Link to={`/catalog/${part.id}`} className="secondary-button">
              Grįžti į prekę
            </Link>
            <Link to={`/catalog/${part.id}/reviews/new`} className="primary-button">
              Rašyti atsiliepimą
            </Link>
          </div>
        </div>

        {visibleReviews.length === 0 ? (
          <div className="reviews-empty">Šiai prekei atsiliepimų kol kas nėra.</div>
        ) : (
          <div className="reviews-list">
            {visibleReviews.map((review) => (
              <article className="review-card" key={review.id}>
                <div className="review-card-header">
                  <span className="review-card-author">{getAccountName(review.authorId)}</span>
                  <span className="review-card-date">{review.publicationDate}</span>
                </div>
                <RatingStars rating={review.rating} />
                <p className="review-card-text">{review.text}</p>
                <div className="review-proto-actions review-proto-card-actions">
                  <Link to={`/catalog/${part.id}/reviews/${review.id}/edit`} className="secondary-button">
                    Redaguoti
                  </Link>
                  <Link to={`/catalog/${part.id}/reviews/${review.id}/delete`} className="secondary-button">
                    Šalinti
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

function ReviewForm({ isEditing }) {
  const { id, reviewId } = useParams()
  const navigate = useNavigate()
  const part = getPart(id)
  const existingReview = isEditing
    ? getPrototypeReviews().find(
        (review) => review.id === Number(reviewId) && review.partId === Number(id)
      )
    : null

  const [rating, setRating] = useState(existingReview?.rating ?? 5)
  const [text, setText] = useState(existingReview?.text ?? '')
  const [error, setError] = useState('')

  if (!part) return <NotFoundPage message="Prekė nerasta." />
  if (isEditing && (!existingReview || !['Aktyvus', 'Redaguotas'].includes(existingReview.status))) {
    return <NotFoundPage message="Atsiliepimas nerastas arba neberodomas." />
  }

  function handleSubmit(event) {
    event.preventDefault()
    if (!text.trim()) {
      setError('Įrašykite atsiliepimo tekstą.')
      return
    }

    const reviewList = getPrototypeReviews()

    if (isEditing) {
      savePrototypeReviews(reviewList.map((review) => review.id === existingReview.id ? {
        ...review,
        text: text.trim(),
        rating: Number(rating),
        status: 'Redaguotas',
        modificationDate: new Date().toISOString().slice(0, 10),
      } : review))
    } else {
      const newId = Math.max(0, ...reviewList.map((review) => review.id)) + 1
      savePrototypeReviews([...reviewList, {
        id: newId,
        partId: part.id,
        authorId: DEMO_AUTHOR_ID,
        text: text.trim(),
        rating: Number(rating),
        publicationDate: new Date().toISOString().slice(0, 10),
        status: 'Aktyvus',
      }])
    }

    navigate(`/catalog/${part.id}/reviews`)
  }

  return (
    <section className="component-details-page">
      <PageHeading
        part={part}
        title={isEditing ? 'Atsiliepimo redagavimas' : 'Naujo atsiliepimo kūrimas'}
        description={isEditing ? 'Pakeiskite savo atsiliepimą' : 'Pasidalykite savo nuomone'}
      />
      <div className="component-info-card">
        <form className="review-proto-form" onSubmit={handleSubmit}>
          <label htmlFor="review-rating">Įvertinimas</label>
          <select id="review-rating" value={rating} onChange={(event) => setRating(Number(event.target.value))}>
            {[5, 4, 3, 2, 1].map((value) => (
              <option value={value} key={value}>{value} iš 5</option>
            ))}
          </select>
          <label htmlFor="review-text">Atsiliepimas</label>
          <textarea
            id="review-text"
            rows={6}
            maxLength={1000}
            value={text}
            onChange={(event) => {
              setText(event.target.value)
              setError('')
            }}
            placeholder="Parašykite savo nuomonę apie prekę..."
          />
          {error && <p role="alert" className="review-proto-error">{error}</p>}
          <div className="review-proto-actions">
            <Link to={`/catalog/${part.id}/reviews`} className="secondary-button">Atšaukti</Link>
            <button type="submit" className="primary-button">Išsaugoti</button>
          </div>
        </form>
      </div>
    </section>
  )
}

export function ReviewCreatePage() {
  return <ReviewForm isEditing={false} />
}

export function ReviewEditPage() {
  return <ReviewForm isEditing />
}

export function ReviewDeletePage() {
  const { id, reviewId } = useParams()
  const navigate = useNavigate()
  const part = getPart(id)
  const review = getPrototypeReviews().find(
    (item) => item.id === Number(reviewId) && item.partId === Number(id)
  )

  if (!part) return <NotFoundPage message="Prekė nerasta." />
  if (!review || !['Aktyvus', 'Redaguotas'].includes(review.status)) {
    return <NotFoundPage message="Atsiliepimas nerastas arba neberodomas." />
  }

  function deleteReview() {
    savePrototypeReviews(getPrototypeReviews().map((item) =>
      item.id === review.id
        ? { ...item, status: 'Trintas vartotojo' }
        : item
    ))

    navigate(`/catalog/${part.id}/reviews`)
  }

  return (
    <section className="component-details-page">
      <PageHeading part={part} title="Atsiliepimo šalinimas" description="Patvirtinkite pasirinkimą" />
      <div className="component-info-card">
        <h2>Ar tikrai norite pašalinti atsiliepimą?</h2>
        <div className="review-card">
          <RatingStars rating={review.rating} />
          <p className="review-card-text">{review.text}</p>
        </div>
        <p className="review-proto-note">Patvirtinus atsiliepimas nebebus matomas sąraše.</p>
        <div className="review-proto-actions">
          <Link to={`/catalog/${part.id}/reviews`} className="secondary-button">Atšaukti</Link>
          <button type="button" className="danger-button" onClick={deleteReview}>
            Taip, šalinti
          </button>
        </div>
      </div>
    </section>
  )
}
