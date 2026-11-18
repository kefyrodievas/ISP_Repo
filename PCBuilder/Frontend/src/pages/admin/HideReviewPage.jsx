
import { useState } from 'react'
import { reviews, computerParts, getAccountName } from '../../data/mockData'

const HIDDEN_STATUSES = ['Deleted by User', 'Deleted by Admin']

function getPartName(partId) {
  const part = computerParts.find((part) => part.id === partId)
  return part ? part.name : 'Nežinoma dalis'
}

function HideReviewModal({ review, onConfirm, onCancel }) {
  const [reason, setReason] = useState('')

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Ar tikrai slėpti?</h2>
        <p>
          „{review.text}“ – komentaras bus pažymėtas kaip paslėptas ir nebematomas
          kitiems naudotojams.
        </p>

        <div className="modal-field">
          <label htmlFor="hideReason">Priežastis (neprivaloma)</label>
          <textarea
            id="hideReason"
            rows={3}
            value={reason}
            onChange={(event) => setReason(event.target.value)}
          />
        </div>

        <div className="modal-actions">
          <button type="button" className="secondary-button" onClick={onCancel}>
            Atšaukti
          </button>
          <button
            type="button"
            className="danger-button"
            onClick={() => onConfirm(reason)}
          >
            Slėpti
          </button>
        </div>
      </div>
    </div>
  )
}

function HideReviewPage() {
  const [reviewList, setReviewList] = useState(reviews)
  const [selectedReview, setSelectedReview] = useState(null)
  const [message, setMessage] = useState('')

  function hideReview(reviewId, reason) {
    setReviewList((existing) =>
      existing.map((review) =>
        review.id === reviewId
          ? {
              ...review,
              status: 'Deleted by Admin',
              adminReason: reason || null,
            }
          : review
      )
    )

    setSelectedReview(null)
    setMessage('Komentaras paslėptas')
  }

  return (
    <section className="admin-page">
      <div className="page-heading">
        <h1>Atsiliepimai</h1>
        <p>Peržiūrėkite naudotojų atsiliepimus ir slėpkite netinkamą turinį.</p>
      </div>

      {message && <div className="admin-success-banner">{message}</div>}

      <div className="admin-table-container">
        {reviewList.map((review) => {
          const isHidden = HIDDEN_STATUSES.includes(review.status)

          return (
            <div
              key={review.id}
              className={`review-row${isHidden ? ' is-hidden' : ''}`}
            >
              <div className="review-row-header">
                <span className="review-row-part">{getPartName(review.partId)}</span>

                <div className="review-row-meta">
                  <span>{getAccountName(review.authorId)}</span>
                  <span>
                    {'★★★★★'.slice(0, review.rating)}
                    {'☆☆☆☆☆'.slice(0, 5 - review.rating)}
                  </span>
                  <span>{review.publicationDate}</span>
                  {isHidden ? (
                    <span className="status-badge status-badge-hidden">{review.status}</span>
                  ) : (
                    <span className="status-badge status-badge-active">{review.status}</span>
                  )}
                </div>
              </div>

              <p className="review-row-text">{review.text}</p>

              {review.adminReason && (
                <p className="review-row-note">
                  Administratoriaus pastaba: {review.adminReason}
                </p>
              )}

              {!isHidden && (
                <div className="admin-table-actions">
                  <button
                    type="button"
                    className="admin-table-button admin-table-button-danger"
                    onClick={() => setSelectedReview(review)}
                  >
                    Slėpti
                  </button>
                </div>
              )}
            </div>
          )
        })}

        {reviewList.length === 0 && (
          <div className="admin-table-empty">Atsiliepimų kol kas nėra.</div>
        )}
      </div>

      {selectedReview && (
        <HideReviewModal
          review={selectedReview}
          onConfirm={(reason) => hideReview(selectedReview.id, reason)}
          onCancel={() => setSelectedReview(null)}
        />
      )}
    </section>
  )
}

export default HideReviewPage
