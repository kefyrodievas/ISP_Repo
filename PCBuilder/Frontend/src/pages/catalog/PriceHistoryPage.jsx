
import { useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import {
  computerParts,
  promotions,
  formatEuro,
  getPriceHistory,
} from '../../data/mockData'

const periods = [
  { id: '1m', label: '1 mėn.', months: 1 },
  { id: '3m', label: '3 mėn.', months: 3 },
  { id: '6m', label: '6 mėn.', months: 6 },
  { id: 'all', label: 'Visas', months: null },
]

const CHART_WIDTH = 760
const CHART_HEIGHT = 300
const MARGIN = { left: 70, right: 20, top: 20, bottom: 40 }

function getDateDifferenceInDays(a, b) {
  return (new Date(b) - new Date(a)) / (1000 * 60 * 60 * 24)
}

function PriceHistoryPage() {
  const { id } = useParams()
  const part = computerParts.find((item) => item.id === Number(id))
  const [period, setPeriod] = useState('all')

  const fullHistory = useMemo(
    () => (part ? getPriceHistory(part.id) : []),
    [part]
  )

  const filteredHistory = useMemo(() => {
    if (fullHistory.length <= 1) {
      return fullHistory
    }

    const selectedPeriod = periods.find((item) => item.id === period)
    if (!selectedPeriod || selectedPeriod.months === null) {
      return fullHistory
    }

    const latestDate = new Date(fullHistory[fullHistory.length - 1].recordedDate)
    const limit = new Date(latestDate)
    limit.setMonth(limit.getMonth() - selectedPeriod.months)

    return fullHistory.filter((entry) => new Date(entry.recordedDate) >= limit)
  }, [fullHistory, period])

  if (!part) {
    return (
      <section className="price-history-page">
        <div className="page-heading">
          <h1>Kainų istorija</h1>
          <p>Peržiūrėkite kompiuterio dalies kainos pokyčius laikui bėgant.</p>
        </div>

        <div className="price-history-empty">
          <h2>Dalis nerasta</h2>
          <p>Pasirinkta kompiuterio dalis neegzistuoja arba nebėra pasiekiama.</p>
          <a href="/catalog" className="secondary-button">
            Į katalogą
          </a>
        </div>
      </section>
    )
  }

  const partPromotions = promotions.filter((promotion) =>
    promotion.partIds.includes(part.id)
  )

  function renderTable(history) {
    return (
      <table className="orders-table">
        <thead>
          <tr>
            <th>Data</th>
            <th>Kaina</th>
            <th>Pokytis</th>
          </tr>
        </thead>
        <tbody>
          {history.map((entry, index) => {
            const previous = index > 0 ? history[index - 1].price : null
            const change = previous !== null ? entry.price - previous : null

            return (
              <tr key={entry.recordedDate}>
                <td>{entry.recordedDate}</td>
                <td>{formatEuro(entry.price)}</td>
                <td>
                  {change === null ? (
                    <span className="price-history-change-none">Pirminė kaina</span>
                  ) : change === 0 ? (
                    <span className="price-history-change-none">Nepakito</span>
                  ) : change > 0 ? (
                    <span className="price-history-change-up">+{formatEuro(change)}</span>
                  ) : (
                    <span className="price-history-change-down">{formatEuro(change)}</span>
                  )}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    )
  }

  function renderContent() {
    if (fullHistory.length === 0) {
      return <div className="price-history-empty"><h2>Kainų istorijos nėra</h2></div>
    }

    if (fullHistory.length === 1) {
      return (
        <>
          <div className="price-history-empty">
            <h2>Kaina nesikeitė</h2>
            <p>Šiai daliai užregistruota tik viena kaina.</p>
          </div>
          {renderTable(fullHistory)}
        </>
      )
    }

    return (
      <>
        <div className="price-history-controls">
          {periods.map((item) => (
            <button
              key={item.id}
              type="button"
              className={`price-history-period-button${period === item.id ? ' is-active' : ''}`}
              onClick={() => setPeriod(item.id)}
            >
              {item.label}
            </button>
          ))}
        </div>

        {filteredHistory.length <= 1 ? (
          <div className="price-history-empty">
            <h2>Pasirinktu laikotarpiu kaina nesikeitė</h2>
            <p>Pasirinkite platesnį laikotarpį, kad pamatytumėte daugiau duomenų.</p>
          </div>
        ) : (
          <div className="price-history-chart-container">
            <PriceChart history={filteredHistory} promotions={partPromotions} />

            <div className="price-history-legend">
              <span className="price-history-legend-swatch" />
              <span>Pažymėtas laikotarpis rodo, kada dalis dalyvavo akcijoje</span>
            </div>
          </div>
        )}

        {renderTable(filteredHistory)}
      </>
    )
  }

  return (
    <section className="price-history-page">
      <div className="page-heading">
        <h1>Kainų istorija</h1>
        <p>{part.name} – kainos pokyčiai laikui bėgant.</p>
      </div>

      {renderContent()}

      <div className="price-history-actions">
        <a href={`/catalog/${part.id}`} className="secondary-button">
          Grįžti į dalies informaciją
        </a>
        <a href="/catalog" className="secondary-button">
          Į katalogą
        </a>
      </div>
    </section>
  )
}

function PriceChart({ history, promotions }) {
  const dates = history.map((entry) => new Date(entry.recordedDate))
  const prices = history.map((entry) => entry.price)

  const minDate = dates[0]
  const maxDate = dates[dates.length - 1]
  const minPrice = Math.min(...prices)
  const maxPrice = Math.max(...prices)

  const chartWidth = CHART_WIDTH - MARGIN.left - MARGIN.right
  const chartHeight = CHART_HEIGHT - MARGIN.top - MARGIN.bottom
  const dateRangeInDays = Math.max(getDateDifferenceInDays(minDate, maxDate), 1)
  const priceRange = Math.max(maxPrice - minPrice, 1)

  function getX(date) {
    return MARGIN.left +
      (getDateDifferenceInDays(minDate, date) / dateRangeInDays) * chartWidth
  }

  function getY(price) {
    return MARGIN.top + chartHeight -
      ((price - minPrice) / priceRange) * chartHeight
  }

  const points = history.map((entry) => ({
    x: getX(new Date(entry.recordedDate)),
    y: getY(entry.price),
    entry,
  }))

  const line = points.map((point) => `${point.x},${point.y}`).join(' ')

  const promotionBands = promotions
    .map((promotion) => {
      const start = new Date(promotion.startDate)
      const end = new Date(promotion.endDate)

      if (end < minDate || start > maxDate) {
        return null
      }

      const from = start < minDate ? minDate : start
      const to = end > maxDate ? maxDate : end

      return {
        id: promotion.id,
        x1: getX(from),
        x2: getX(to),
        percentage: promotion.percentage,
      }
    })
    .filter(Boolean)

  return (
    <svg viewBox={`0 0 ${CHART_WIDTH} ${CHART_HEIGHT}`}>
      {promotionBands.map((band) => (
        <rect
          key={band.id}
          className="price-history-promo-band"
          x={Math.min(band.x1, band.x2)}
          y={MARGIN.top}
          width={Math.max(Math.abs(band.x2 - band.x1), 2)}
          height={chartHeight}
        />
      ))}

      <line
        className="price-history-axis"
        x1={MARGIN.left}
        y1={MARGIN.top}
        x2={MARGIN.left}
        y2={CHART_HEIGHT - MARGIN.bottom}
      />
      <line
        className="price-history-axis"
        x1={MARGIN.left}
        y1={CHART_HEIGHT - MARGIN.bottom}
        x2={CHART_WIDTH - MARGIN.right}
        y2={CHART_HEIGHT - MARGIN.bottom}
      />

      <text className="price-history-axis-label" x={8} y={getY(maxPrice) + 4}>
        {formatEuro(maxPrice)}
      </text>
      <text className="price-history-axis-label" x={8} y={getY(minPrice) + 4}>
        {formatEuro(minPrice)}
      </text>

      {points.map((point, index) => (
        <text
          key={`label-${point.entry.recordedDate}`}
          className="price-history-axis-label"
          x={point.x}
          y={CHART_HEIGHT - MARGIN.bottom + 18}
          textAnchor={index === 0 ? 'start' : index === points.length - 1 ? 'end' : 'middle'}
        >
          {point.entry.recordedDate}
        </text>
      ))}

      <polyline className="price-history-line" points={line} />

      {points.map((point) => (
        <circle
          key={point.entry.recordedDate}
          className="price-history-point"
          cx={point.x}
          cy={point.y}
          r={4.5}
        />
      ))}
    </svg>
  )
}

export default PriceHistoryPage
