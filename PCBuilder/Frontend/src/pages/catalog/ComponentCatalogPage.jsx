import { useMemo, useState } from 'react'
import {
  computerParts,
  formatEuro,
  getCurrentPrice,
  getActivePromotion,
  getImages,
  getAverageRating,
} from '../../data/mockData'

const categories = [
  'CPU',
  'GPU',
  'RAM',
  'Motininė plokštė',
  'Maitinimo blokas',
  'Korpusas',
  'Aušintuvas',
  'Kaupiklis',
]

const manufacturers = Array.from(
  new Set(computerParts.map((part) => part.manufacturer))
).sort((a, b) => a.localeCompare(b, 'lt'))

const emptyFilters = {
  category: '',
  manufacturer: '',
  priceFrom: '',
  priceTo: '',
}

function RatingStars({ average }) {
  const fullStars = Math.round(average)

  return (
    <>
      {'★★★★★'.slice(0, fullStars)}
      {'☆☆☆☆☆'.slice(0, 5 - fullStars)}
    </>
  )
}

function PartCard({ part }) {
  const image = getImages(part.id)[0]
  const price = getCurrentPrice(part.id)
  const promotion = price !== null ? getActivePromotion(part.id) : null
  const { average, count } = getAverageRating(part.id)
  const discountedPrice = promotion
    ? price * (1 - promotion.percentage / 100)
    : null

  return (
    <a href={`/catalog/${part.id}`} className="catalog-card">
      <div className="catalog-card-image">
        {image && <img src={image.url} alt={part.name} />}
        <span className="category-badge">{part.category}</span>
        {promotion && <span className="discount-badge">-{promotion.percentage}%</span>}
      </div>

      <div className="catalog-card-body">
        <span className="catalog-card-manufacturer">{part.manufacturer}</span>
        <h3 className="catalog-card-title">{part.name}</h3>

        <span className="rating-stars">
          <RatingStars average={average} />
          <span>{count > 0 ? `(${count})` : '(nėra atsiliepimų)'}</span>
        </span>

        <div className="catalog-card-price">
          {price === null ? (
            <span className="catalog-price-unavailable">Kaina nenurodyta</span>
          ) : promotion ? (
            <>
              <span className="catalog-price-old">{formatEuro(price)}</span>
              <span className="catalog-price-new">{formatEuro(discountedPrice)}</span>
            </>
          ) : (
            <span className="catalog-price">{formatEuro(price)}</span>
          )}
        </div>
      </div>
    </a>
  )
}

function ComponentCatalogPage() {
  const [filters, setFilters] = useState(emptyFilters)
  const [appliedFilters, setAppliedFilters] = useState(emptyFilters)
  const [sorting, setSorting] = useState('newest')
  const [error, setError] = useState('')

  function applyFilters(event) {
    event.preventDefault()

    const from = filters.priceFrom === '' ? null : Number(filters.priceFrom)
    const to = filters.priceTo === '' ? null : Number(filters.priceTo)

    if (from !== null && to !== null && from > to) {
      setError('Neteisingas kainų intervalas')
      return
    }

    setError('')
    setAppliedFilters(filters)
  }

  function clearFilters() {
    setFilters(emptyFilters)
    setAppliedFilters(emptyFilters)
    setError('')
  }

  const filteredParts = useMemo(() => {
    const from = appliedFilters.priceFrom === '' ? null : Number(appliedFilters.priceFrom)
    const to = appliedFilters.priceTo === '' ? null : Number(appliedFilters.priceTo)

    const filtered = computerParts.filter((part) => {
      if (appliedFilters.category && part.category !== appliedFilters.category) {
        return false
      }

      if (appliedFilters.manufacturer && part.manufacturer !== appliedFilters.manufacturer) {
        return false
      }

      const price = getCurrentPrice(part.id)

      if (from !== null && (price === null || price < from)) {
        return false
      }

      if (to !== null && (price === null || price > to)) {
        return false
      }

      return true
    })

    const sorted = [...filtered]

    sorted.sort((a, b) => {
      if (sorting === 'price-asc') {
        const priceA = getCurrentPrice(a.id) ?? Number.POSITIVE_INFINITY
        const priceB = getCurrentPrice(b.id) ?? Number.POSITIVE_INFINITY
        return priceA - priceB
      }

      if (sorting === 'price-desc') {
        const priceA = getCurrentPrice(a.id) ?? -1
        const priceB = getCurrentPrice(b.id) ?? -1
        return priceB - priceA
      }

      if (sorting === 'rating') {
        return getAverageRating(b.id).average - getAverageRating(a.id).average
      }

      return b.publicationDate.localeCompare(a.publicationDate)
    })

    return sorted
  }, [appliedFilters, sorting])

  return (
    <section className="catalog-page">
      <div className="page-heading">
        <h1>Kompiuterio dalys</h1>
        <p>Rask ir palygink kompiuterio komponentus pagal kategoriją, gamintoją ir kainą.</p>
      </div>

      <div className="catalog-layout">
        <form className="catalog-filters" onSubmit={applyFilters}>
          <h2>Filtrai</h2>

          <div className="catalog-filter-group">
            <label htmlFor="category">Kategorija</label>
            <select
              id="category"
              value={filters.category}
              onChange={(event) => setFilters({ ...filters, category: event.target.value })}
            >
              <option value="">Visos kategorijos</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div className="catalog-filter-group">
            <label htmlFor="manufacturer">Gamintojas</label>
            <select
              id="manufacturer"
              value={filters.manufacturer}
              onChange={(event) => setFilters({ ...filters, manufacturer: event.target.value })}
            >
              <option value="">Visi gamintojai</option>
              {manufacturers.map((manufacturer) => (
                <option key={manufacturer} value={manufacturer}>
                  {manufacturer}
                </option>
              ))}
            </select>
          </div>

          <div className="catalog-filter-group">
            <label>Kaina (€)</label>
            <div className="catalog-price-range">
              <input
                type="number"
                min="0"
                placeholder="Nuo"
                value={filters.priceFrom}
                onChange={(event) => setFilters({ ...filters, priceFrom: event.target.value })}
              />
              <span>–</span>
              <input
                type="number"
                min="0"
                placeholder="Iki"
                value={filters.priceTo}
                onChange={(event) => setFilters({ ...filters, priceTo: event.target.value })}
              />
            </div>
          </div>

          <div className="catalog-filter-actions">
            <button type="submit" className="primary-button">
              Taikyti
            </button>
            <button type="button" className="secondary-button" onClick={clearFilters}>
              Išvalyti
            </button>
          </div>
        </form>

        <div>
          <div className="catalog-toolbar">
            <span className="catalog-results-count">Rasta dalių: {filteredParts.length}</span>

            <div className="catalog-sort">
              <label htmlFor="sorting">Rūšiuoti</label>
              <select
                id="sorting"
                value={sorting}
                onChange={(event) => setSorting(event.target.value)}
              >
                <option value="newest">Naujausi</option>
                <option value="price-asc">Kaina didėjančiai</option>
                <option value="price-desc">Kaina mažėjančiai</option>
                <option value="rating">Reitingas</option>
              </select>
            </div>
          </div>

          {error ? (
            <div className="catalog-error">{error}</div>
          ) : filteredParts.length === 0 ? (
            <div className="catalog-empty">Kompiuterio dalių nėra</div>
          ) : (
            <div className="catalog-grid">
              {filteredParts.map((part) => (
                <PartCard key={part.id} part={part} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default ComponentCatalogPage