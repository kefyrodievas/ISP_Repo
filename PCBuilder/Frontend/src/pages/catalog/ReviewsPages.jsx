import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import {
  kompiuterioDalys,
  gautiPaskyrosVardą,
  gautiRodomusAtsiliepimus,
  gautiVidutinįĮvertinimą,
  gautiPrototipoAtsiliepimus,
  išsaugotiPrototipoAtsiliepimus,
} from '../../data/mockData'

// Tik sąsajos prototipas. Duomenys išsaugomi laikinai (iki puslapio perkrovimo).
// Keturi puslapiai viename faile, kad nereikėtų papildomų Context/Provider failų.
// Demonstracijoje nauji atsiliepimai priskiriami pavyzdinei paskyrai.
// Redagavimas ir šalinimas sąmoningai neribojami pagal autorių.
const DEMO_AUTORIAUS_ID = 1

function gautiDalį(id) {
  return kompiuterioDalys.find((dalis) => dalis.id === Number(id))
}

function Žvaigždutės({ įvertinimas }) {
  return (
    <span className="rating-stars" aria-label={`${įvertinimas} iš 5 žvaigždučių`}>
      {'★★★★★'.slice(0, įvertinimas)}{'☆☆☆☆☆'.slice(0, 5 - įvertinimas)}
    </span>
  )
}

function LangasNerastas({ tekstas }) {
  return (
    <section className="component-details-page">
      <div className="component-info-card">
        <h1>Langas nepasiekiamas</h1>
        <p>{tekstas}</p>
        <Link to="/catalog" className="secondary-button">Į katalogą</Link>
      </div>
    </section>
  )
}

function PuslapioAntraštė({ dalis, pavadinimas, paaiškinimas }) {
  return (
    <div className="page-heading">
      <h1>{pavadinimas}</h1>
      <p>{dalis.pavadinimas} · {paaiškinimas}</p>
    </div>
  )
}

// 1 langas: visų vienos prekės atsiliepimų sąrašas.
export function ReviewsPage() {
  const { id } = useParams()
  const dalis = gautiDalį(id)
  if (!dalis) return <LangasNerastas tekstas="Prekė nerasta." />

  const matomi = gautiRodomusAtsiliepimus(dalis.id, gautiPrototipoAtsiliepimus())
    .sort((a, b) => b.paskelbimoData.localeCompare(a.paskelbimoData))
  const { vidurkis, kiekis } = gautiVidutinįĮvertinimą(dalis.id, gautiPrototipoAtsiliepimus())

  return (
    <section className="component-details-page">
      <PuslapioAntraštė dalis={dalis} pavadinimas="Atsiliepimai" paaiškinimas="Visi pirkėjų atsiliepimai" />
      <div className="component-info-card">
        <div className="reviews-summary">
          {kiekis > 0 ? <><Žvaigždutės įvertinimas={Math.round(vidurkis)} /> {vidurkis.toFixed(1)} iš 5 ({kiekis})</> : 'Atsiliepimų dar nėra'}
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
            <Link to={`/catalog/${dalis.id}`} className="secondary-button">
              Grįžti į prekę
            </Link>
            <Link to={`/catalog/${dalis.id}/reviews/new`} className="primary-button">
              Rašyti atsiliepimą
            </Link>
          </div>
        </div>

        {matomi.length === 0 ? (
          <div className="reviews-empty">Šiai prekei atsiliepimų kol kas nėra.</div>
        ) : (
          <div className="reviews-list">
            {matomi.map((atsiliepimas) => (
              <article className="review-card" key={atsiliepimas.id}>
                <div className="review-card-header">
                  <span className="review-card-author">{gautiPaskyrosVardą(atsiliepimas.autoriusId)}</span>
                  <span className="review-card-date">{atsiliepimas.paskelbimoData}</span>
                </div>
                <Žvaigždutės įvertinimas={atsiliepimas.įvertinimas} />
                <p className="review-card-text">{atsiliepimas.tekstas}</p>
                <div className="review-proto-actions review-proto-card-actions">
                  <Link to={`/catalog/${dalis.id}/reviews/${atsiliepimas.id}/edit`} className="secondary-button">Redaguoti</Link>
                  <Link to={`/catalog/${dalis.id}/reviews/${atsiliepimas.id}/delete`} className="secondary-button">Šalinti</Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

// Ta pati formos išvaizda naudojama dviejuose atskiruose languose.
function AtsiliepimoForma({ redagavimas }) {
  const { id, reviewId } = useParams()
  const navigate = useNavigate()
  const dalis = gautiDalį(id)
  const esamas = redagavimas
    ? gautiPrototipoAtsiliepimus().find((r) => r.id === Number(reviewId) && r.dalisId === Number(id))
    : null
  const [įvertinimas, setĮvertinimas] = useState(esamas?.įvertinimas ?? 5)
  const [tekstas, setTekstas] = useState(esamas?.tekstas ?? '')
  const [klaida, setKlaida] = useState('')

  if (!dalis) return <LangasNerastas tekstas="Prekė nerasta." />
  if (redagavimas && (!esamas || !['Aktyvus', 'Redaguotas'].includes(esamas.būsena))) {
    return <LangasNerastas tekstas="Atsiliepimas nerastas arba neberodomas." />
  }

  function pateikti(event) {
    event.preventDefault()
    if (!tekstas.trim()) {
      setKlaida('Įrašykite atsiliepimo tekstą.')
      return
    }

    const sąrašas = gautiPrototipoAtsiliepimus()
    if (redagavimas) {
      išsaugotiPrototipoAtsiliepimus(sąrašas.map((r) => r.id === esamas.id ? {
        ...r,
        tekstas: tekstas.trim(),
        įvertinimas: Number(įvertinimas),
        būsena: 'Redaguotas',
        keitimoData: new Date().toISOString().slice(0, 10),
      } : r))
    } else {
      const naujasId = Math.max(0, ...sąrašas.map((r) => r.id)) + 1
      išsaugotiPrototipoAtsiliepimus([...sąrašas, {
        id: naujasId,
        dalisId: dalis.id,
        autoriusId: DEMO_AUTORIAUS_ID,
        tekstas: tekstas.trim(),
        įvertinimas: Number(įvertinimas),
        paskelbimoData: new Date().toISOString().slice(0, 10),
        būsena: 'Aktyvus',
      }])
    }
    navigate(`/catalog/${dalis.id}/reviews`)
  }

  return (
    <section className="component-details-page">
      <PuslapioAntraštė
        dalis={dalis}
        pavadinimas={redagavimas ? 'Atsiliepimo redagavimas' : 'Naujo atsiliepimo kūrimas'}
        paaiškinimas={redagavimas ? 'Pakeiskite savo atsiliepimą' : 'Pasidalykite savo nuomone'}
      />
      <div className="component-info-card">
        <form className="review-proto-form" onSubmit={pateikti}>
          <label htmlFor="review-rating">Įvertinimas</label>
          <select id="review-rating" value={įvertinimas} onChange={(e) => setĮvertinimas(Number(e.target.value))}>
            {[5, 4, 3, 2, 1].map((vertė) => <option value={vertė} key={vertė}>{vertė} iš 5</option>)}
          </select>
          <label htmlFor="review-text">Atsiliepimas</label>
          <textarea
            id="review-text"
            rows={6}
            maxLength={1000}
            value={tekstas}
            onChange={(e) => { setTekstas(e.target.value); setKlaida('') }}
            placeholder="Parašykite savo nuomonę apie prekę..."
          />
          {klaida && <p role="alert" className="review-proto-error">{klaida}</p>}
          <div className="review-proto-actions">
            <Link to={`/catalog/${dalis.id}/reviews`} className="secondary-button">Atšaukti</Link>
            <button type="submit" className="primary-button">Išsaugoti</button>
          </div>
        </form>
      </div>
    </section>
  )
}

// 2 langas: kūrimo forma.
export function ReviewCreatePage() {
  return <AtsiliepimoForma redagavimas={false} />
}

// 3 langas: redagavimo forma.
export function ReviewEditPage() {
  return <AtsiliepimoForma redagavimas />
}

// 4 langas: atsiliepimo šalinimo patvirtinimas.
export function ReviewDeletePage() {
  const { id, reviewId } = useParams()
  const navigate = useNavigate()
  const dalis = gautiDalį(id)
  const atsiliepimas = gautiPrototipoAtsiliepimus().find((r) => r.id === Number(reviewId) && r.dalisId === Number(id))
  if (!dalis) return <LangasNerastas tekstas="Prekė nerasta." />
  if (!atsiliepimas || !['Aktyvus', 'Redaguotas'].includes(atsiliepimas.būsena)) {
    return <LangasNerastas tekstas="Atsiliepimas nerastas arba neberodomas." />
  }

  function šalinti() {
    išsaugotiPrototipoAtsiliepimus(gautiPrototipoAtsiliepimus().map((r) => r.id === atsiliepimas.id
      ? { ...r, būsena: 'Trintas vartotojo' }
      : r))
    navigate(`/catalog/${dalis.id}/reviews`)
  }

  return (
    <section className="component-details-page">
      <PuslapioAntraštė dalis={dalis} pavadinimas="Atsiliepimo šalinimas" paaiškinimas="Patvirtinkite pasirinkimą" />
      <div className="component-info-card">
        <h2>Ar tikrai norite pašalinti atsiliepimą?</h2>
        <div className="review-card">
          <Žvaigždutės įvertinimas={atsiliepimas.įvertinimas} />
          <p className="review-card-text">{atsiliepimas.tekstas}</p>
        </div>
        <p className="review-proto-note">Patvirtinus atsiliepimas nebebus matomas sąraše.</p>
        <div className="review-proto-actions">
          <Link to={`/catalog/${dalis.id}/reviews`} className="secondary-button">Atšaukti</Link>
          <button type="button" className="danger-button" onClick={šalinti}>Taip, šalinti</button>
        </div>
      </div>
    </section>
  )
}
