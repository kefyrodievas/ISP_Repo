import { useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { kompiuterioDalys, akcijos, formatEuro, gautiKainosIstoriją } from '../../data/mockData'

const laikotarpiai = [
  { id: '1m', label: '1 mėn.', mėnesiai: 1 },
  { id: '3m', label: '3 mėn.', mėnesiai: 3 },
  { id: '6m', label: '6 mėn.', mėnesiai: 6 },
  { id: 'visas', label: 'Visas', mėnesiai: null },
]

const PLOTIS = 760
const AUKŠTIS = 300
const PARAŠTĖ = { kairė: 70, dešinė: 20, viršus: 20, apačia: 40 }

function datosSkirtumasDienomis(a, b) {
  return (new Date(b) - new Date(a)) / (1000 * 60 * 60 * 24)
}

function PriceHistoryPage() {
  const { id } = useParams()
  const dalis = kompiuterioDalys.find((d) => d.id === Number(id))
  const [laikotarpis, setLaikotarpis] = useState('visas')

  const visaIstorija = useMemo(() => (dalis ? gautiKainosIstoriją(dalis.id) : []), [dalis])

  const filtruotaIstorija = useMemo(() => {
    if (visaIstorija.length <= 1) {
      return visaIstorija
    }

    const pasirinktas = laikotarpiai.find((l) => l.id === laikotarpis)
    if (!pasirinktas || pasirinktas.mėnesiai === null) {
      return visaIstorija
    }

    const paskutinė = new Date(visaIstorija[visaIstorija.length - 1].nustatymoData)
    const riba = new Date(paskutinė)
    riba.setMonth(riba.getMonth() - pasirinktas.mėnesiai)

    return visaIstorija.filter((įrašas) => new Date(įrašas.nustatymoData) >= riba)
  }, [visaIstorija, laikotarpis])

  if (!dalis) {
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

  const akcijosDaliai = akcijos.filter((akcija) => akcija.dalysIds.includes(dalis.id))

  function renderLentelė(istorija) {
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
          {istorija.map((įrašas, index) => {
            const ankstesnis = index > 0 ? istorija[index - 1].kaina : null
            const pokytis = ankstesnis !== null ? įrašas.kaina - ankstesnis : null

            return (
              <tr key={įrašas.nustatymoData}>
                <td>{įrašas.nustatymoData}</td>
                <td>{formatEuro(įrašas.kaina)}</td>
                <td>
                  {pokytis === null ? (
                    <span className="price-history-change-none">Pirminė kaina</span>
                  ) : pokytis === 0 ? (
                    <span className="price-history-change-none">Nepakito</span>
                  ) : pokytis > 0 ? (
                    <span className="price-history-change-up">+{formatEuro(pokytis)}</span>
                  ) : (
                    <span className="price-history-change-down">{formatEuro(pokytis)}</span>
                  )}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    )
  }

  function renderTurinys() {
    if (visaIstorija.length === 0) {
      return <div className="price-history-empty"><h2>Kainų istorijos nėra</h2></div>
    }

    if (visaIstorija.length === 1) {
      return (
        <>
          <div className="price-history-empty">
            <h2>Kaina nesikeitė</h2>
            <p>Šiai daliai užregistruota tik viena kaina.</p>
          </div>
          {renderLentelė(visaIstorija)}
        </>
      )
    }

    return (
      <>
        <div className="price-history-controls">
          {laikotarpiai.map((l) => (
            <button
              key={l.id}
              type="button"
              className={`price-history-period-button${laikotarpis === l.id ? ' is-active' : ''}`}
              onClick={() => setLaikotarpis(l.id)}
            >
              {l.label}
            </button>
          ))}
        </div>

        {filtruotaIstorija.length <= 1 ? (
          <div className="price-history-empty">
            <h2>Pasirinktu laikotarpiu kaina nesikeitė</h2>
            <p>Pasirinkite platesnį laikotarpį, kad pamatytumėte daugiau duomenų.</p>
          </div>
        ) : (
          <div className="price-history-chart-container">
            <Grafikas istorija={filtruotaIstorija} akcijos={akcijosDaliai} />

            <div className="price-history-legend">
              <span className="price-history-legend-swatch" />
              <span>Pažymėtas laikotarpis rodo, kada dalis dalyvavo akcijoje</span>
            </div>
          </div>
        )}

        {renderLentelė(filtruotaIstorija)}
      </>
    )
  }

  return (
    <section className="price-history-page">
      <div className="page-heading">
        <h1>Kainų istorija</h1>
        <p>{dalis.pavadinimas} – kainos pokyčiai laikui bėgant.</p>
      </div>

      {renderTurinys()}

      <div className="price-history-actions">
        <a href={`/catalog/${dalis.id}`} className="secondary-button">
          Grįžti į dalies informaciją
        </a>
        <a href="/catalog" className="secondary-button">
          Į katalogą
        </a>
      </div>
    </section>
  )
}

function Grafikas({ istorija, akcijos }) {
  const datos = istorija.map((įrašas) => new Date(įrašas.nustatymoData))
  const kainos = istorija.map((įrašas) => įrašas.kaina)

  const minData = datos[0]
  const maxData = datos[datos.length - 1]
  const minKaina = Math.min(...kainos)
  const maxKaina = Math.max(...kainos)

  const plotoPlotis = PLOTIS - PARAŠTĖ.kairė - PARAŠTĖ.dešinė
  const plotoAukštis = AUKŠTIS - PARAŠTĖ.viršus - PARAŠTĖ.apačia
  const diapazonasDienomis = Math.max(datosSkirtumasDienomis(minData, maxData), 1)
  const kainųDiapazonas = Math.max(maxKaina - minKaina, 1)

  function x(data) {
    return PARAŠTĖ.kairė + (datosSkirtumasDienomis(minData, data) / diapazonasDienomis) * plotoPlotis
  }

  function y(kaina) {
    return PARAŠTĖ.viršus + plotoAukštis - ((kaina - minKaina) / kainųDiapazonas) * plotoAukštis
  }

  const taškai = istorija.map((įrašas) => ({
    x: x(new Date(įrašas.nustatymoData)),
    y: y(įrašas.kaina),
    įrašas,
  }))

  const linija = taškai.map((taškas) => `${taškas.x},${taškas.y}`).join(' ')

  const juostos = akcijos
    .map((akcija) => {
      const pradžia = new Date(akcija.pradžiosData)
      const pabaiga = new Date(akcija.pabaigosData)

      if (pabaiga < minData || pradžia > maxData) {
        return null
      }

      const nuo = pradžia < minData ? minData : pradžia
      const iki = pabaiga > maxData ? maxData : pabaiga

      return {
        id: akcija.id,
        x1: x(nuo),
        x2: x(iki),
        procentai: akcija.procentai,
      }
    })
    .filter(Boolean)

  return (
    <svg viewBox={`0 0 ${PLOTIS} ${AUKŠTIS}`}>
      {juostos.map((juosta) => (
        <rect
          key={juosta.id}
          className="price-history-promo-band"
          x={Math.min(juosta.x1, juosta.x2)}
          y={PARAŠTĖ.viršus}
          width={Math.max(Math.abs(juosta.x2 - juosta.x1), 2)}
          height={plotoAukštis}
        />
      ))}

      <line
        className="price-history-axis"
        x1={PARAŠTĖ.kairė}
        y1={PARAŠTĖ.viršus}
        x2={PARAŠTĖ.kairė}
        y2={AUKŠTIS - PARAŠTĖ.apačia}
      />
      <line
        className="price-history-axis"
        x1={PARAŠTĖ.kairė}
        y1={AUKŠTIS - PARAŠTĖ.apačia}
        x2={PLOTIS - PARAŠTĖ.dešinė}
        y2={AUKŠTIS - PARAŠTĖ.apačia}
      />

      <text className="price-history-axis-label" x={8} y={y(maxKaina) + 4}>
        {formatEuro(maxKaina)}
      </text>
      <text className="price-history-axis-label" x={8} y={y(minKaina) + 4}>
        {formatEuro(minKaina)}
      </text>

      {taškai.map((taškas, index) => (
        <text
          key={`label-${taškas.įrašas.nustatymoData}`}
          className="price-history-axis-label"
          x={taškas.x}
          y={AUKŠTIS - PARAŠTĖ.apačia + 18}
          textAnchor={index === 0 ? 'start' : index === taškai.length - 1 ? 'end' : 'middle'}
        >
          {taškas.įrašas.nustatymoData}
        </text>
      ))}

      <polyline className="price-history-line" points={linija} />

      {taškai.map((taškas) => (
        <circle
          key={taškas.įrašas.nustatymoData}
          className="price-history-point"
          cx={taškas.x}
          cy={taškas.y}
          r={4.5}
        />
      ))}
    </svg>
  )
}

export default PriceHistoryPage
